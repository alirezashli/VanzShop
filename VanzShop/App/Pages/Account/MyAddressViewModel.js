app.controller('myAddressViewModel', ['$scope', 'helperService', 'userService', function ($scope, helperService, userService) {

    /********** INITIALIZATIONS *************/
    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');

    $scope.helperService = helperService;
    $scope.addressInformations = userService.getUserAddressInformations() || [];

    helperService.moveToTop();

    $scope.deleteAddress = function (index)
    {
        $scope.addressInformations.splice(index, 1);

        userService.saveUserAddressInformations($scope.addressInformations);
    }
}]);