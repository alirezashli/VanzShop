app.controller('productViewModel', ['$scope', 'storeService', '$routeParams', 'myCartService', 'constantService', '$rootScope', '$stateParams', function ($scope, storeService, $routeParams, myCartService, constantService, $rootScope, $stateParams) {
    
    $scope.selectedProductItem = storeService.getSelectedProductItem($stateParams.itemId);

    $scope.quantityOptions = constantService.selectOptions.QUANTITY.options;

    $scope.addToCart = function (productItem) {
        if (angular.isDefined($scope.myForm)) {
            if ($scope.myForm.quantitySelectOption.$error.required) {
                bootbox.alert('Quantity is Required!');
                return;
            }
        }

        $scope.selectedQty = (angular.isDefined($scope.selectedQty) && $scope.selectedQty != "") ? parseInt($scope.selectedQty.id, 10) : 1;

        myCartService.addToCart(productItem, $scope.selectedQty);

        var subTotal = myCartService.calCulateSubTotal();

        $rootScope.$emit('subTotalChangeEvent', { myCartSubTotal: subTotal });
        $rootScope.$emit('myCartsChangeEvent', { myCarts: $scope.myCarts });

        bootbox.alert(constantService.messages.ADD_TO_CART_SUCCESS);

        $scope.selectedQty = '';
    }

}]);