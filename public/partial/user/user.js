angular.module('app')
   .controller('UserCtrl', function (users) {
      var vm = this;
      vm.users = users;
   });
