---
title: "Terminating Torrents"
date: 2017-07-20T04:07:44+02:00
categories:
- Applications
- VPN
tags:
- Viscosity
- Transmission
- Torrents
- VPN
- OS/X
keywords:
- Viscosity
- Transmission
- Torrents
- VPN
#thumbnailImage: /images/image.jpg
#coverImage: /images/image.jpg
autoThumbnailImage: false
thumbnailImagePosition: "left"
metaAlignment: center
comments: false
---
I don't often Torrent, but when I do, it's my business and no one else's.
<!--more-->
So, this is a quick write up for how to pause your torrents if your VPN goes down.

We'll be using:

* [MacOS](https://en.wikipedia.org/wiki/MacOS) née OS X
* [Transmission](https://transmissionbt.com/) - A multi-platform bittorrent client
* [Homebrew](https://brew.sh/) The missing package manager for macOS
* and the [Viscosity VPN](https://www.sparklabs.com/viscosity/) client (if your VPN client can run scripts, it will work too.)

First things first.  I'm assuming you've already installed transmission, if not. Go [here](https://transmissionbt.com/) and install it.

Next, because the transmission developers [refuse](https://trac.transmissionbt.com/ticket/5330) to bundle the transmission command line interface (cli) with the MacOS build, we'll need to install them via [brew](https://brew.sh).    If you don't have brew yet for MacOS and are coming from a \*nix background, you'll be happy the I'm making you install it!

Then install the transmission client via brew (don't worry, this only installs the command line utilities, not the application) by opening the terminal and running:

{{< highlight bash >}}
brew install transmission client
{{< /highlight >}}

If necessary configure the transmission client to work with your installation.  If you didn't change any defaults, it should just work.  Running:

{{< highlight bash >}}
transmission-remote -l
{{< /highlight >}}

is a good test to verify that the script is talking to transmission properly.

Now launch the AppleScript Editor.

1. Click "New Document" in the bottom left corner of the file menu.
2. Type do shell script "/usr/local/bin/transmission-remote -t all -s"
3. Save the script as "start-transmission" somewhere that you'll be able to find it again.
4. Click File New
5. Type do shell script "/usr/local/bin/transmission-remote -t all -S"
6. Note the uppercase S
7. Save the script as "stop-transmission"

If you'd like, you can test the scripts by clicking the {{< figure class="inline-block" src="/images/play.png" alt="play" >}} icon.   If you do this in the "start-transmission" script, the torrents should all start.  I wonder if you can guess what the stop-transmission script does? :)

Now open viscosity.

1. Click on your VPN connection
2. Click the edit button
3. Click to the advanced tab
4. Click on the "Connected Script" and find the start-transmission script.
5. Click on the "Disconnected Script" and find the stop-transmission script.
6. Click Save

That's it!  At this point, if you disconnect the VPN, all transmission torrents should stop.  If you start the VPN again, they should all start again.
