# Selenium: done in 60 seconds
Selenium is nowadays an indisputable standard in browser automation. Its architecture is well-known and all popular browsers are supported out of the box. More than that commercial companies provide Selenium infrastructure as a paid service. But is it comfortable to use Selenium server on developer's machine?

## Problem
Being web-application developer or QA automation engineer you can face the following inconveniences in your experience with Selenium server:
1) You need to install different browsers to your operating system. In real world you are using e.g. Chrome but have to install Firefox and Opera just for Selenium.
2) It is complicated to install and use multiple versions of the same browser. Binary packages normally allow one active browser version. Selenium or its web drivers normally search browser binaries in some predefined paths. So trust me - it is difficult.
(picture - painful Selenium Server)
3) If you are using Selenium to launch a browser from your operating system - it clutters your disk with cache and other temporary files. 
4) More than that you can't guarantee that browser settings remain in the same state like it was after fresh installation. For example you can accidentally change proxy server or security settings. This can lead to broken tests.
5) Difficult to run several tests in parallel in multiple browsers. Trying to do this causes different issues with window focus: not firing events, unexpected CSS styles and so on.
6) Need to know browser versions compatible to installed Selenium version. The same problem occurs with webdriver binaries.
This list of disadvantages is far from being complete. But let's stop at this point and follow a better way to deal with Selenium testing on your development machine.

## Introducing Selenoid
In my previous article ([part I](https://hackernoon.com/selenium-testing-a-new-hope-7fa87a501ee9), [part II](https://hackernoon.com/selenium-testing-a-new-hope-a00649cdb100)) I briefly described new open-source Selenium tools: [Ggr](http://github.com/aerokube/ggr) and [Selenoid](http://github.com/aerokube/selenoid). **Ggr** is mainly used to organize large Selenium clusters and is not needed to use Selenium on your computer. What I am going to talk about is **Selenoid** - an alternative lightweight Selenium hub implementation that launches browsers in [Docker](http://docker.io/) containers.

Why starting browsers in containers is so useful? And what is the difference between using standard Selenium in Docker containers and using Selenoid? - The main idea behind Selenoid is to start short-lived containers for each Selenium session (i.e. request for browser) and stop them immediately when session is closed. Such approach automatically resolves all issues related to old session caches and sharing browser settings among sessions. Every container consists of specific browser version, a corresponding webdriver binary supporting this version and all required dependencies like fonts, graphics toolkits and so on. More than that containers provide an enough level of isolation between browser processes. This allows you to use an unlimited number of different browser versions in parallel and forget about focus issues. Running standard Selenium in containers can also resolve most of the issues above. But to get the same result as Selenoid gives you out of the box you need to use complicated admin-style configuration tools like [Ansible](http://ansible.com) or [Salt](http://saltstack.com/) in addition to installing Docker platform.

## Installation
Having said that let me show how easy and user-friendly Selenoid is. To start using it you need to complete 3 short steps:
1) Install [Docker](http://docker.com/). This is usually done with your operating system package manager like [APT](https://wiki.debian.org/Apt), [Yum](https://fedoraproject.org/wiki/Yum) or [Brew](http://brew.sh). Please refer to Docker [documentation](https://docs.docker.com/engine/installation/) on how to do this.
2) Create Selenoid configuration directory and generate configuration file:
```
# mkdir -p /etc/selenoid
# docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aerokube/cm:1.0.0 selenoid --last-versions 2 --tmpfs 128 --pull > /etc/selenoid/browsers.json
```
The last command will pull Docker images for 2 latest versions of Firefox, Chrome and Opera and generate valid Selenoid config.
3) Start Selenoid:
```
# docker run -d --name selenoid -p 4444:4444 -v /etc/selenoid:/etc/selenoid:ro -v /var/run/docker.sock:/var/run/docker.sock aerokube/selenoid:1.1.1
```
That's it - done in 60 seconds. No need to install Java and download Selenium binaries manually. You can now access Selenoid using in your tests the same URL you were using for standard Selenium:
```
http://localhost:4444/wd/hub
```

## User interface and statistics
Selenoid can be used in conjunction with Ggr to organize large Selenium clusters. This is why it does not have any user interface like Grid Console in original Selenium. You can view browser consumption in two different ways:
1) Start an additional lightweight container with Selenoid UI. To do that type:
```
# docker run -d --name selenoid-ui --net host aerokube/selenoid-ui:1.0.0
```
(picture: selenoid ui)
2) Send Selenoid status to an external system like [Graphite](), [InfluxDB](), [ElasticSearch](), etc. Selenoid outputs its status on the following URL:
```
http://localhost:4444/status
```
The output is JSON of the following format:
```json
  $ curl http://localhost:4444/status
  {
    "total": 80,
    "used": 0,
    "queued": 0,
    "pending": 1,
    "browsers": {
      "firefox": {
        "46.0": {
          "user1": 5,
          "user2": 6
        },
        "48.0": {
          "user2": 3
        }
      }
    }
  }
```
Selenoid returns how many containers can be run in parallel on this host ("total"), how many of them are running ("used"), how many requests wait in queue ("queued") and how many containers are starting now ("pending"). Finally "browsers" section contains browser consumption by version and user name. User name is extracted from Basic HTTP headers if present (default is "unknown" if not present). Though you could process this JSON manually with some script we recommend to use [Telegraf](http://github.com/influxdata/telegraf/) for that purpose. Read more about uploading data with Telegraf in [this](https://github.com/aerokube/selenoid#sending-statistics-to-external-systems) section of our docs.

## Ready to use containers with browsers
That is good to have a tool that automatically starts containers with different browsers for you. But that's even better to have ready to use containers with various browser versions. We did an effort and packed a lof of different versions of Firefox, Chrome and Opera in containers. You can see all available containers on [selenoid@DockerHub](http://hub.docker.com/u/selenoid/).
(picture: browser zoo)
To always have an up to date choice of browsers you need to periodically run Selenoid configuration command. This is done like the following:
```
# docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aerokube/cm:1.0.0 selenoid --last-versions 2 --tmpfs 128 --pull > /etc/selenoid/browsers.json
```
The command above automatically downloads latest containers and generates new JSON configuration file for Selenoid. To start using new images you need to reload Selenoid configuration:
```
# docker kill -s HUP selenoid
```
Our containers also support setting any custom screen resolution (default is ```1920x1080x24```). To do this simply pass an additional ```screenResolution``` capability in your tests:
```
screenResolution: 1280x1024x24
```

## Conclusion
In this article I demonstrated how to efficiently orchestrate different Selenium browsers. Trust me - Selenium can be painless. If you are interested in efficient software testing infrastructure - find more open-source tools our [Github](http://github.com/aerokube) or follow us on [@aerokube](http://twitter.com/aerokube).
