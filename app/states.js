'use strict';


/* @ngInject */

function states($urlRouterProvider, $stateprovider) {
    $stateprovider
        .state('dashboard', {
            url: '/',
            template: require('./dashboard.html'),
            controller: 'DashboardController',
            controllerAs: 'dash',
        })
    $urlRouterProvider.otherwise('/');
}
module.exports = states;

