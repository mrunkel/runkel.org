---
title: "Troubleshooting SMTP"
date: 2008-08-13
categories:
- SysAdmin
- Email
tags:
- SMTP
- email
- troubleshooting
keywords:
- tech
thumbnailImage: /images/Internet-mail-thumb.png
#coverImage: /images/image.jpg
autoThumbnailImage: false
thumbnailImagePosition: "left"
metaAlignment: center
comments: false
---
Internet email is easy to troubleshoot if you do it step by step.   This is a quick guide to troubleshooting what's wrong when you can't send or receive email.

<!--more-->
*Note: This article was written almost 10 years ago.  While it's still mostly true, it doesn't talk about encryption at all, which is fairly commonplace in the world of SMTP today.  Back then SPF and DKIM weren't around either.   For basic troubleshooting, it's still valid.*

Here's how it works, when you write your email, it gets submitted into the mail system and, if the destination is off server, ends up with your sending servers SMTP subsystem.

I'm not going to talk about how to configure your email, there are lots of really terrific guides on the Internet on how to do that (just google "set up <name of email software on <name of operating system>").  I'm going to talk about how to figure out what is wrong when it doesn't work after you've completed all theose steps.

Here's what normally happens:

1. The SMTP server program tries to figure out where to send your email. This is done by doing a DNS lookup for an MX record on the domain part of the address. (If there is no MX record, it will do a normal query for the domain part, if that doesn't work, you get a bounce message saying that the message couldn't be delivered.  If your system is really borked, that message will be sitting in the outgoing mail queue too!).
2. The server attempts to open a connection on TCP port 25 to the remote IP determined in step 1 above.
3. If successful, it does it's handshaking to determine encryption, authentication, etc.
4. It sends the message.   Once it gets the OK from the remote side, it deletes the message.

While cofiguring a new mail server (or moving it to a new IP) there are lots of things that need to work just to make basic mail flow, particularly from the world in.

I've always found it useful to perform these steps manually in order to identify where things might not be working.

## Replicating the process

Start off by doing a dig on the domain name in question.   If you're on MacOS, you're in luck, dig is installed by default.  If you're on windows, download a copy [here](https://www.danesparza.net/2011/05/using-the-dig-dns-tool-on-windows-7/).

{{< alert info >}}All the input is highlight blue.{{< /alert >}}

macadoo:~ mrunkel$ {{< hl-text primary >}}dig untangle.com mx{{< /hl-text >}}

```
; <<>> DiG 9.4.2-P2 <<>> untangle.com mx
;; global options:  printcmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 32638
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;untangle.com.			IN	MX

;; ANSWER SECTION:
untangle.com.		202	IN	MX	10 mail.untangle.com.

;; ADDITIONAL SECTION:
mail.untangle.com.	170	IN	A	198.144.196.58

;; Query time: 1 msec
;; SERVER: 10.0.0.1#53(10.0.0.1)
;; WHEN: Mon Nov  3 11:27:34 2008
;; MSG SIZE  rcvd: 67

macadoo:~ mrunkel$
```
{{< alert info >}}
You can specify a DNS server by appending @\<DNS Server Name/IP\> to the command line.  This can be useful to force a check of the "public" DNS system vs. what your internal DNS server says.
{{< /alert >}}

So, what just happend?  Using the dig command line program, we asked the default DNS server for the MX (Mail eXchange) record for the domain unangle.com.  then dig printed a bunch of info.   

After "Got Answer" we have a bunch of status information.  Under QUESTION SECTION, we see the question we asked.  Under ANSWER SECTION is the answer to our query.
In the ADDITIONAL SECTION is a further lookup, because the answer we received included a

Once you have the IP address of the server, you can telnet to port 25.. (If you'll notice, I've replaced all the TLD's with .spam in order to keep spam scrapers from getting my email addresses.

```
macadoo:~ mrunkel$ {{< hl-text primary >}}telnet mail.untangle.com 25{{< /hl-text >}}
Trying 198.144.196.58...
Connected to mail.untangle.spam.
Escape character is '^]'.
220 mail.untangle.spam ESMTP Exim 4.63 Mon, 03 Nov 2008 11:32:19 -0800
{{< hl-text primary >}}HELO host51.untangle.spam{{< /hl-text >}}
250 mail.untangle.spam Hello host51.untangle.spam [198.144.196.51]
{{< hl-text primary >}}MAIL FROM: marc@runkel.spam{{< /hl-text >}}
250 OK
{{< hl-text primary >}}RCPT TO: mrunkel@untangle.spam{{< /hl-text >}}
250 Accepted
{{< hl-text primary >}}DATA{{< /hl-text >}}
354 Start mail input; end with <CRLF>.<CRLF>
{{< hl-text primary >}}From: marc@runkel.spam
To: marc@runkel.spam
Date: yesterday
Subject: Test email

This is a test email.  Have fun reading it later.

m.

.
{{< /hl-text >}}
250 OK id=1Kx5CE-0004Iq-9s
{{< hl-text primary >}}QUIT{{< /hl-text >}}
221 mail.untangle.spam closing connection
Connection closed by foreign host.
macadoo:~ mrunkel$
```

Here's what we did:

1. We connected to the receiving mail server
2. We identified ourselves to the server with the HELO command
3. We told the server where the mail was from
4. We told the server where the mail was going
5. We gave the actual payload (the message) to the server.

200 messages are "ok"
300 messages are "ok but i need more info"
400 and 500 messages are "you screwed up"

## Notes and troubleshooting tips

* Some servers don't like backspaces, so if you enter one, you might need to enter the command again.
* Terminate the email body with a blank line, a period, and another blank line.
* If you use the hostname instead of the IP to telnet, make sure they resolve to the same thing.
* If you can't connect, then you have a firewall or port forward issue.
* If your server doesn't announce it's publicly resolvable domain name in the first 220 line, you might have some problems with strict senders.
* Some servers will disconnect you if your publicly resolvable name doesn't match what you type on the HELO line.
* If you get disconnected after MAIL FROM:, you probably have an RBL problem on your sending IP. Go to SpamHaus and check.
* If you get errors on RCPT TO: then your mail server isn't configured to accept mail for the correct domains.
* If you get relaying denied, your server is either mis-configured for relaying the right IP ranges, or you need to authenticate to the server. You should never set up your server to relay from any public IP space. It's just too risky. If you do have to, make sure it's restricted to IPs that only you have access too.
* In the DATA portion, the first part is the 'soft' headers. You can add headers here for the remote client to interpret and include. They are optional. Email body starts either immediately or after a blank line if you include headers.
* Usually, if you can get to the DATA portion, everything is working fine.

For more information on SMTP check out the [wikipedia page](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol).
