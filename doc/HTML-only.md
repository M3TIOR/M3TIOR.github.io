# Why support HTML-only?

So at this point in time some of you who follow who my work [currently nobody] may be thinking: what the hell M3TIOR? Why did you waste time making the static elements of your website look good as raw HTML?

> Because now it looks good by default.

This is for all you simpletons out there... Just kidding, it's for everybody who wants to see if they have a thing or two they can learn from me.

There are many reasons to make your site html-first.

 * It's low bandwidth, meaning there's less latency from query to response.
 * Doesn't have overhead, meaning it's easy to host (Some people might be viewing it from within a twenty year old dinosaur).
 * Not everyone wants CSS or fancy graphics.
 * Not everyone wants Javascript.
 * HTML has it's own pre-determined scheme. You don't have to go make your own.
 * You support minimalistic browsers that don't support Javascript or CSS like [w3m](http://w3m.sourceforge.net/).

There are a lot of reasons; the list goes on.

My personal reasons for making my site HTML-friendly, are that I have a thing for legacy tech and protocols, and I'm using it as my cover letter. legacy protocols and code can still be useful and powerful at that, it's just for some reason a lot of good ones are underrated. HTML is one of these protocols/languages that most would preach is outdated. The original point of the [World Wide Web Consortium](https://www.w3.org/) was to give structure to the Internet, and they leveraged HTML for this purpose. Over the years, it was devised that with the power of the DOM (Document Object Model) programmers could make interfaces that would make the web more akin to native applications. Easy to see how far that's come.

What I don't understand is why programmers don't use the HTML first approach in all their projects. The built in HTML elements and their associated functions still have application today, hell people go out of their way to make [div]ider elements into buttons or video players with Javascript canvases. Here's the thing though, Built in elements are pre-processes and natively constructed, meaning they're faster. CSS and Javascript are both post-processes, so naturally, they can only manipulate the DOM after it's been constructed. It's a huge waste of resources and energy! It's more data being transmitted, more information being processed, all the way around just a big fat waste of time! This makes sense for games or fancy animations, but not static content. I just don't see the point.

I'm gonna make a huge claim here, and say that we could probably save at least 1% of the world's whole electrical usage by making use of all the resources we're given, instead of trying to make our own with fancy post-processes. Like I said, it's a broad claim.
