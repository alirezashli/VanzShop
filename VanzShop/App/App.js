var app = angular.module('VanzShopApp', ['ngRoute', 'ngMessages', 'ngCookies', 'ui.router', 'ui.bootstrap']);

app.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "/App/Pages/Home/HomeView.html",
        controller: "homeViewModel"
    })
    .state('productDetails', {
        url: "/productDetails/:itemId",
        templateUrl: "/App/Pages/Product/productDetailView.html",
        controller: "productViewModel"
    })
    .state('cart', {
        url: "/cart",
        templateUrl: "/App/Pages/Cart/cartView.html",
        controller: "cartViewModel"
    })
    .state('authentication', {
        url: "/authentication",
        templateUrl: "/App/Pages/Authentication/authenticationView.html",
        controller: "authenticationViewModel"
    })
    .state('forgotPassword', {
        url: "/forgotPassword",
        templateUrl: "/App/Pages/Authentication/forgotPasswordView.html",
        controller: "authenticationViewModel"
    })

    .state('checkout', {
        url: "/checkout",
        templateUrl: "/App/Pages/Checkout/checkoutView.html",
        controller: "checkoutViewModel"
    })
    .state('checkout.addressView', {
        url: "/addressView",
        templateUrl: "/App/Pages/Checkout/addressView.html",
        controller: "checkoutViewModel"
    })
    .state('checkout.billingView', {
        url: "/billingView",
        templateUrl: "/App/Pages/Checkout/billingView.html",
        controller: "checkoutViewModel"
    })
    .state('checkout.shippingView', {
        url: "/shippingView",
        templateUrl: "/App/Pages/Checkout/shippingView.html",
        controller: "checkoutViewModel"
    })
    .state('checkout.paymentView', {
        url: "/paymentView",
        templateUrl: "/App/Pages/Checkout/paymentView.html",
        controller: "checkoutViewModel"
    })
    .state('checkout.orderView', {
        url: "/orderView",
        templateUrl: "/App/Pages/Checkout/orderView.html",
        controller: "checkoutViewModel"
    })
    .state('orderDetails', {
        url: "/orderDetails",
        templateUrl: "/App/Pages/Checkout/orderDetails.html",
        controller: "orderDetailsViewModel"
    })
    .state('account', {
        url: "/account",
        templateUrl: "/App/Pages/Account/accountView.html",
        controller: "accountViewModel"
    })
    .state('orderHistory', {
        url: "/orderHistory",
        templateUrl: "/App/Pages/Account/orderHistoryView.html",
        controller: "orderHistoryViewModel"
    })
    .state('myAddress', {
        url: "/myAddress",
        templateUrl: "/App/Pages/Account/myAddressView.html",
        controller: "myAddressViewModel"
    })
    .state('addAddress', {
        url: "/addAddress",
        templateUrl: "/App/Pages/Account/addAddressView.html",
        controller: "addAddressViewModel"
    })
    .state('editAddress', {
        url: "/editAddress/:id",
        templateUrl: "/App/Pages/Account/addAddressView.html",
        controller: "addAddressViewModel"
    })
    .state('information', {
        url: "/information",
        templateUrl: "/App/Pages/Account/informationView.html",
        controller: "informationViewModel"
    })
    .state('myWishlist', {
        url: "/myWishlist",
        templateUrl: "/App/Pages/Account/myWishlistView.html",
        controller: "myWishlistViewModel"
    }).state('termscondition', {
        url: "/termscondition",
        templateUrl: "termsCondition.html"
    }).state('category', {
        url: "/category/:categoryId",
        templateUrl: "/App/Pages/Category/categoryView.html",
        controller: "categoryViewModel"
    })

    //Default URL
    $urlRouterProvider.otherwise("/home");

});