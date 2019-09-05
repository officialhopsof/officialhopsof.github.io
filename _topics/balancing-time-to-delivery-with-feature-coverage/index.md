---
layout: topic
title:  "Balancing Time to Delivery with Feature Coverage"
categories: project_management consumer_focus
permalink: /topics/balancing-time-to-delivery-with-feature-coverage/
last_modified_at: 30-08-2019
comments: true
---

<!-- Multiplexer example is confusing, include more context in the mock
    define uberization
    optimize for mean time to recovery not mean time between failures
    specify why "amazon comes to mind" -->

## Forward

Everything to follow is my opinion. It is the accumulation of things I have learned over the first 10 years of my career and should be taken skeptically. I invite you to read through these thoughts and form your own opinions. Push back against things that do not make sense and do what you think is best for you, your career, and your company.

<img alt="Jeff Bridges as &quot;The Dude&quot; says, &quot;Yeah, well. That's just like your opinion, man.&quot;" src="https://media.giphy.com/media/26BRrSvJUa0crqw4E/giphy.gif">

## tl;dr

>Why? Consumers don't care if you don't deliver now. Time right now is more valuable than time later.
>
>Who? Compassionate teams. Assholes get in the way of delivering value quickly.
>
>What? Cut as many features as you can in planning. Be honest about the minimum set of requirements. Measure engagement.
>
>How? Push back against hard features. Compromise, if possible. Don't be a perfectionist!
>
>When? Deploy frequently.

## Value of time now vs time later

With the uberisation of our economy and of the modern consumer, it can be expected that no one is willing to wait for anything. Businesses die and are replaced on this principle alone (Amazon comes to mind). Businesses cannot afford to be second to market. It is imperative that they strive to deliver the most value to the consumer as quickly as possible. If one company does not do this, another will.

This is not something most engineers concern themselves with, which is odd, given the power they wield. A few lines of code can transform the marketplace. It can deliver millions of dollars worth of revenue. It can also erode, or even destroy trust. It is important to constantly be thinking about what we, as engineers, can do to put things in front of the consumer in the most efficient manner possible.

## MVP

When defining what your MVP (Minimum Viable Product) is for the launch of a feature or product, it is prudent to be absolutely ruthless about what is truly required to deliver it to the customer. As developers it is too easy to get excited about a certain technology or shiny new tool, and look around for problems we can fit that solution into. Instead take a close look at what your specific needs are. Take a look at who your customer is. Take a look at what your customers needs are. Use this information to select your final supported feature set and deliver only on that. Ultimately, the work we do falls into one of two categories: value added, or non value added. We should be focusing on maximizing the value added portion of our deliverables. Some non value added work is necessary and some is not. We may cover that topic in future.

> What if it is going to take a long time to get my product in front of consumers, even after only selecting the necessities from the ticket pool?

Iterate. What part of your product will deliver the most value? Push that out before anything else. After you have that piece out, work on the next most value added piece.

> What if none of my project delivers value until it is all in place?

Push out your changes hidden behind a feature flag. This is called a dark deploy. That way, even if it is broken, you are pushing code continuously. We should strive to deploy as much and as quickly as possible. I had a manager once that would urge us to push code to production every day. This has the benefit of forcing you to think in terms of small deliverables, and perhaps you will find that your big project is really several smaller ones. You will find that as you define these small steps, you may be able to omit some that are not truly needed. It has the other effect of forcing your code into a production environment where you can test it. All too often our test, local development, and production environments do not look the same.

## Pushing back on requirements

In your quest to build great user experiences quickly you will find features that you are asked to implement that turn out to be difficult to pull off. Look out for these situations and be mindful of alternatives that you could propose. Remember that designers, project managers, and other stakeholders share the same goals you have; to deliver the most value to consumers as efficiently as possible. Do not hesitate to offer an easier implementation of something that will let you deliver more quickly. Even if your alternate proposal does not totally mitigate the need for the original requirement, it may significantly lower the priority of it.

## Case Study:

Let's say you work on a popular online real estate database company website, and were tasked with implementing a new feature:

> When a user attempts to submit an inquiry to request a viewing for a home with a real estate agent, the user is shown a success screen. We would like to show other houses within a 10 mile radius. The mock for the new design is shown below.

[![Real estate multiplexer mock. Copy reads, &quot;Other houses within 10 miles of 84 Beacon St, Boston.&quot;]({{page.dir}}mock.jpg)]({{page.dir}}mock.jpg)

In your research for this ticket you have noticed that the way your systems were designed to make nearby calls was by zip code and not by radius from location. At this point it is good to take a step back and think about how important that constraint of "10 miles" really is. It likely seems that the spirit of this added feature is to show other houses in the general search vicinity of the consumer. Given this understanding of what you are trying to accomplish as an organization, you come up with an estimate of how long it will take you to do the ticket as is. You also decide to come up with an alternative. By leveraging the zip code lookup that your system already supports, you could change the copy of the mock to read, "_Other houses in ZIP_CODE._" and do the lookup based on zip code instead of radius. You decide that this alternative would take you roughly 1/4 of the time to implement and decide to go to the product manager and ux designer to make your proposal.

## Avoid perfection; Take risks

It is ok to deploy something that breaks. As engineers we need to realize that we make mistakes, everyone does. We need to grow a culture where failure is ok as long as we learn from it. If you aren't breaking things then you aren't pushing the bounds of what you are capable of. You should feel confident about deploying frequently and you should know that you will fail sometimes. If you are in a culture that doesn't have that mentality, then rapid iteration will not be achieved.

As engineers, we often we let the pursuit of perfection get in the way of us solving problems. Remember, software is a tool. It is a solution, but often it is viewed as a problem. As a consumer centered engineer, we should strive to take joy in problem solving, not in engineering. Stay focused on the outcomes that drive your goals. Every change you make has the potential to impact the consumer and we should be prioritizing the most impactful among them.

## The dichotomy of best practices and quick iteration

Pushing the envelope of what we are capable often times comes at the cost of best practices. You could read everything I have said up to this point to mean that this trade off is fair and good. This would be a false assumption. I firmly believe nothing could be further from the truth. Best practices should constantly be practiced. They should become second nature in how you design and write. Linting and coding standards and design reviews should never take a back seat to shipping a feature. A well formed design is easier to understand, and therefore faster to iterate on. Be mindful of the implications of the changes you make. Know what the downstream effects are and be able to justify these effects. It is important to keep in mind that sometimes slower is faster.

## When failure is not an option

> I work in a system that can't fail. Even a small failure would potentially bankrupt my company, or worse, put people in harms way.

Let's say you work in defense or space and do not have the luxury of making mistakes or even having a test or local development environment. You test on real hardware and if you make a mistake, someone dies.

In this situation, you can still iterate and deploy frequently. The production hardware is available. Set up a deploy cadence that works for your team and situation. This way, you can still make mistakes and deploy broken code on a production system. You will also have the benefit of always having a demo ready for the customer if they decide to visit. The reality is, some domains require a lot more oversight to get a product in front of the consumer. This only removes one of our many tools that we have to deliver value quickly.

## Making informed decisions

Sometimes you just don't know what you can cut or if the feature is worthwhile at all. For the following strategies you will see a common theme, measurements.

### Shipping broken

It is possible to deliberately ship something broken and monitor its activity to see if it is worth fully implementing. For instance, let's say you have a hypothesis that if you present your customers with a Visa Checkout payment option, you will get many more orders. Upon checkout you could redirect your users to the standard purchase form with an error message saying Visa Checkout is not working at this time. If you run this for a limited time you should be able to gauge the interest your user base has in this feature, allowing you to make a more informed decision on how much engineering effort you are willing to put into a new payment option. This is called a signal test, and can be applied to just about any product where you can quickly turn features on and off. It is advisable to combine this strategy with A/B Testing in order to gauge the overall impact of the new feature.

### A/B Testing

As the name implies, you show your users two different variations of the same thing. You will be able to look at the conversion rates of each variation and make a decision on which feature to implement. This can often be combined with shipping broken to decide what the priorities are between two or more features you think your user base wants.

### Measuring user value

The previous two strategies were both ways for use to get hard numbers on how much value a feature will bring consumers. We should be mindful of the changes we make and their impact to the consumer. Be brutally honest with yourself and your organization. Be mindful of your confirmation bias. Just because you think something will have value for the consumer does not mean it will. You may be uncertain of the value your feature will bring, and that is fine, but you should be careful to not spend too much time building these uncertainties. Some things we intrinsically know will have value.

### Post mortem (tracking)

It is important to keep track of how often and with what the consumer interacts. Tools such as Google analytics offer this functionality with minimal setup. Gauging how your users interact with your product allows you to know, with certainty, the pieces of your product that deliver the most value. It is possible to do this outside of the context of a web application. Have you ever seen this dialog?

[![Help make Google Chrome better by automatically sending usage statistics and crash reports to Google.]({{page.dir}}helpmakechromebetter.jpg)]({{page.dir}}helpmakechromebetter.jpg)

## Case Study: React

Take a look at [The Belcher Report](https://bleacherreport.com/). This site uses React on its front end. React is considered to be easy, but if you dig into it, there is a fair bit of complexity there. To put this complexity into context, I was part of a migration to React that took months of planning and execution to get even the most basic page in front of consumers.

Going back to our example, if you look at their website, it is mostly static. Static websites, while no longer in vogue, are some of the simplest forms of pages today. In recent years modern browsers have made great strides in offering interactivity without the need for a large javascript framework. I will touch on the benefits of simplicity in another post, but for now I think it can be agreed that simple, small, low novelty code is easier to follow and modify.

> Does The Belcher Report need react?

At at glance, I have my doubts, but I do not have insight into their internal processes. I would think long and hard before proposing to introduce a large framework like that. I would always default to doing a static site and not introducing a framework unless it made a lot of sense.

> What would be the alternatives?

[Gatsby](https://github.com/gatsbyjs/gatsby) seems like a promising framework for building static pages without the added complexity of React. Gatsby also allows for some dynamic content via http requests. Another front end tool that I tend to lean toward using is [AMP](https://amp.dev/). I think engineers tend to shy away from AMP because it brings with it some limitations. Firstly, those limitations are only imposed for Google's cached version of the site. Secondly, in my opinion, this argument mirrors how engineers felt about languages such as Java when C++ was *the* systems language to use.

In summary: I don't think React is bad, I just think it is used in some projects where it does more harm than good.

## Further Reading

* [Uberisation - Wikipedia](https://en.wikipedia.org/wiki/Uberisation)
* [The rise of the uberized economy and what it means for business](https://thenextweb.com/entrepreneur/2014/05/18/rise-uberized-economy-means-business/)
* [Code review best practices](https://medium.com/palantir/code-review-best-practices-19e02780015f)
* [Static Websites using JAM Stack](https://hackernoon.com/static-vs-dynamic-website-whats-the-difference-in-2019-327064bfd4a9)
* [Static vs Dynamic Websites](https://wsvincent.com/static-vs-dynamic-websites-pros-and-cons/)
* [Software Complexity Is Killing Us](https://www.simplethread.com/software-complexity-killing-us/)
* [Why some startups succeed and why most fail](https://www.entrepreneur.com/article/288769)
* [Measuring devops success with four key metrics](https://stelligent.com/2018/12/21/measuring-devops-success-with-four-key-metrics/)
