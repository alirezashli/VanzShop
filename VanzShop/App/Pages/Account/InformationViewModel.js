app.controller('informationViewModel', ['$scope', 'helperService', 'userService', 'constantService', function ($scope, helperService, userService, constantService) {

    /********** INITIALIZATIONS *************/
    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');

    $scope.helperService = helperService;
    $scope.userService = userService;
    $scope.constantService = constantService;

    $scope.personalInformations = userService.getUserPersonalInformations();
    $scope.loginInformations = userService.getUserLoginInformations();

    helperService.moveToTop();

    $scope.submitPersonalForm = function ()
    {
        var me = this;

        if (me.personalForm.$valid)
        {
            if ($scope.tempPassword && $scope.tempPassword != "")
            {
                $scope.loginInformations.password = $scope.tempPassword;

                userService.saveUserLoginInformations($scope.loginInformations);
            }

            userService.saveUserPersonalInformations($scope.personalInformations);

            bootbox.alert('Update successfully.');

            helperService.moveToPage('account');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
        
    }
}]);