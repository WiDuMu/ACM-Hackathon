## Inspiration

-Based on the prompt: "Self Improvement", we wanted to make a timer app which could keep track of how long we've spent on projects, and nudge us to take a break. ("touch grass")

## What it does

- The website lets you set a timer to keep track of how often you want to take a break (e.g. 30 min.). 
- From there you can set up one (or more) stopwatch(es), which will automatically nudge you to take a break after one's been running for more than you set your timer for.
- Click the plus button to add a new timer
- Enter how often you want to take a break
- Start the timer and it will tell you to take a break

## How we built it

- We built the site with stock standard JS, since it would let us implement the most features in the 48 hr. timeframe. We used the custom element Webcomponent API to make the timers. Standard CSS was used for the styling, and HTML for the elements.

## Challenges we ran into

- Developing for multiple browsers was irksome at times, as checking on how a feature performed between browsers could vary, more than we would have liked. For example, progress bar styling was difficult between Chrome and Firefox due to WebKit ideosyncracies.

- Challenges with implementing multiple behaviors asynchronously without race conditions.

## Accomplishments that we're proud of

- We shipped a portable, scalable, timer app in less than 48 hrs. 
- We maintained a consistent development workflow without any major issues along the way.

## What we learned

- We gained some experience building a functional small scale website, while maintaining an aesthetically pleasing front end.  

## What's next for Touch Grass?

- There is still an issue where chromium based browsers don't receive styling on the timer bar (sorry chrome users), a fix was possible, just outside of our time range.

- Otherwise, probably touching some IRL grass. Very excited for this one. 
[hi](https://youtu.be/3AiLwqSu0b0)