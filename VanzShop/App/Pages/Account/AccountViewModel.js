app.controller('accountViewModel', ['$scope', 'helperService', 'userService', function ($scope, helperService, userService) {

    /********** INITIALIZATIONS *************/
    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');

    helperService.moveToTop();

    $scope.helperService = helperService;
}]);