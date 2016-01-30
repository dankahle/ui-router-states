angular.module('app')
   .controller('UserDetailCtrl', function(user){
      console.log('user-detail ctrl');
      var vm = this;

      vm.user = user;
      vm.keys = Object.keys(user)
         .filter(function(key) {
            return user.hasOwnProperty(key) && key.indexOf('$') !== 0;
         });

});
