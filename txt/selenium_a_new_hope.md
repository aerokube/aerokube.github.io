# TODO:
[ ] How to launch Ggr and Selenoid from ready to use Docker containers




# Scalable and Fault-Tolerant Selenium in action

# Part I. Problem and first solutions.

Selenium project launched in 2004 now is an industry standard for browser automation. However if your QA department is relatively big later or sooner you will face to recommended Selenium architecture limitations. In this article I would like to tell you how to easily create a scalable and fault-tolerant Selenium solution.

## Problem
Selenium architecture radically changed several times since 2004 when its first prototype was created. Current Selenium architecture introduced in 2.0 branch is called Selenium Grid. It works like the following:
(picture)
Usually a cluster consists of two daemon applications: Selenium Hub and Selenium Node. A **hub** is an API that handles user requests and redirects them to respective nodes. A **node** is an actual request executor launching browser processes and requesting desired test steps from them. In theory an unlimited number of Selenium Nodes can be connected to one Selenium Hub and every node can launch any installed browser. But what's in practice?
1) Such architecture has a weak part. Selenium Hub is a single browser access point. If it goes down or does not respond all browsers become unavailable. The same happens if datacenter with hub is powered off or its network fails.
2) Selenium Grid does not scale well. Our 5+ years of Selenium cluster expertize show that even under moderate load a hub can work with a limited number of connected nodes. Depending on hardware even dozens of connected nodes can dramatically increase hub response time.
3) No quoting functionality. You can't create users and specify browser consumption limits.

## Solutions
The simplest scalable approach is to use multiple Selenium Hubs distrubuted across multiple datacenters. However standard Selenium libraries can only work with one Selenium hub. We need to teach them to work with such distributed system.

## Client-side load balancing
An initial approach we successfully used several years ago was a client library that did client-side load balancing. This is how it works:
1) We launch multiple Selenium Hubs and respective Nodes in multiple datacenters.
2) A list of hub hostnames with supported browsers is saved to file.
3) Selenium user attaches a small client library as a dependency to his tests and requests a Selenum session using the library.
(picture)
4) The library reads the file with hubs and randomly selects one of them having desired browser. Then it requests a browser using standard Selenium client.
5) If session is created successfully then test steps begin. Otherwise the library tries another hub host until a session is created. Different hubs can contain different quantities of browsers. To deliver uniform load distribution we need to assign different weights to hub hosts and then select these hosts according to their weights.
6) If the client fails to create a session on every hub from the list - it should throw an error. 

If you look at the tests only one line of code should be changed to use such library - a new session request. For example in Java tests a new session request can look like the following:
```
WebDriver driver = new RemoteWebDriver("http://my-cool-hub.example.com:4444/wd/hub", capabilities);
```
All classes in this code come from standard Selenium Java client. If for example a client-side library is called SeleniumHubFinder a new session request now becomes:
```
WebDriver driver = SeleniumHubFinder.find(capabilities);
```
No Selenium hub URL is used in updated code - this information is stored inside client library. That's it! Such approach worked during years and hundreds of software testers in our company were satisfied. What are the drawbacks of using client library?
1) A supplementary library should be added to every test project. You can't launch your test without this library.
2) A separate client library should be implemented for each language. It's very probable that in your company both Javascript and Java Selenium tests exist. In that case you need to support two client libraries and ensure that hub lists are in sync.
This is why a server-side solution becomes actual.

## Server-side load-balancing
Basing on our experience with client-side solution we introduced the following natural requirements to server-side one:
1) The server should look as Selenium hub to client libraries. To achieve this it should implement [Selenium JsonWire protocol](https://w3c.github.io/webdriver/webdriver-spec.html).
2) Any number of server nodes can be installed in any datacenter. They can be installed behind any software or hardware load balancer.
3) Server instances are stateless. They don't use neither database server nor queue server to share state.
4) Server should support multiple users and quoting.
We called the server - GridRouter because the only thing it does is routing user requests to correct Selenium Grid Hub. Here's the new architecture:
(picture)
* The load balancer distributes user requests across multiple GridRouter instances. 
* Every GridRouter instance stores information about all available Selenium Hubs like client-side library did.
* To handle new session request GridRouter uses the same random distribution algorithm.
* As you probably know every new browser session in Selenium automatically obtains an ID called session ID. According to Selenium JSONWire protocol this ID is always passed to request. GridRouter appends information about selected Selenium Hub to this session and returns such enriched session ID to user.
* On the next requests following new session request GridRouter extracts information about used Selenium Hub from enriched session ID and simply proxies requests to this hub. So far as all information about session is stored in its ID there's no need to synchronize GridRouter instances. This is why GridRouter is stateless.

## GridRouter
Initially we implemented GridRouter using Java, [Jetty](https://eclipse.org/jetty/) and [Spring Framework](http://spring.io/). Its source code is available on [Github](https://github.com/seleniumkit/gridrouter). This implementation is using a plain test properties file to store users list and an XML file to save a list of Selenium hubs for each user. A typical users list (by default **/etc/grid-router/users.properties**) looks like the following:
```
user:password, user
user2:password2, user
```
Every line corresponds to one user and passwords in this implementation are stored without any encryption. This is because we consider that users are mainly needed to account browsers comsumption by different teams. Selenium hub lists are stored in XML files of the following format (by default **/etc/grid-router/quota/<username>.xml**):
```
<qa:browsers xmlns:qa="urn:config.gridrouter.qatools.ru">
    <browser name="firefox" defaultVersion="33.0">
        <version number="33.0">
            <region name="us-west">
                <host name="my-firefox33-hub-1.example.com" port="4444" count="5"/>
            </region>
            <region name="us-east">
                <host name="my-firefox33-hub-2.example.com" port="4444" count="5"/>
            </region>
        </version>
        <version number="37.0">
            <region name="us-west">
                <host name="my-firefox37-hub-1.example.com" port="4444" count="3"/>
                <host name="my-firefox37-hub-2.example.com" port="4444" count="4"/>
            </region>
            <region name="us-east">
                <host name="my-firefox37-hub-3.example.com" port="4444" count="2"/>
            </region>
        </version>
    </browser>
    <browser name="chrome" defaultVersion="42.0">
        <version number="42.0">
            <region name="us-west">
                <host name="my-chrome42-hub-1.example.com" port="4444" count="10"/>
            </region>
            <region name="us-east">
                <host name="my-chrome42-hub-2.example.com" port="4444" count="10"/>
            </region>
        </version>
    </browser>
</qa:browsers>
```
You can see that we define available browser names, their versions and a set of hosts distributed across multiple regions. A region in our terms is just a datacenter. The information about datacenters is mainly needed in the cases when one datacenter goes down. We choose hosts in the way that uses host from another datacenter when the first session attempt fails. Such approach increases the probability to create new Selenium session faster.

### Using GridRouter in tests
As I previously said GridRouter implements standard Selenium protocol and is fully compatible with all existing client libraries. The only question we need to discuss is how to authenticate in GridRouter i.e. specify which quota we want to use. All Selenium client libraries support only one authentication method - [Basic HTTP Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). This is why GridRouter supports only this method too. Usually Selenium hub url is like the following:
```
http://example.com:4444/wd/hub
```
As you probably know basic HTTP authentication username and password can be encoded to URL like that:
```
http://username:password@example.com:4444/wd/hub
```
This is the only change you need to do in your code to use GridRouter instead of Selenium Hub. The majority of Selenium client libraries including Java and Python implementations work with such notation. Some Selenium-based Javascript tools however require you to specify username and password as separate configuration options.

## Selenograph
GridRouter allowed us to stop using client-side libraries and gave users with different languages access to easily scalable Selenium installation. To scale GridRouter installation you just need to add more Selenium hubs to its XML configuration - all changes are applied automatically without service restart. To serve more requests per second you also need to add GridRouter hosts behind load balancer. Our experience shows that GridRouter works perfectly when total percentage of used browsers for any version is below ~80%. Problems begin when the peak load arrives and browser consumption grows up to 90-100% of total capacity. In this case the random uniform session attempts distrubution becomes inefficient.
(picture why it is inefficient)
In that case we very often try to obtain Selenium session on fully occupied hub and do attempts to several hubs before returning session to user. This increases session start time and slows down tests. Our next stage in Selenium cluster development aimed to resolve the issues above was a new product called [Selenograph](https://github.com/seleniumkit/selenograph).
Selenograph is a Java server based on GridRouter source code fully compatible with its configuration files. The main differences are:
1) It is stateful. To be more efficient on high loads Selenograph is using more sophisticated algorithm of choosing hub hosts. The main idea is to dynamically adjust hub host weight by considering total number of already running sessions. This number should be saved to storage shared among Selenograph nodes. We use [MongoDB](https://www.mongodb.com/) as such storage.
2) It provides more statistics and user-friendly interface. For example Selenograph API can return total number of concurrently running sessions at each moment of time.
Although Selenograph is a stateful solution it is confirmed to work correctly under high load allowing to serve hundreds of requests per second to every instance.

## Conclusion

In this part I told you about standard Selenium scalability problems and how they can be resolved without slightly changing your cluster architecture. In the next part we'll discuss such questions as:
1) How to prepare worker nodes for big cluster so it scales well
2) Some thoughts about nearest Selenium future
3) How to run Selenium inside Docker containers
4) What are the new open source tools that will help you to deploy an efficient Selenium cluster with low resource consumption

Stay tuned.

## Ads
Though we are already using the software described in this article in our client's production we also would like to prepare a publicly available service. If you are interested in free beta-testing please leave your email on the following page: <url>

# Part II. Losing weight and going to containers. 
In the first part I told about simple approaches to build scalable Selenium cluster without writing any line of code. In this part we're going to dive into more subtle Selenium questions:
1) How to prepare easily scalable worker nodes using standard Selenium hub
2) Why it's possible and even recommended to run the majority of browsers inside containers and how to do that
3) Which ready to use open source tools exist

## What's inside worker node
All new tools described in the first part are in fact smart thin proxies that redirect user requests to real Selenium Hub and Nodes. However when you think a bit more questions arrive:
* How to arrange hubs and nodes to efficiently consume hardware resources and to still remain scalable?
* Which operating system to use?
* Which software should be installed?
* Can we work without real display? 

One may try to use hardware servers having one Selenium Hub and a lot of Selenium Nodes for different browsers. Seems reasonable but in fact is far from being useful:
1) As I previously said Selenium hub becomes very slow with big quantities of loaded nodes. Not sure about actual reasons but that's what our experience shows. An advice - don't look at Selenium source code when going to bed if you wish to sleep without nightmares. So we can't use dozens of Selenium nodes with the same hub. Let's then use only a few nodes with one hub. To stay efficient we need to reduce total number of CPU cores per hub - that's a good reason to migrate to clouds. For example our installation for a long time was using small virtual machines with only 2 VCPUs and 4 Gb of RAM.
2) Not clear how to install different versions of the same browser in easy way (e.g. using binary packages).
3) Not clear how to easily account total quantity of each browser version.
4) Different Selenium Node versions are compatible with different browser versions. E.g. newer Selenium node can not support relatively old browser version.

The simplest way to always have the same quantity of nodes connected to the same hub is to launch both hub and nodes on the same virtual machine. If you use one machine per browser version that becomes an elementary school task to calculate total number of available browsers. You can easily add and remove virtual machines containing compatible version of Selenium node and browser. This is what we recommend when working with Selenium cluster in cloud with static quantities of each version available.

But what should be present inside such virtual machine except Selenium Hub and Selenium Node to work smoothly?
* First of all we recommend using Linux as base operating system where possible. With Linux you can cover 80% of your browser needs. It's simpler to enumerate what is not covered:
1) Internet Explorer and Microsoft Edge. These run only in Microsoft Windows and are subject for a separate article. For never was a story of more woe.
2) Desktop Safari. Is anybody using it? Selenium has rather poor support of this browser.
3) iOS and real Apple devices. You need to use Apple hardware such as MacMini and [Appium](http://github.com/appium/appium/) to work with them.
* To run standard Selenium you need to have Java (JDK or JRE) installed and Selenium JAR of desired version present.
* A virtual machine has no real display so you need to launch Selenium node in particular X server that can work without display. Such implementation is called [Xvfb](https://www.x.org/releases/X11R7.6/doc/man/man1/Xvfb.1.xhtml). This can be done as follows:
```
xvfb-run -l -a -s '-screen 0 1600x1200x24 -noreset' java -jar /path/to/selenium-server-standalone.jar -role node <...other args>
```
Notice that Xvfb is only needed for Selenium node process.
* You may also want to install additional font packages such as [Microsoft True Type fonts](http://askubuntu.com/questions/578057/installation-of-fonts-in-ubuntu-14-04).
* If you wish to take screenshots it's recommended to [turn off caret blinking](http://stackoverflow.com/questions/2324348/how-to-disable-caret-blinking) for Gtk-based browsers.
* If your tests need to interact with sound system you also need to set up dummy sound card. A script for Ubuntu can be like the following:
```
#!/bin/bash
apt-get -y install linux-sound-base libasound2-dev alsa-utils alsa-oss
apt-get -y install --reinstall linux-image-extra-`uname -r`
modprobe snd-dummy
if ! grep -Fxq "snd-dummy" /etc/modules; then
    echo "snd-dummy" >> /etc/modules
fi
adduser $(whoami) audio
```

## Losing weight
As you could probably notice Selenium is a Java application. You need to have Java Virtual Machine (JVM) installed on your system to run Selenium. The smallest Java installation package called JRE is about 50 megabytes. Selenium JAR for the latest version 3.0.1 adds 20 more megabytes. Then consider operating system size, all required fonts, browser distribution size and you easily add up to several hundreds of megabytes. Although disk storage is now relatively cheap - we can do better. Selenium 2.0 and 3.0 series are also called Selenium WebDriver. This is because different browsers support is implemented using so called webdriver binaries. Here's how it works:
(picture)
1) Browser developers can implement their product any way they want. To have the product supported by Selenium they need to provide a standalone binary having the same API as Selenium Server does and supporting JSONWire protocol. This binary should be able to launch browser process, execute protocol commands according to their specification and stop process when requested. Any details of communication between driver binary and browser binary are left up to browser developers. The only contract is to support the same Selenium API. For example Chrome has [Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/), Opera Blink has [OperaDriver](https://github.com/operasoftware/operachromiumdriver) and so on.
2) When setting up Selenium you specify only the path to driver binary.
3) When you request a new session Selenium in fact launches the driver binary and then delegates (proxies) your requests to the driver process. Driver does the rest. You can achieve the same result by manually starting driver process on desired port and running your tests against this port.

Having said that - is not it a bit expensive to spend hundreds of megabytes for a simple proxy? A year ago the answer was definitely no because there was no such binary for Firefox - the most widely used Selenium browser. It was Selenium server responsibility to start Firefox process, upload an extension to it and proxy requests to the port opened by this extension. During the last year the situation has changed. Starting from Firefox 48.0 Selenium interacts with browser by using a standalone driver called [Geckodriver](https://github.com/mozilla/geckodriver). That means that at least for the majority of desktop browsers we can safely remove Selenium Server and proxy requests directly to driver binaries.

## Going to containers
In previous sections I described how we can organize a Selenium cluster using virtual machines in cloud. In this approach virtual machines are always running and thus spending your money. Also total number of hosts for concrete browser version is limited and this can lead to free browsers exhaustion during peak loads. I have heard about working and even patented sophisticated solutions that prelaunch and warm up a pool of virtual machines according to current load to always have free browsers. That works but can we do better? The main issue with hypervisor virtualization is the speed. It can take several minutes to launch a new virtual machine. Let's think a bit more - do we need a separate operating system for every browser? The answer is no - we only need filesystem and network isolation working fast. This is where container virtualization comes into play. For the moment containers work mostly under Linux but as I said Linux easily covers 80% of most popular browsers. Containers start in seconds and go down even faster.
(picture)
What should we place inside container? - Almost the same stuff as we do for virtual machine: browser binary, fonts, Xvfb. For the old Firefox version we still need to have Java and Selenium server but for Chrome, Opera and latest Firefox we can use driver binary as container main process. Using minimalistic Linux distribution such as Alpine we can deliver extremely small and lightweight containers.

### Selenoid
Actually the most popular and well-known container platform is [Docker](https://www.docker.com/). Selenium developers provide a set of prebuilt Docker containers to launch Selenium server standalone or Selenium Grid in Docker environment. Unfortunately to create a cluster you need to start and stop these containers manually or using some automation tool like [Docker Compose](https://docs.docker.com/compose/). This is already better than installing Selenium from packages but it would be better to get a lightweight daemon with the following behavior:
1) Somebody starts this daemon instead of standard Selenium Hub
2) The daemon knows that e.g. to launch Firefox 48 it needs to pull and run container X and for Chrome 53 - container Y.
3) A user requests Selenium session as usually but from this new daemon.
4) The daemon analyses desired capabilities, starts correct container and then proxies all requests to its main process (either a Selenium server or just a webdriver binary).
And we did it... and even more.

During the years of using standard Selenium server on a large scale we understood that it's an overhead to use JVM and fatty Selenium JAR for proxying requests. So we were searching for a lighter technology. Finally we chose the [Go](http://golang.org/) programming language aka Golang. Why is it better for our purposes?
1) Static linking. Compilation result is a single binary to run. Having the binary there is no need to install anything more like JVM for Java.
2) Cross compilation. We can compile binaries for different platforms using the same Go compiler.
3) Rich standard library. For us the most important things were out of the box reverse proxying and HTTP/2 support.
4) Big community. It's already becoming the mainstream.
5) Supported by popular IDE. There's a good plugin for IntellijIDEA and an alpha version of Gogland IDE on the same platform.

We did not find a good name for this new Go daemon. This is why it's called just [Selenoid](http://github.com/aandryashin/selenoid). To start working with Selenoid do three simple steps:
1) Create a JSON file with browser version to container mapping:
```
{
  "firefox": {
    "default": "latest",
    "versions": {
      "48.0": {
        "image": "selenoid/firefox:48.0",
        "port": "4444"
      },
      "latest": {
        "image": "selenoid/firefox:latest",
        "port": "4444"
      }
    }
  },
  "chrome": {
    "default": "53.0",
    "versions": {
      "53.0": {
        "image": "selenoid/chrome:53.0",
        "port": "4444"
      }
    }
  }
}
```
Like in GridRouter XML file you specify available browser versions. But Selenoid starts containers on the same machine or using a remote Docker API so there's no need to enter host names and regions. For each browser version you need to provide container name, version and port that container listens to.
2) Run Selenoid binary:
```
$ selenoid -limit 10 -conf /etc/selenoid/browsers.json
```
By default it starts on port 4444 as if it was Selenium Hub.
3) Run your tests pointing to Selenoid host like you do for standard Selenium.
(picture)
Our tests show that Docker containers even with standard Selenium server inside start in a few seconds. What you get instead - is a guaranteed memory and disk state. The browser state is always like after fresh installation. More than that you can install Selenoid on a cluster of hosts having the same set of desired browsers stored as Docker images. This gives you a big Selenium cluster that automagically scales according to browser consumption. If current requests need more Chrome sessions - more containers are launched. When there's no Chrome requests - all containers go down and free place for other browser requests. To deliver better load distribution Selenoid automatically puts requests exceeding sessions limit to wait queues and processes them when some sessions on the same host end. But Selenoid is not just a container management tool. It allows you to start on demand not only containers but also any driver binaries instead. The main use case for this feature is replacing Selenium Server on Windows. Selenoid in that case will start IEDriverServer binary thus economizing memory consumption and avoiding some proxying errors in Selenium Server.

### Go Grid Router (aka ggr)
Do you remember that GridRouter is also a Java application? We did an effort and created a lightweight Go implementation called Go Grid Router (or simply ggr). What are the benefits?
1) Increased performance. Can serve at least 25% more requests.
2) Lower memory consumption. Under 150 rps load it consumes 100-200 megabytes of RAM and this consumption remains stable.
3) Client disconnect issue fixed. When client disconnects (e.g. because of timeout) original GridRouter continues the attempts to create a new session. This clutters the network and decreases GridRouter performance when too many hubs become unavailable. Go implementation contrarily stops new attempts as soon as client disconnects.
4) Graceful restart. When used outside of Docker containers you can gracefully (without losing client requests) restart the server by sending SIGUSR2.
5) Quota reload by request. When using multiple GridRouter instances behind load balancer it's important to update quota XML files synchronously. When you add new hub hosts and update XML files on a running cluster a quota inconsistency may occur. In that case some client sessions can get 404 error because not all GridRouter instances have the latest host lists already installed. Go implementation does not reload quota files automatically but wait for a SIGHUP signal. This works with both standalone binary and Docker container.
6) Encrypted passwords. Ggr uses Apache [htpasswd](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html) files with plain text user name and encrypted password.
7) Reduced binary size. Currently it's about 6 megabytes. No need to download and install Java. When packed inside Alpine Docker container total container size is 11 megabytes.

## Conclusion
In this part I told you about the bleeding edge technologies that can be used to organize Selenium cluster in modern way:
1) Why Selenium is suitable to be run in containers environment
2) What should be put to container
3) Which open source solutions exist to achieve this

## Ads
Though we are already using the software described in this article in our client's production we also would like to prepare a publicly available service. If you are interested in free beta-testing please leave your email on the following page: <url>
