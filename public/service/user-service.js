angular.module('app')
   .factory('userService', function ($timeout, $q) {

      var users = [
         {id: 1, name: 'dank', age: 50},
         {id: 2, name: 'carl', age: 60},
         {id: 3, name: 'jim', age: 40}
      ]

      return {
         getUser: getUser,
         getUsers: getUsers
      }

      function getUsers() {
         var def = $q.defer();
         def.resolve(users);
         return def.promise;
      }

      function getUser(id) {
         var def = $q.defer();

         $timeout(function() {
            def.resolve(_.findWhere(users, {id: id}))
         }, 0)// set to 1000 to watch the resolve wait a sec before setting the first state
         return def.promise;
      }

   });
