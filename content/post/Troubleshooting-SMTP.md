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
#thumbnailImage: /images/image.jpg
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

### Perform these steps manually to isolate where the problem is:

1.) do an nslookup or dig on the domain name in question.

On windows:

Code:
{{< tabbed-codeblock get_dns >}}
<!-- tab windows -->
C:\Documents and Settings\mrunkel>nslookup
Default Server:  exchange.untangle.local
Address:  192.168.10.15

> set type=mx
> untangle.com
Server:  exchange.untangle.local
Address:  192.168.10.15

Non-authoritative answer:
untangle.com    MX preference = 10, mail exchanger = mail.untangle.com

mail.untangle.com      internet address = 198.144.196.58
> server 64.2.3.4
Default Server:  dns.untangle.com
Address:  64.2.3.4

> untangle.com
Server:  dns.untangle.com
Address:  64.2.3.4

untangle.com    MX preference = 10, mail exchanger = mail.untangle.com
untangle.com    nameserver = dns.untangle.com
untangle.com    nameserver = dns2.untangle.com
mail.untangle.com      internet address = 198.144.196.58
dns.untangle.com       internet address = 64.2.3.4
dns2.untangle.com      internet address = 75.102.13.22
>
<!-- endtab -->
<!-- tab unixish -->
macadoo:~ mrunkel$ dig untangle.com mx

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
<!-- endtab -->
{{< /tabbed-codeblock >}}

As you can see, both systems are nice enough to do the additional lookups to give you the IP addresses you need.

It is important keep in mind is to make sure you're checking the same DNS server that the sender's email server would be using, so make sure it's a public DNS server if the mail is coming from outside their network.

Once you have the IP address of the server, you can telnet to port 25.. (If you'll notice, I've replaced all the TLD's with .spam in order to keep spam scrapers from getting my email addresses.

{{< codeblock "sending a fake email" "bash" "http://underscorejs.org/#compact" "whatisthis.sh" >}}
macadoo:~ mrunkel$ telnet mail.untangle.spam 25
Trying 198.144.196.58...
Connected to mail.untangle.spam.
Escape character is '^]'.
220 mail.untangle.spam ESMTP Exim 4.63 Mon, 03 Nov 2008 11:32:19 -0800
HELO host51.untangle.spam
250 mail.untangle.spam Hello host51.untangle.spam [198.144.196.51]
MAIL FROM: marc@runkel.spam      
250 OK
RCPT TO: mrunkel@untangle.spam
250 Accepted
DATA
354 Start mail input; end with <CRLF>.<CRLF>
From: marc@runkel.spam
To: marc@runkel.spam
Date: yesterday
Subject: Test email

This is a test email.  Have fun reading it later.

m.

.

250 OK id=1Kx5CE-0004Iq-9s
QUIT
221 mail.untangle.spam closing connection
Connection closed by foreign host.
macadoo:~ mrunkel$
{{</codeblock>}}

Here's what we did:

1.) We connected to the receiving mail server
2.) We identified ourselves to the server with the HELO command
3.) We told the server where the mail was from
4.) We told the server where the mail was going
5.) We gave the actual payload (the message) to the server.

200 messages are "ok"
300 messages are "ok but i need more info"
400 and 500 messages are "you screwed up"

Some servers don't like backspaces in addresses, so if you enter one, you might need to enter the command again.

If you use the hostname instead of the IP to telnet, make sure they resolve to the same thing.

If you can't connect, then you have a firewall or port forward issue.

If your server doesn't announce it's publicly resolvable domain name in the first 220 line, you might have some problems with strict senders.

Some servers will disconnect you if your publicly resolvable name doesn't match what you type on the HELO line.

If you get disconnected after MAIL FROM:, you probably have an RBL problem on your sending IP. Go to SpamHaus and check.

If you get errors on RCPT TO: then your mail server isn't configured to accept mail for the correct domains.

If you get relaying denied, your server is either mis-configured for relaying the right IP ranges, or you need to authenticate to the server. You should never set up your server to relay from any public IP space. It's just too risky. If you do have to, make sure it's restricted to IPs that only you have access too.

In the DATA portion, the first part is the 'soft' headers. You can add headers here for the remote client to interpret and include. They are optional. Email body starts either immediately or after a blank line if you include headers.

Terminate the email body with a blank line, a period, and another blank line.

Usually, if you can get to the DATA portion, everything is working fine.

For more information on SMTP check the wikipedia page.
