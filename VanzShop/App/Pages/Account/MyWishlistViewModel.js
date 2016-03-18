app.controller('myWishlistViewModel', ['$scope', '$rootScope', 'helperService', 'myWishListService', 'myCartService', 'constantService', 'userService', function ($scope, $rootScope, helperService, myWishListService, myCartService, constantService, userService) {

    /********** INITIALIZATIONS *************/
    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');

    $scope.helperService = helperService;
    $scope.myWishListService = myWishListService;
    $scope.myWishLists = $scope.myWishListService.getMyWishLists() || [];
    $scope.myCartService = myCartService;

    helperService.moveToTop();

    $scope.addToCart = function (productItem, qty) //move to myCartService
    {
        myCartService.addToCart(productItem, qty);

        myWishListService.removeFromMyWishList(productItem);

        $scope.myWishLists = $scope.myWishListService.getMyWishLists() || [];

        bootbox.alert(constantService.messages.ADD_TO_CART_SUCCESS);
    }

    $scope.removeFromMyWishList = function (productItem)
    {
        myWishListService.removeFromMyWishList(productItem);

        $scope.myWishLists = $scope.myWishListService.getMyWishLists() || [];

        bootbox.alert(constantService.messages.REMOVE_FROM_WISH_LIST);
    }

}]);