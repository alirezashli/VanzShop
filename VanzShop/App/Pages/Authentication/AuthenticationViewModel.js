app.controller('authenticationViewModel', ['$scope', 'constantService', 'helperService', 'sessionService', 'userService', function ($scope, constantService, helperService, sessionService, userService) {

    /********** INITIALIZATIONS *************/
    $scope.constantService = constantService;
    $scope.helperService = helperService;

    helperService.moveToTop();

    $scope.loginUserByEmail = function (email, password)
    {
        var me = this;

        if (me.alreadyRegisteredForm.$valid) {

            var isAuthenticate = userService.authenticateUserByEmail(email, password);

            if (isAuthenticate) {
                helperService.moveToPage('checkout/addressView');
            }
            else {
                bootbox.alert('Invalid User.');
            }
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

    $scope.registerUser = function (formFields)
    {
        var me = this;

        if (me.createAccountForm.$valid) {

            userService.registerUser(formFields);

            helperService.moveToPage('checkout/addressView');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

}]);