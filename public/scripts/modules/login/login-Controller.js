angular.module('app')
    .controller('LoginController', function($scope, $state) {

        $scope.login = function login() {
            if (($scope.username === 'test') && ($scope.password === 'test')) {
                $state.go('home');
            }
        };
    });
