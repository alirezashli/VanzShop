app.controller('orderHistoryViewModel', ['$scope', 'helperService', 'constantService', 'sessionService', 'userService', function ($scope, helperService, constantService, sessionService, userService) {

    /********** INITIALIZATIONS *************/
    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');

    helperService.moveToTop();

    $scope.helperService = helperService;

    $scope.orderHistories = sessionService.getSession(constantService.sessions.ORDER);
    
}]);