# Selenium on Windows: revisited

Created more than 30 years ago Microsoft Windows nowadays remains an indisputable leading operating system on desktop and laptop computers. You simply can not ignore this fact when developing a web application. In this article I am going to discuss some particularities of using Selenium on Windows platform and will provide a simple and tested solution that dramatically simplifies things.

## How Windows differs from Linux
In my previous articles ([one](https://hackernoon.com/selenium-testing-a-new-hope-7fa87a501ee9), [two](https://hackernoon.com/selenium-testing-a-new-hope-7fa87a501ee9), [three](https://medium.com/@aandryashin/selenium-done-in-60-seconds-176796f8bdc7)) I described open source tools and approaches to organize scalable Selenium cluster and to efficiently work with Selenium on developer's computer. All these articles were using Linux as base deployment platform. So what are the differences of Windows from Selenium usage perspective?

(picture)

1) New browsers that do not exist on other platforms. Depending on version Windows provides one of two built-in browsers: Internet Explorer (IE) and on Microsoft Edge. Only one browser version can be installed simultaneously. Both browsers have standalone webdriver binaries (IEDriverServer and EdgeDriver respectively) that use Windows API methods to start and drive browser. So from this point of view Windows browsers are launched in the same way like Linux ones.
2) Built-in operating system GUI. Most Windows versions (except latest Windows Server) have built-in graphical interface which can neither be replaced by something else nor completely disabled. It is always starting and consuming resources. Windows GUI by default shows all windows (including browsers windows) in the same workspace and only one window is focused at each moment of time. Because of this trying to run multiple Selenium IE or Edge in parallel often leads to window focus issues: page element CSS styles differ (e.g. hover styles) from expected, browser DOM events does not occur and so on. This is very annoying issue.
3) Almost no Docker support. Yes, latest versions of Windows Server support most of Docker features. But desktop versions have no native Docker support at all. The only option is to run a virtual machine with Linux and Docker installed on board.

As you can see many modern approaches like using headless X server and containers to start browsers are practially not supported on Windows. So is it possible to achieve similar to Linux performance and avoid known limitations on Windows? Yes, that is simpler than you could imagine! Refer to next sections for details.

## Creating order from chaos 
To advance in achieving our goal we will apply changes step by step. First of all let's make our solution lightweight. As you probably know traditional Selenium installation on Windows looks like the following:

(picture: selenium server + driver + ie)

Here we have Selenium server running under Java virtual machine (JRE), then IEDriverServer or EdgeDriver binary and finally IE or Edge browser binary itself. In this chain there is at least one weak link - Selenium server and Java. In this architecture Selenium server is just a proxy server starting driver binary configured to open some random free port and then transferring all requests to this port. Proxying network traffic is a trivial task in any programming language because all the work is in fact done by networking module of the operating system. This is why installing 50 Mb Java distribution and downloading 20 Mb Selenium server binary is an overkill for simple proxying. More than that standard Selenium server under load has some ugly disadvantages:
* It consumes too much memory and sometimes leaks.
* It does proxying "manually" - creates a new HTTP client for each request and copies incoming request data. This is far from being efficient and causes strange timeout issues.
We certainly can do better - use tiny [Selenoid](https://github.com/aerokube/selenoid) instead of monstrous Selenium server.

### Replacing Selenium server with Selenoid
Selenoid is a lightweight Selenium server replacement written in [Golang](https://golang.org/). It is distributed as one small (~ 7 Mb) binary and does not have any external dependencies. This is why in order to use it - just download and run the binary. In my [previous](https://medium.com/@aandryashin/selenium-done-in-60-seconds-176796f8bdc7) article I briefly described how useful Selenoid could be to launch browsers in Docker containers - its main application. But the second supported mode is launching any standalone binaries instead of containers and proxying network traffic to them - just the same way like Selenium server does with IEDriverServer and EdgeDriver. Replacing Selenium server with Selenoid is very easy. In this example we will launch Internet Explorer 11:
1) Download Selenoid binary from [releases page](https://github.com/aerokube/selenoid/releases/). Binary is usually named ```selenoid_windows_386.exe``` for Windows 32 bit and ```selenoid_windows_amd64.exe``` for Windows 64 bit. So far as I know desktop Windows versions do not have a command line file downloader by default. However having [Cygwin](https://en.wikipedia.org/wiki/Cygwin) and [curl](https://en.wikipedia.org/wiki/CURL) you can download required binary like the following:
```
$ curl -o selenoid.exe https://github.com/aerokube/selenoid/releases/download/1.2.1/selenoid_windows_386.exe
```
2) Download and unpack archive with ```IEDriverServer.exe``` from [Selenium Downloads page](http://www.seleniumhq.org/download/). Let's for example consider that ```IEDriverServer.exe``` was saved to ```C:\```.
3) Adjust Internet Explorer settings as described in [wiki](https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver).
4) Create Selenoid configuration file ```browsers.json``` with the following contents:
```
{
  "internet explorer": {
    "default": "11",
    "versions": {
      "11": {
        "image": ["C:\\IEDriverServer.exe"]
      }
    }
  }
}
```
5) Start Selenoid instead of Selenium server (port 4444 should be free) with the following ```selenoid.bat``` file:
```
C:\selenoid.exe -conf C:\browsers.json -disable-docker -limit 4 > C:\selenoid.log 2>&1
```
Here we assume that all files from previous steps were saved to ```C:\```. Selenoid log will be then written to ```C:\selenoid.log```. Notice ```-limit``` configuration flag - it determines how many sessions can be started simultaneously. When this limit is reached - all new session requests are waiting in queue like with Selenium hub.
6) That's it! Just launch your tests against the same url:
```
http://localhost:4444/wd/hub
```
7) To stay lightweight Selenoid does not have a built-in graphical user interface. We provide GUI as another tiny binary: [Selenoid UI](https://github.com/aerokube/selenoid-ui). Just download a precompiled binary from [releases page](https://github.com/aerokube/selenoid-ui/releases) and start it, then open ```http://localhost:8080/``` in your browser.

### Going to multiple desktops
After replacing Selenium server with Selenoid you will dramatically decrease memory and CPU consumption. This easy step can even allow you to launch more browsers in parallel. However this change does not fix issues with opening browser windows in parallel - they are still shown on the same desktop and still continue to lose focus. In order to overcome this obstacle we need to somehow launch browsers in separate desktops. The good news are - internal Windows API even in desktop versions has virtual desktops support - you can switch between desktops and launch windows in these desktops in parallel. There are even better news - you don't need to dive into Windows internals, the required functionality is already implemented in [headless-selenium-for-win](https://github.com/kybu/headless-selenium-for-win) project. This project provides you an archive with two binaries: ```desktop_utils.exe``` and ```headless_ie_selenium.exe```.

The first one is a command line tool to switch between virtual desktops manually. Something like:
```
C:> desktop_utils.exe -s desktop1
```
What we need for Selenium is ```headless_ie_selenium.exe``` - this tool is an addon to ```IEDriverServer.exe``` that handles new session requests and automatically launches ```IEDriverServer.exe``` in new virtual desktop. ```headless_ie_selenium.exe``` is supposed to be placed to the same directory where ```IEDriverServer.exe``` resides. To use this tool with Selenoid just replace the binary path in ```browsers.json``` and restart Selenoid:
```
{
  "internet explorer": {
    "default": "11",
    "versions": {
      "11": {
        "image": ["C:\\headless_ie_selenium.exe"]
      }
    }
  }
```
Now all focus issues should go away.

### Juggling Selenium capabilities
By replacing Selenium with Selenoid and ```IEDriverServer.exe``` with ```headless_ie_selenium.exe``` we resolved the most annoying Selenium issues on Windows. Let's polish our diamond by setting some useful capabilities in tests.
1) By default Internet Explorer is using system HTTP proxy settings. This leads to ugly behavior - these settings are shared between simultaneously running sessions even if only one browser need to go through proxy. To fix this just set:
```
ie.usePerProcessProxy = true
```

2) Your web app can use [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) to store some important information. In Windows these files are stored per-user and default behavior is to reuse cookie contents among sessions. This can lead to flaky tests. In order to avoid sharing cookies just start IE in private mode:
```
ie.browserCommandLineSwitches = "-private"
```
Also don't forget to set:
```
ie.ensureCleanSession = true
```

3) To avoid strange errors also check that the following capability is either unset or is set to false:
```
requireWindowFocus = false
``` 

## Conclusion
In this article I briefly described major issue you can face to when running your Selenium tests on Windows platform and provided an easy solution. I continue to assert - Selenium can be painless. The trick is to cook it correctly.
