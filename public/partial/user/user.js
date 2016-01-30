angular.module('app')
   .controller('UserCtrl', function (users) {
      console.log('user ctrl');
      var vm = this;
      vm.users = users;
   });
