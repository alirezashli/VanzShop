app.controller('indexViewModel', ['$scope', 'myCartService', 'storeService', '$rootScope', 'constantService', 'helperService', 'sessionService', 'userService', function ($scope, myCartService, storeService, $rootScope, constantService, helperService, sessionService, userService) {

    /********** INITIALIZATIONS *************/
    $scope.myCartService = myCartService;
    $scope.helperService = helperService;
    $scope.constantService = constantService;
    $scope.userService = userService;
    $scope.subTotal = myCartService.getSubTotalCount();
    $scope.isUserLoggedIn = userService.isUserLoggedIn();

    helperService.moveToTop();

    /********** METHODS *************/
    $scope.loginUser = function (username, password) {
        var me = this;

        if (me.loginForm.$valid) {
            var isAuthorize = userService.authenticate(username, password);

            if (isAuthorize) {
                helperService.moveToPage('account');
            }

            else {
                bootbox.alert('Invalid User.');
            }
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

    $scope.userLogOut = function () {
        userService.userLogOut();

        helperService.moveToPage('home');
    }

    $scope.registerUser = function (formFields) {
        var me = this;

        if (me.signupForm.$valid) {
            userService.registerUser(formFields);

            $scope.userName = formFields.username;

            helperService.moveToPage('account');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

    $scope.checkout = function () {
        if (userService.isUserLoggedIn()) {
            helperService.moveToPage('checkout/addressView');
        }
        else {
            helperService.moveToPage('authentication');
        }
    }

    /********** LISTENERS *************/
    $rootScope.$on('subTotalChangeEvent', function (event, args) {
        $scope.subTotal = args.myCartSubTotal;
    });

    $rootScope.$on('myCartsChangeEvent', function (event, args) {
        $scope.myCarts = args.myCarts;
    });

    $rootScope.$on('productSectionsLoadEvent', function (event, args) {
        $scope.productSections = args.productSections;
    });

    $rootScope.$on('isUserLoggedIn', function (event, args) {
        $scope.isUserLoggedIn = args.isUserLoggedIn;
    });

}]);