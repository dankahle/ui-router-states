angular.module('app').controller('AboutCtrl',function(users){

   console.log('about ctrl');

   var vm = this;
   vm.history = window.history;

   vm.addMary = function() {
      users.push({
         id: 4,
         name: 'mary',
         age: 20
      })
   }

   vm.updateMary = function() {
      users[users.length - 1].name = 'mary2';
   }

   vm.newArray = function() {
      users = [
         {id: 1, name: 'dank9', age: 50},
         {id: 2, name: 'carl9', age: 60},
         {id: 3, name: 'jim9', age: 40}
      ]
   }


});
