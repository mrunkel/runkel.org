---
title: "How to Pick a Password"
date: 2017-09-28
draft: false
categories:
- general
tags:
- principles
- thoughts
keywords:
- tech
- policy
- braindump
thumbnailImage: /images/chbs.png
autoThumbnailImage: false
thumbnailImagePosition: "left"
metaAlignment: center
comments: false
showDate: true
---
**Most of what you've been told about generating a good password is wrong.**  The well intentioned advice of pick a phrase and then obfuscate (ie, Fish Tacos are Delicious becomes F1$hT4c05rD3l1c10u5) it is still valid, but a bit misguided and not enough.   
<!--more-->

Passwords need to be long, otherwise they are easily cracked with today's computing power.  Passwords don't necessarily need to have special characters, but they need to be _unique per site_ and they should be _memorable_ so that _humans can remember them_.
The problem with short reused passwords crops up when a site like adobe, linkedin, or myspace gets hacked and their password database gets dumped.

The result is that the cracker now has a list that looks like this:
```bash
username:$6$bW9sX7mu$EGhkfoeBmV74.mA8eM5P.iqJr3e3vM/pyrT90CsY4OM1u8DTJf1WkfQufK2G5S7hSYiAvAPviR
```
That long string is a representation of a number (a very long number).  That number is calculated by turning your password into a number and doing some math on it.   It only works one way. There is no way to take that number, do math on it and get your password.    This is called a "one way hash."
When you login to a system, it takes the password you just typed in, performs the same set of math functions on it and sees if the resulting numbers match.  If they do, then you've typed in the same password as what was stored.

So, why is it a problem that the hacker has a list of usernames and hashes if the hash can't reveal your password?  Because they can now perform many many operations against that hash to try and guess your password.   This is similar to trying every key in the world against a lock until you find the one that opens it.  In the physical world, that's a daunting task, but digitally, with today's computational power, tens of thousands of guesses can be made per second.

**Your only defense is a long password phrase.**

This clever cartoon from [xkcd](http://www.xkcd.com) summarizes the situation beautifully:

{{< figure src="/images/xkcd-pick-password.png" link="https://xkcd.com/936/" >}}

## Here is a good common sense password policy:

1. _Longer_ is much better than _short_. Aim for at least **16** characters.
2. You don't need to include "special characters".  
3. **You don't need to change it every 90 days.**  Unfortunately this rule is enshrined in many 'best' practices including the mostly braindead PCI rules.  So you may be forced to change your password.
4. **Make it a sentence that you will always remember.**
5. **Don't reuse passwords.**
6. Use a password manager!!!  I highly recommend [1Password](https://1password.com/)
7. Seriously, **Don't reuse passwords.**
8. Enable multi-factor authentication.   Google supports it, so do most other services.  Use it.  It's a small pain in the ass, but getting your account hacked is a much bigger one.
9. Can't think of a good phrase?  Use a [generator](http://correcthorsebatterystaple.net/) or use 1Password.  It has a built in password generator.
