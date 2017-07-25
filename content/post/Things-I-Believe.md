---
title: "Things I Believe"
date: 2020-07-10
categories:
- general
tags:
- principles
- thoughts
keywords:
- tech
- policy
- braindump
thumbnailImage: /images/beliefs.jpg
#coverImage: /images/image.jpg
autoThumbnailImage: false
thumbnailImagePosition: "left"
metaAlignment: center
comments: false
showDate: false
---
Over the years, I've encountered a lot of a technology platforms, programming methodologies, and ways of doing business.     During that time, I've come up with thoughts and ideas that guide me through my working life.  This is of course the ideal.  I've fallen short many times and will continue to do so I'm sure (See below...).
<!--more-->

General
---
* Always be learning new things.   You don't have to put them all into use, but you should at least have a mid-level understanding of them.
* Be willing to try.   Fear of failure is ok, it makes you try harder.   If nobody tried crazy stuff, we'd all be sitting in Europe wondering how to get to India. :)
* Be honest about yourself with others.  If you make a mistake, own it, explain how you'll fix it and how you'll make sure it doesn't happen again.
* If you don't know, say "I don't know," but follow it up with "I'll find out."
* Don't expect other people to conform to your expectations.  That's just a recipe for sadness.
* Don't send emails in anger.   *By all means, write that flamefest.*  **Then let it sit.**  Read it again in an hour and you'll have an entirely different perspective.
* Don't work with people you can't trust.    You wouldn't live with them, why would you work with them?
* Successes belong to the team, mistakes belong to the manager.
* Spend time managing up.  Set expectations, provide context for decisions, show an interest in the larger company.
* When recommending a course of action, always make sure to present several options, including the benefits and drawbacks of each.
* Failing to prepare is preparing to fail.  But, "Improvise, Adapt, and Overcome" is also important.   No plan is foolproof, be prepared to change gears on the fly.
* Writing documentation is a hard and tiring slog, but it's a must.  It's not shipped until it's documented.
* You don't need to be friends with your co-workers, but being friendly helps.

Business Processes
---
* The customer isn't always right, but it's good to make her feel like it.   99% of the customers we deal with are awesome, friendly, nice people.  But even nice people get angry sometimes and not always for something that we've done.   It costs next to nothing to assuage these people.  You don't need to be right.   Just solve the underlying problem and move along.
* In a support team, if you don't document customer interactions, you're better off just not talking to them.  Not using a ticketing system when you have more than 5 customers or more than one support person is inexcusable.
* Don't even think about using business models that rely on thwarting user desires.  If your user wants to cancel, don't put systems that make it hard in hopes that the user will give up.
* Don't surprise the customer.   Use the reasonable person standard.  Would a reasonable person expect this to work like this?
* Look through your workflows and find areas that cause uncertainty and doubt.   Choices aren't bad, choices that don't clearly explain what they mean and what the consequences are (especially financial ones) are bad.
* If your team is geographically dispersed, make them **all** use chat. Like any network, the value of the network goes up exponentially with the number of "nodes." so execs should be on chat too, but be sure to give teams their own private space to communicate.

Software Development
---
* Clarity beats clever.  Sometimes, high performance is what should be coded for at all costs, these are rare moments.  In general, you should be writing code for clarity of purpose.  It's far, far better if a future programmer can understand the intent of your code quickly and clearly than if you can show off some particuarly clever coding.  Who knows, that future programmer might just be you. :)
* When working in a team, never commit code you haven't tested extensively.  There is a reason the command is called git blame!
* If your company doesn't pass the [Joel Test](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/), passing it should be your top priority.
* Agile and Scrum are not religions.  You don't need priests, you shouldn't have sacred texts.  Throw out or adjust what doesn't work for your company. Except for [this](/2016/09/the-only-important-rule-of-the-scrum-process.)!
* Steve Jobs was right, users don't know what they want until you show it to them.   Tools like [Balsamiq Mockups](https://balsamiq.com/products/mockups/) are great, but don't expect your end users to fully get it until they see it.  Photoshop renders are probably still going to be a thing in your life.
* For me the biggest stumbling block in the software development lifecycle is still getting requirements down on paper.  This takes time and energy which product owners usually don't have in abundance (since they need to be doing their "real" jobs as well.)   This leads to sadness.   Nobody likes to be sad.
* If you aren't using Vagrant/Docker/Containers for your development environment, you should be.
* If you aren't doing Continuous Integration, even if it's something as simple as running a linter, you should be.   This should happen for the front end and the back end codebases.
* You're not too smart to use an Integrated Development Environment (IDE). Using a good IDE with standard settings goes a long way to keeping your code base in good shape.  A) Code style can be shared via configuration B) Nothing encourages inline comments like *not* seeing documentation pop up for a class or method you want to use.
* Use a ticket tracking system to track new bugs and features.   Track your work.  Develop good flows for developer/QA interaction.  Don't use a ticket tracker for chats.  Use slack/hipchat/etc. and summarize into the ticket tracker.
* Before developing anything, check for a library that already exists.   Yes, learning libraries is a [PITA](http://www.urbandictionary.com/define.php?term=P.I.T.A), but writing your own code for a problem that is already solved is just criminal.   The more people the use a piece of code, the better quality of that code becomes.   We live in amazing times where things like GitHub/StackExchange/Google exist.  Believe me things are great now. As a greybeard programmer, this was my google/stackexchange: {{<image classes="fancybox center" src="/images/TRS-80-reference-manual.jpg" thumbnail="/images/TRS-80-reference-manual.jpg" thumbnail-width="75px" thumbnail-height="100px">}}

Infrastructure
---
* Measure twice and cut once is as important for the command line as it is for carpentry.   When I worked at the 911 center in New York, the rule was "would you trust your life on this command line."
* Backups.   On-Site, Off-Site... Need I say more?  Disk and cloud storage is cheap, [backup software](https://github.com/n1trux/awesome-sysadmin#backups) is cheap so there is no reason you aren't backing up everything.
* Configuration Management.  Stop doing stuff over and over again.   Chef, Ansible, Puppet, terraform.  These products will pay you back one thousand fold for learning them.  See [here](https://github.com/n1trux/awesome-sysadmin#configuration-management) for a complete list.
* A good set of backups + Configuration Management = disaster recovery in a box.  Just be sure to test it and document the steps.
* Are you sure you need that expensive Cisco gear?  I know it's cool and it looks good on a resume, but I bet you can blow away that price/performance point with a stock Dell running [VyOS](https://vyos.io/).
* Metrics.  If you're not measuring it, you're blind.   I love [LibreNMS](http://www.librenms.org/).   Use it to measure all your servers stats via SNMP (and optional agents).
* Monitoring.  If you're measuring stuff, make sure you get notified when things go wrong.    This is harder than it sounds.  You want to be notified for actionable alerts, but you don't want to miss the wheat for the chaff.   Alerts that everyone ignores aren't useful.

So, that's just a few of the things I believe.    If you want to hire this kind of person, check out my [resume](/resume)!
