angular.module('app', ['ui.router', 'ngAnimate']);

angular.module('app')
   .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider.state('layout', {
         url: '/',
         abstract: false,
         resolve: {
            currentUser: function (userService) {
               return userService.getUser(1);
            }
         },
         views: {
            '': {
               //templateUrl: 'partial/layout/splash/splash.html',
               //controller: 'SplashCtrl'
               template: '<ui-view></ui-view>'
            },
            header: {
               templateUrl: 'partial/layout/header/header.html',
               // resolve inheritance only works this way, doens't work if you use ng-controller in template
               // with no controller here for some reason.
               controller: 'HeaderCtrl as vm'
            },
            leftnav: {
               templateUrl: 'partial/layout/leftnav/leftnav.html',
               controller: 'LeftnavCtrl as vm'
            }
         }
      });
      $stateProvider.state('layout.user', {
         url: 'user',
         templateUrl: 'partial/user/user.html',
         controller: 'UserCtrl as vm',
         resolve: {
            users: function(userService) {
               return userService.getUsers();
            }
         }
      });

      $stateProvider.state('layout.user.detail', {
         url: '/{id:int}',
         templateUrl: 'partial/user/user-detail/user-detail.html',
         controller: 'UserDetailCtrl as vm',
         resolve: {
            user: function (userService, $stateParams) {
               return userService.getUser($stateParams.id);
            }
         }
      });

      $stateProvider.state('layout.about', {
         url: 'about',
         templateUrl: 'partial/about/about.html',
         controller: 'AboutCtrl as vm'
      })
      ;
      /* Add New States Above */
      $urlRouterProvider.otherwise('/');

   });

angular.module('app').run(function ($rootScope, $state) {

   $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
         if (fn && (typeof(fn) === 'function')) {
            fn();
         }
      } else {
         this.$apply(fn);
      }
   };

   $rootScope.$state = $state;

   $rootScope.$on('$stateChangeError', function(event, toState, toParams) {
      console.log(event, toState, toParams)
   })

});
