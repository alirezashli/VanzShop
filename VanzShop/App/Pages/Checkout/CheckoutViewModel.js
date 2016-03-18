app.controller('checkoutViewModel', ['$scope', 'myCartService', 'constantService', 'helperService', '$state', 'sessionService', '$location', '$anchorScroll', 'userService', '$http', '$rootScope', function ($scope, myCartService, constantService, helperService, $state, sessionService, $location, $anchorScroll, userService, $http, $rootScope) {

    /********** INITIALIZATIONS *************/
    $scope.myCartService = myCartService;
    $scope.tax = helperService.convertToTwoDecimalPlaces(constantService.taxes.GOVERNMENT_TAX);
    $scope.helperService = helperService;
    $scope.constantService = constantService;

    $scope.addressInformations = null;
    $scope.personalInformations = null;
    $scope.billingFormFields = null;
    $scope.paymentFields = {};
  
    $scope.pages = ['checkout.addressView', 'checkout.billingView', 'checkout.paymentView', 'checkout.orderView'];

    helperService.moveToTop();

    $http.get('../../../Content/jsonData/countries.json').success(function (data, status, headers, config) {

        $scope.countries = data;

        if ($scope.addressInformations) {

            var index = helperService.searchIndex($scope.addressInformations.country.name, $scope.countries);

            $scope.addressInformations.country = $scope.countries[index];
        }
    }).
   error(function (data, status, headers, config) {
       console.log(status);
   });

    $http.get('../../../Content/jsonData/states.json').success(function (data, status, headers, config) {

        $scope.states = data;

        if ($scope.addressInformations) {

            var index = helperService.searchIndex($scope.addressInformations.states.name, $scope.states);

            $scope.addressInformations.states = $scope.states[index];
        }
    }).
   error(function (data, status, headers, config) {
       console.log(status);
   });

    /********** METHODS *************/

    setActivePage($state.current.name);

    loadDefaultData($state.current.name);

    $scope.submitAddressForm = function ()
    {
        var me = this;
        var isUserLoggedIn = userService.isUserLoggedIn();

        if (me.addressForm.$valid) {

            var addressInformations = isUserLoggedIn ? userService.getUserAddressInformations() || [] : [];

            addressInformations.push($scope.addressInformations);

            isUserLoggedIn ? userService.saveUserPersonalInformations($scope.personalInformations) : userService.saveGuestPersonalInformations($scope.personalInformations);

            isUserLoggedIn ? userService.saveUserAddressInformations(addressInformations) : userService.saveGuestAddressInformations(addressInformations);
            
            helperService.moveToPage('checkout/billingView');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

    $scope.submitBillingForm = function () {

        var me = this;

        if (me.billingForm.$valid) {

            userService.saveUserBillingInformations($scope.billingFormFields);
            
            helperService.moveToPage('checkout/paymentView');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

    function setActivePage(currentPage)
    {
        var className = '.orderStepLook2';

        var index = $scope.pages.indexOf(currentPage) + 1;

        $(className + " li.active").removeClass('active');

        $(className + " li:nth-child(" + index + ")").addClass('active');
    }

    function loadDefaultData(currentPage)
    {
        var isUserLoggedIn = userService.isUserLoggedIn();

        var personalInformations = isUserLoggedIn ? userService.getUserPersonalInformations() : userService.getGuestPersonalInformations();

        if (personalInformations)
            $scope.personalInformations = personalInformations;

        var addressInformations = isUserLoggedIn ? userService.getUserAddressInformations() : userService.getGuestAddressInformations();

        if (addressInformations)
            $scope.addressInformations = addressInformations[0]; // first address, TODO: set flag at the account page to determine which address is the main.

        if (currentPage == 'checkout.billingView')
        {
            var billingInformation = userService.getUserBillingInformations();

            if (billingInformation)
            {
                if (billingInformation.isSame) {
                    $scope.billingFormFields = $scope.addressInformations;
                }

                $scope.billingFormFields.isSame = billingInformation.isSame;
            }   
        }
    }

    /* Billing Page */
    $scope.copyAddressToBilling = function ()
    { //TODO separate address and user information

        var isUserLoggedIn = userService.isUserLoggedIn();

        if ($scope.billingFormFields.isSame) {

            var addressInformations = isUserLoggedIn ? sessionService.getSession(constantService.sessions.USER.ADDRESS_INFORMATIONS) : sessionService.getSession(constantService.sessions.GUEST.ADDRESS_INFORMATIONS);

            if (addressInformations) {

                var isSame = $scope.billingFormFields.isSame;

                var defaultAddressInformation = addressInformations[0]; //get the first address to use as main address.

                $scope.billingFormFields = defaultAddressInformation;
                $scope.billingFormFields.country = $scope.countries[helperService.searchIndex(defaultAddressInformation.country.name, $scope.countries)];
                $scope.billingFormFields.states = $scope.states[helperService.searchIndex(defaultAddressInformation.states.name, $scope.states)];
                $scope.billingFormFields.isSame = isSame;
            };
        }
        else {
            $scope.billingFormFields = null;
        }
    }

    $scope.submitCashDeliveryForm = function ()
    {
        $scope.paymentFields.paymentType = constantService.messages.PAYMENT_TYPES.CASH_ON_DELIVERY;

        sessionService.saveSession(constantService.sessions.PAYMENT_INFORMATION, $scope.paymentFields);

        helperService.moveToPage('checkout/orderView');
    }

    $scope.submitMasterCardForm = function ()
    {
        $scope.paymentFields.paymentType = constantService.messages.PAYMENT_TYPES.MASTER_CARD;

        sessionService.saveSession(constantService.sessions.PAYMENT_INFORMATION, $scope.paymentFields);

        helperService.moveToPage('checkout/orderView');
    }

    $scope.submitOrder = function ()
    { 
        var orderDetails = sessionService.getSession(constantService.sessions.ORDER) || [];

        var orderDetail = {
            'orderId': helperService.generateGuid(),
            'orderNumber': constantService.messages.ORDER_NUMBER_PREFIX + helperService.generateRandomNumbers(),
            'orderInformations': myCartService.myCarts,
            'subTotal': myCartService.getSubTotalCount() || 0,
            'subTotalWithoutTax': myCartService.getTotalWithoutTax() || 0,
            'subTotalWithTax': myCartService.getTotalWithTax(),
            'tax': helperService.convertToTwoDecimalPlaces(constantService.taxes.GOVERNMENT_TAX),
            'dateOrdered': helperService.generateDate(),
            'orderStatus': constantService.orderStatus.PENDING,
            'paymentInformation': sessionService.getSession(constantService.sessions.PAYMENT_INFORMATION)
        }

        orderDetails.push(orderDetail);

        sessionService.saveSession(constantService.sessions.ORDER, orderDetails);

        sessionService.removeSession(constantService.sessions.MY_CARTS);

        $rootScope.$emit('subTotalChangeEvent', { myCartSubTotal: null });

        $rootScope.$emit('myCartsChangeEvent', { myCarts: [] });

        helperService.moveToPage('orderDetails');
    }

}]);