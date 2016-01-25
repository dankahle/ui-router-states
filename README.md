### ui-router-states

### note
* resolve inheritance from parent route doesn't work if child controller is included via ng-controller on its template,
you have to explicitly state a controller object on the route for it to work, otherwise you'll get an injector error
stating it doesn't know what the resolved property provider is.

