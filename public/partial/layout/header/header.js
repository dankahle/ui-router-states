angular.module('app')
   .controller('HeaderCtrl', function ($scope, currentUser) {
      var vm = this;
      vm.currentUser = currentUser;
   });
