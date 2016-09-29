angular.module('app')
    .controller('hospDelete', function ($scope, $http, $window, $stateParams) {
        $scope.ondelete = function ondelete() {

            var baseUrl = 'http://rpc01:8090/hosDelete/';
            
            $http({
                method: 'DELETE',
                url: baseUrl,
                data: {"h_id": $scope.h_id},
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }   
            }).success(function(){
                $window.location.reload();
                $window.alert("Deleted Successfully");
            })
            .error(function(){
            });
        }
    });
