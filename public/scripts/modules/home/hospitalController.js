angular.module('app')
    .controller('hosp', ['$scope', '$http', '$timeout', 'uiGridConstants', function ($scope, $http, $timeout, uiGridConstants) {

        $scope.format = 'M/d/yy h:mm:ss a';

        $scope.gridOptions = {
            enableScrollbars: false,
            enableSorting: true,
            enableFiltering: true,
            columnDefs: [
                { field: 'h_id', cellTooltip: 'Custom string', headerTooltip: 'Custom header string', headerCellClass: 'white' },
                { field: 'name', cellTooltip:
                    function( row, col ) {
                        return 'h_id: ' + row.entity.h_id + ' name: ' + row.entity.name;
                    }, headerTooltip:
                    function( col ) {
                        return 'Header: ' + col.displayName;
                    }, headerCellClass:'white'
                },
            ],

            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
                    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
                })
            }
        };

        $timeout( function() {
            var baseUrl = 'http://rpc01:8090/hospitals';
            // $scope.hospital = {};
            $http.get(baseUrl).success(function (data) {
                // $scope.hospital.details = response.data;
                 $scope.gridOptions.data= data;
                console.log("Hello");
            });
        }, 200);

    }]);

    // .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
    //
    //       function link(scope, element, attrs) {
    //           var format,
    //           timeoutId;
    //
    //         function updateTime() {
    //             element.text(dateFilter(new Date(), format));
    //         }
    //
    //         scope.$watch(attrs.myCurrentTime, function(value) {
    //               format = value;
    //               updateTime();
    //         });
    //
    //         element.on('$destroy', function() {
    //             $interval.cancel(timeoutId);
    //         });
    //
    //         // start the UI update process; save the timeoutId for canceling
    //         timeoutId = $interval(function() {
    //             updateTime(); // update DOM
    //         }, 1000);
    //       }
    //
    //       return {
    //         link: link
    //       };
    //   }]);
