    'use strict';

    require('angular');
    require('angular-ui-router');

    require('./dashboard.styles.css');

    module.exports = angular
        .module('dashboard', [])
        .controller('DashboardController', DashboardController);


    function DashboardController($scope) {}

