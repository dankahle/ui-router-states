angular.module('app')
   .controller('UserCtrl', function ($scope, users, $state) {
      console.log('user ctrl');
      var vm = this,
         oldUsers = users,
         oldUsersLength = users.length;

      vm.users = users;

      // here's how we'll look for code updates on mutable items shared with other states

      // watch users array for changes. Thing about this is: it runs whether they come back or not. Maybe not what you want.
      $scope.$watchCollection(function() {
         return users;
      }, function(newval) {
         console.log('users watch', newval);
      });

      $scope.$on('$stateChangeSuccess', function(event, toState) {
         if($state.includes('layout.user')) {

            // never gets run as it's watching users object, but about changes users object, it's not watching that object.
            // you'd need to have it watching an array inside an object to see if that changed? Yeah, that would work.
            if(oldUsers !== users) {
               console.log('user state change', 'users array has changed')
               oldUsers = users;
            }

            // add mary (about view) to trigger this on next user state success
            else if(oldUsersLength !== users.length) {
               console.log('user state change', 'users length change');
               oldUsersLength = users.length;
            }

         }
      })

   });
