angular.module('app')
   .controller('HeaderCtrl', function ($scope, currentUser) {
      console.log('header ctrl');

      var vm = this;
      vm.currentUser = currentUser;
   });
