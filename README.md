### ui-router-states
This is an example application to excercise the different abilities of ui-router and ui-router-extras.
It uses $locationProvider.html5Mode, so requires it's own server that can handle the clientside urls and deliver index.html
in their stead. A node server: server/server.js is supplied for this.

1. clone
2. bower install
3. npm install
4. cd server directory, then: "node server.js" fires up the server
5. localhost:3003 to pull up the site


#### goals
* html5mode routing
* have a common layout page everyone shares with named views that can be overridden
* the layout parent state will have a resolve for resolving async data "for all children", i.e. every controller on the page
will have access to async data immediately, no more coding inside promise then functions
* master branch view controllers will run with every state change
* feature branch "sticky" will be added that will make the views "stick", so their controllers only run once
* feature branch "sticky-deep" will be added that will mimic sticky, but also allow for deep linking,
i.e. layout.user.detail state will be open when you tab back to user, not just the user state


### todo
* splash screen
* back buttons using $state.go
* sticky branch
* sticky-deep branch

### server
* handles clientside routes and serves up index.html in their stead via comparison to url or url starting path
* handles api should there be one


### notes
* resolve inheritance from parent route doesn't work if child controller is included via ng-controller on its template,
you have to explicitly state a controller object on the route for it to work, otherwise you'll get an injector error
stating it doesn't know what the resolved property provider is.
* for /user and /about, could get away without having a <base> tag, but when on /user/detail/x, all a sudden all
the bower files were trying to load from /user/bower_components/... never found an answer for this, but the base tag is
pretty much required for html5Mode in angular, so added it, and all worked well after that

