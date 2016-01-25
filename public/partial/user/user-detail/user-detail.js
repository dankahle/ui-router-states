angular.module('app')
   .controller('UserDetailCtrl', function(user){
      var vm = this;

      vm.user = user;
      vm.keys = user.keys();

});
