angular.module('app')
   .controller('UserDetailCtrl', function(user){
      var vm = this;

      vm.user = user;
      vm.keys = Object.keys(user)
         .filter(function(key) {
            return user.hasOwnProperty(key) && key.indexOf('$') !== 0;
         });

});
