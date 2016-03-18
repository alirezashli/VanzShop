app.controller('cartViewModel', ['$scope', 'storeService', 'myCartService', '$rootScope', 'constantService', 'helperService', 'userService', function ($scope, storeService, myCartService, $rootScope, constantService, helperService, userService) {

    /********** INITIALIZATIONS *************/
    $scope.myCartService = myCartService;
    $scope.tax = helperService.convertToTwoDecimalPlaces(constantService.taxes.GOVERNMENT_TAX);
    $scope.helperService = helperService;
    $scope.userService = userService;
    $subTotal = myCartService.getSubTotalCount() || 0;

    helperService.moveToTop();

    /********** METHODS *************/
    $scope.removeFromCart = function (myCartProductItem) {

        $scope.myCartService.removeFromCart(myCartProductItem);

        $scope.mySubTotal = myCartService.getSubTotalCount();
        $scope.myTotalWithTax = myCartService.getTotalWithTax();

        bootbox.alert(constantService.messages.REMOVE_FROM_CART);
    }

    $scope.updateCartQuantity = function () {

        $scope.myCartService.updateCartQuantity($scope.myCarts);
    }

}]);