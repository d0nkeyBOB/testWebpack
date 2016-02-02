/**
 * Module dependencies
 */

require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');

/**
 * Setup App Module
 */
var appModule = module.exports = angular
    .module('app', [
        require('./dashboard/dashboard.controller').name,
        'ui.router'
    ]);

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['app']);
    });


appModule.config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(
        /^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('dashboard', {
            url: '/',
            template: require('./dashboard/dashboard.html'),
            controller: 'DashboardController',
            controllerAs: 'dash',
        })
    $urlRouterProvider.otherwise('/');
})

.run(function($log, $rootScope, $timeout) {

    $log.debug('app module - run');
    $rootScope.$on('$stateChangeStart',
        function(event, toState) {
            $log.debug('$stateChangeStart - name:', toState.name);

        });

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState) {
            $log.debug('$stateChangeSuccess - name:', toState.name);
        });

    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams) {
            $log.warn('$stateNotFound', {
                event: event,
                unfoundState: unfoundState,
                fromState: fromState,
                fromParams: fromParams
            });
        });

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
            $log.error('$stateChangeError', {
                event: event,
                toState: toState,
                toParams: toParams,
                fromState: fromState,
                fromParams: fromParams,
                error: error
            });
            if (error) {
                throw error;
            }
        });
});


