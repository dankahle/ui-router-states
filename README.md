### ui-router-states
This is an example application to excercise the different abilities of ui-router and ui-router-extras.

#### goals
* have a common layout page everyone shares with named views that can be overridden
* the layout parent state will have a resolve for resolving async data "for all children", i.e. every controller on the page
will have access to async data immediately, no more coding inside promise then functions
* master branch view controllers will run with every state change
* feature branch "sticky" will be added that will make the views "stick", so their controllers only run once
* feature branch "sticky-deep" will be added that will mimic sticky, but also allow for deep linking,
i.e. layout.user.detail state will be open when you tab back to user, not just the user state


### todo
* back buttons using $state.go

### note
* resolve inheritance from parent route doesn't work if child controller is included via ng-controller on its template,
you have to explicitly state a controller object on the route for it to work, otherwise you'll get an injector error
stating it doesn't know what the resolved property provider is.

