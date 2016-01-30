angular.module('app', ['ui.router', 'ct.ui.router.extras', 'ngAnimate']);

angular.module('app')
   .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider.state('layout', {
         abstract: true,
         resolve: {
            currentUser: function (userService) {
               return userService.getUser(1);
            },
            users: function(userService) {
               return userService.getUsers();
            }
         },
         views: {
            '': {
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
      $stateProvider.state('layout.splash', {
         url: '/',
         sticky: true,
         views: {
            'splash@': {
               templateUrl: 'partial/splash/splash.html',
               controller: 'SplashCtrl as vm',
            }
         }
      });

      $stateProvider.state('layout.user', {
         url: '/user',
         sticky: true,
         //deepStateRedirect: true, // this is all you need unless you want a default state (below)
         deepStateRedirect: {
            default: {
               state: 'layout.user.detail',
               params: {id: 2}// should show carl by default
            },
            //params: true// this messes up the deepState, starts as carl, then goto jim, then spash and user and runs carl again, what?
         },
         views: {
            'user@': {
               templateUrl: 'partial/user/user.html',
               controller: 'UserCtrl as vm',
            }
         }
      });

      $stateProvider.state('layout.user.detail', {
         url: '/{id:int}',
         sticky: true,
         resolve: {
            user: function (userService, $stateParams) {
               return userService.getUser($stateParams.id);
            }
         },
         views: {
            '@layout.user': {
               templateUrl: 'partial/user/user-detail/user-detail.html',
               controller: 'UserDetailCtrl as vm',
            },
            'user-detail-leftnav@': {
               templateUrl: 'partial/user/user-detail/leftnav/user-detail-leftnav.html',
               controller: 'UserDetailLeftnavCtrl as vm'
            }
         }
      });

      $stateProvider.state('layout.about', {
         url: '/about',
         sticky: true,
         views: {
            'about@': {
               templateUrl: 'partial/about/about.html',
               controller: 'AboutCtrl as vm',
            }
         }
      })
      ;
      /* Add New States Above */
      $urlRouterProvider.otherwise('/');

   });

angular.module('app').run(function ($rootScope, $state, $deepStateRedirect, $stickyState) {

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
   $rootScope.$stickyState = $stickyState;
   $rootScope.$deepStateRedirect = $deepStateRedirect;

   $rootScope.$on('$stateChangeError', function(event, toState, toParams) {
      console.log(event.name, toState, toParams)
   })
   $rootScope.$on('$stateNotFound', function(event, toState, toParams) {
      console.log(event.name, toState.name)
   })
/*
   $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      console.log(event.name, toState.name)
   })
   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
      console.log(event.name, toState.name)
   })
*/

});
