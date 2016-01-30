### ui-router-states
This is an example application to excercise the different abilities of ui-router and ui-router-extras.
It uses $locationProvider.html5Mode, so requires it's own server that can handle the clientside urls and deliver index.html
in their stead. A node server: server/server.js is supplied for this.

1. clone
2. bower install
3. npm install
4. cd server directory, then: "node server.js" fires up the server
5. localhost:3003 to pull up the site


#### features
* html5mode routing
* have a common layout page everyone shares with named views that can be overridden
* the layout parent state will have a resolve for resolving async data "for all children", i.e. every controller on the page
will have access to async data immediately, no more coding inside promise then functions
* master branch view controllers will run with every state change
* feature branch "sticky" will be added that will make the views "stick", so their controllers only run once.
Also, the user state will be marked as deepStateRedirect which will "remember" the user.detail state and it's parameters.
* 2 methods of reacting to shared data changes in user state. I.e. when we're sticky our controller isn't rerunning, but another
state (about) can change the data, then what? We can $watch the data, or we can watch the state change, then check the data and rerun
code there.
* about state has many links that test out various features

### server
* handles clientside routes and serves up index.html in their stead via comparison to url or url starting path
* handles api should there be one


### synopsis
States change from splash to users to about with users having a child state: users.detail. All states begin with "layout" which is abstract which allows inherited resolve values. index.html houses the "layout" views, so layout which was intended to house them doesn't. Layout needed to have a "views" section to populate the layout views which would have required yet another parent state, so just pushed the layout html up to index.html.

All controllers log to console when run and in master branch all run every time they're visited. The "sticky" branch adds sticky:true to all states except layout.user.detail and also deepStateRedirect with a default of user.detail to carl. These afford the controllers to run only once, and never again when visited, even the user.detail state.

This is all fine, but what if the states share data that's mutable? 2 methods are introduced in user state, one $watch's the data while the other checks it on user state success. The former would look nicer on state changes, but could also run needlessly, the user never returning to the state. The latter sounds more reasonable: return to user state, then it reruns appropriate code shoudl the data have changed.

If you turn on and off deepStateRedirect (app.js layout.user config), you'll notice visits to user tab don't preserve user.detail state, when on, they do. Also the default feature of deepStateRedirect is handy if you needed a default user.detail, albeit easy enough to do with $state.go.


### notes

**deepStateRedirect doesn't rerun the user.detail controller**
I was thinking it just remembered the child state and reran it, but the child state controller doesn't rerun, it keeps the child
state's dom intact and so nothing reruns when you switch to user state again

**$state.go's {ignoreDsr: true} command turns off dsr**
About page has a link that does this. Once it goes there and turns it off... it stays off. The default doesn't work anymore, but
dsr starts working again once you choose another layout.user.detail state

**resolve inheritance requires controller be specified in route config**
Resolve inheritance from parent route doesn't work if child controller is included via ng-controller on its template,
you have to explicitly state a controller object on the route for it to work, otherwise you'll get an injector error
stating it doesn't know what the resolved property provider is.

**needed to use a &lt;base&gt; tag**
For /user and /about, could get away without having a &lt;base&gt; tag, but when on /user/detail/x, all a sudden all
the bower files were trying to load from /user/bower_components/... never found an answer for this, but the base tag is
pretty much required for html5Mode in angular, so added it, and all worked well after that
