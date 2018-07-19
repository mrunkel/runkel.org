---
title: "GDPR Wrong"
date: 2018-07-19T12:09:06+02:00
categories:
- GDPR
- politics
tags:
- consent
- webdesign
keywords:
- tech
#thumbnailImage: /images/image.jpg
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
The GDPR is a new EU wide legislation that harmonizes the handling of personal data for all EU
citizens.  You can read an a decent executive summary from [ZDNet](https://www.zdnet.com/article/gdpr-an-executive-guide-to-what-you-need-to-know/) or you can
read about it from the [EU](https://ec.europa.eu/commission/priorities/justice-and-fundamental-rights/data-protection/2018-reform-eu-data-protection-rules_en).
<!--more-->

In general the basic concept is this: If you accept data from your users, you have to:

1. Be upfront about what you're using it for outside of expected business purposes 
2. Gain their *explicit* consent before using it for any other purpose (don't pre-fill 'yes')
3. Notify them in a timely manner if their data gets leaked

Seems pretty easy right?

It seems like this is the sort of thing we really shouldn't need regulations around right?
I mean, businesses want to treat their customers well don't they?

For an eye opening look, check out this [study on web design anti-patterns](https://fil.forbrukerradet.no/wp-content/uploads/2018/06/2018-06-27-deceived-by-design-final.pdf) by the Norwegian goverment.

This is a personal example of how not to comply with the GDPR.

I recently clicked through on google news to westernjournal.com (not linked).

I was presented with this screen:

{{< figure src="/images/gdpr/value.png" title="That's nice, they value my privacy" >}}

Nice. So far so good, a big old "I do not accept button."

However, clicking on the button leads to this page:

{{< figure src="/images/gdpr/nope.png" title="I guess they don't value my privacy?" >}}

Which also included over [3,000 lines of javascript code](https://gist.github.com/mrunkel/fb50c1795d372bd945768ca0669a9faf).

It also set all these cookies:

{{< gist mrunkel 7f16fad35250da476ab0cc58aebde7ec >}}

This is after I said I don't want to be tracked.   It also set cookies for the following domains:

{{< figure src="/images/gdpr/cookies.png" title="What happens if you say yes?" >}}

It's unlikely that this company has any presence in the EU, so they really didn't need
to comply with the directive at all, but if you're going to do so, why spend all that time and money
and then just make it a charade.

As it stands now, this site is **not** compliant with the directive.  You aren't allowed to block someone
because they didn't want to give you data that isn't necessary to provide them with the service.

That's the end of my rant.. Thanks for reading.