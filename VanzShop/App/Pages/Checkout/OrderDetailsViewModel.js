app.controller('orderDetailsViewModel', ['$scope', 'helperService', 'constantService', 'sessionService', function ($scope, helperService, constantService, sessionService) {

    /********** INITIALIZATIONS *************/
    $scope.helperService = helperService;

    var orderDetails = (sessionService.getSession(constantService.sessions.ORDER) || []).reverse();
    $scope.orderDetail = orderDetails[0];

}]);