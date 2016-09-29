angular.module('app', ['ui.router', 'ui.grid'])
    .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('home.hospital', {
            url: '/hospital',
            templateUrl: 'views/hospital.html',
            controller: 'hosp',
        })
        .state('home.hospital.add', {
            url: '/hospital/add',
            templateUrl: 'views/addhosp.html',
            controller: 'adder',
        })
        .state('home.hospital.update', {
            url: '/hospital/update',
            templateUrl: 'views/updatehosp.html',
            controller: 'hospUpdate'
        })
        .state('home.hospital.delete', {
            url: '/hospital/delete',
            templateUrl: 'views/deletehosp.html',
            controller: 'hospDelete'
        });
    $urlRouterProvider.otherwise('login');
});
