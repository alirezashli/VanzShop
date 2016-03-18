app.controller('categoryViewModel', ['$scope', 'storeService', '$stateParams', 'helperService', 'constantService', 'myCartService', function ($scope, storeService, $stateParams, helperService, constantService, myCartService) {

    /********** INITIALIZATIONS *************/
    var categoryId = $stateParams.categoryId;
    $scope.categoryName = storeService.getCategoryNameById(categoryId);

    $scope.helperService = helperService;
    $scope.productCategories = storeService.getProductsByCategoryId(categoryId);
    $scope.myCarts = myCartService.myCarts;
    $scope.quantityOptions = constantService.selectOptions.QUANTITY.options;

    /********** METHODS *************/
    $scope.getSelectedProductItemById = function (id) {
        $scope.selectedProductItem = storeService.getSelectedProductItem(id);

        $scope.productDetailsMainImageUrl = $scope.selectedProductItem.ImgUrl;
    }

    $scope.swapMainImage = function (id) {
        $scope.productDetailsMainImageUrl = $scope.selectedProductItem.SubImages[id];

        $scope.selectedId = id;
    }

    $scope.clearQuantity = function () {
        //TODO: assigning to default is not working
        $scope.selectedQty = '';
    }

    $scope.addToCart = function (productItem) {
        if (angular.isDefined($scope.myForm)) {
            if ($scope.myForm.quantitySelectOption.$error.required) {
                bootbox.alert('Quantity is Required!');
                return;
            }
        }

        $scope.selectedQty = (angular.isDefined($scope.selectedQty) && $scope.selectedQty != "") ? parseInt($scope.selectedQty.id, 10) : 1;

        myCartService.addToCart(productItem, $scope.selectedQty);

        bootbox.alert(constantService.messages.ADD_TO_CART_SUCCESS);

        $scope.selectedQty = '';
    }

    $scope.addToMyWishList = function (productItem) {
        if (!userService.isUserLoggedIn())
            bootbox.alert(constantService.messages.REQUIRED_LOGIN);
        else {
            var userName = userService.getUserLoginInformations().username;

            myWishListService.addToMyWishList(productItem);

            bootbox.alert(constantService.messages.ADD_TO_WISH_LIST);
        }
    }

}]);