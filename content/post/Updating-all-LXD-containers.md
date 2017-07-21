---
title: "Updating All LXD Containers"
date: 2017-03-02
categories:
- SysAdmin
tags:
- LXC
- LXD
keywords:
- LXC
- LXD
thumbnailImage: /images/containers-thumb.png
#coverImage: /images/image.jpg
autoThumbnailImage: false
thumbnailImagePosition: "left"
metaAlignment: center
comments: false
showDate: true
showSocial: true
showTags: true
showPagination: true
---
This script allows you to upgrade the OS on all your lxd containers. It could easily be modified to run whatever you'd like.

<!--more-->
{{< codeblock "updateAllContainers.sh" "bash" >}}
#!/bin/bash
 # A simple shell script to update all lxd container hypervisor
 # URL: https://bash.cyberciti.biz/virtualization/shell-script-to-update-all-lxd-container-hypervisor/
 # Tested on : Ubuntu 16.04 LTS lxd server
 # Tested on : Ubuntu/Debian lxd container hypervisor only
 # ----------------------------------------------------------------------------
 # Author: nixCraft
 # Copyright: 2016 nixCraft under GNU GPL v2.0+
 # ----------------------------------------------------------------------------
 # Last updated 14 Aug 2016
 # ----------------------------------------------------------------------------
 # Set full path to bins
 _apt="/usr/bin/apt-get"
 _lxc="/usr/bin/lxc"
 _awk="/usr/bin/awk"
 # Get containers list
 clist="$(${_lxc} list -c ns | ${_awk} '!/NAME/{ if ( $4 == "RUNNING" ) print $2}')"
 # Use bash for loop and update all container hypervisor powered by Debian or Ubuntu
 # NOTE: for CentOS use yum command instead of apt-get
 for c in $clist
 do
 echo "Updating Debian/Ubuntu container hypervisor \"$c\"..."
 ${_lxc} exec $c ${_apt} -- -qq update
 ${_lxc} exec $c ${_apt} -- -qq -y upgrade
 ${_lxc} exec $c ${_apt} -- -qq -y clean
 ${_lxc} exec $c ${_apt} -- -qq -y autoclean
 {{< /codeblock >}}
