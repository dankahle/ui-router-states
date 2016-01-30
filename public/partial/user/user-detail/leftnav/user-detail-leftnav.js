angular.module('app').controller('UserDetailLeftnavCtrl',function(user){
   console.log('user-detail-leftnav ctrl');

   var vm = this;
   vm.user = user;

   vm.jiraTasks = [
      {name: 'jira task1', url: 'javascript:void(0)'},
      {name: 'jira task2', url: 'javascript:void(0)'},
      {name: 'jira task3', url: 'javascript:void(0)'}
   ];

});
