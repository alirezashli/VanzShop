app.factory('userService', ['constantService', 'sessionService', '$rootScope', function (constantService, sessionService, $rootScope) {

    var me = this;

    me.loginInformations = sessionService.getSession(constantService.sessions.USER.LOGIN_INFORMATIONS) || null;
    
    if (me.loginInformations)
        me.userName = me.loginInformations.username || null;

    me.authenticate = function (username, password)
    {
        var userLoginInformations = me.getUserLoginInformations();

        if (!userLoginInformations)
            return false;

        if (userLoginInformations.username == username && userLoginInformations.password == password) {

            sessionService.saveSession(constantService.sessions.USER.IS_USER_LOGGED_IN, true);

            $rootScope.$emit('isUserLoggedIn', { isUserLoggedIn: true });

            return true;
        }
        else
            return false;
    }

    me.authenticateUserByEmail = function (email, password) {
        var userLoginInformations = me.getUserLoginInformations();

        if (userLoginInformations.email == email && userLoginInformations.password == password) {

            sessionService.saveSession(constantService.sessions.USER.IS_USER_LOGGED_IN, true);

            $rootScope.$emit('isUserLoggedIn', { isUserLoggedIn: true });

            return true;
        }
        else
            return false;
    }

    me.registerUser = function (formFields)
    {
        me.saveUserLoginInformations(formFields);
       
        sessionService.saveSession(constantService.sessions.USER.IS_USER_LOGGED_IN, true);

        $rootScope.$emit('isUserLoggedIn', { isUserLoggedIn: true });
    }

    me.isUserLoggedIn = function ()
    {
        return sessionService.getSession(constantService.sessions.USER.IS_USER_LOGGED_IN) || false;
    }

    me.userLogOut = function ()
    {
        sessionService.removeSession(constantService.sessions.USER.IS_USER_LOGGED_IN);

        $rootScope.$emit('isUserLoggedIn', { isUserLoggedIn: false });
    }

    me.saveUserPersonalInformations = function (formFields) {
        sessionService.saveSession(constantService.sessions.USER.PERSONAL_INFORMATIONS, formFields);
    }

    me.saveUserAddressInformations = function(formFields)
    {
        sessionService.saveSession(constantService.sessions.USER.ADDRESS_INFORMATIONS, formFields);
    }

    me.saveUserBillingInformations = function(formFields)
    {
        sessionService.saveSession(constantService.sessions.USER.BILLING_INFORMATIONS, formFields);
    }

    me.saveUserLoginInformations = function (formFields) {
        sessionService.saveSession(constantService.sessions.USER.LOGIN_INFORMATIONS, formFields);
    }

    me.saveGuestPersonalInformations = function (formFields)
    {
        sessionService.saveSession(constantService.sessions.GUEST.PERSONAL_INFORMATIONS, formFields);
    }

    me.saveGuestAddressInformations = function (formFields)
    {
        sessionService.saveSession(constantService.sessions.GUEST.ADDRESS_INFORMATIONS, formFields);
    }
    
    me.saveUserOrder = function (formFields)
    {
        sessionService.saveSession(constantService.sessions.ORDER, formFields);
    }

    me.saveUserPaymentInformation = function (formFields) {
        sessionService.saveSession(constantService.sessions.PAYMENT_INFORMATION, formFields);
    }

    me.getGuestPersonalInformations = function ()
    {
        return sessionService.getSession(constantService.sessions.GUEST.PERSONAL_INFORMATIONS);
    }

    me.getGuestAddressInformations = function ()
    {
        return sessionService.getSession(constantService.sessions.GUEST.ADDRESS_INFORMATIONS);
    }

    me.getUserLoginInformations = function () {
        return sessionService.getSession(constantService.sessions.USER.LOGIN_INFORMATIONS);
    }

    me.getUserPersonalInformations = function () {
        return sessionService.getSession(constantService.sessions.USER.PERSONAL_INFORMATIONS);
    }

    me.getUserAddressInformations = function ()
    {
        return sessionService.getSession(constantService.sessions.USER.ADDRESS_INFORMATIONS);
    }
    
    me.getUserBillingInformations = function ()
    {
        return sessionService.getSession(constantService.sessions.USER.BILLING_INFORMATIONS);
    }

    me.getUserOrders = function ()
    {
        return sessionService.getSession(constantService.sessions.ORDER);
    }

    me.getUserPaymentInformation = function () {
        return sessionService.saveSession(constantService.sessions.PAYMENT_INFORMATION);
    }

    me.getUserName = function ()
    {
        return me.userName;
    }

    return {
        authenticate: me.authenticate,
        registerUser: me.registerUser,
        authenticateUserByEmail: me.authenticateUserByEmail,
        isUserLoggedIn: me.isUserLoggedIn,
        userLogOut: me.userLogOut,

        saveUserPersonalInformations: me.saveUserPersonalInformations,
        saveUserAddressInformations: me.saveUserAddressInformations,
        saveUserBillingInformations: me.saveUserBillingInformations,
        saveUserLoginInformations: me.saveUserLoginInformations,
        saveGuestPersonalInformations: me.saveGuestPersonalInformations,
        saveGuestAddressInformations: me.saveGuestAddressInformations,
        saveUserOrder: me.saveUserOrder,
        saveUserPaymentInformation: me.saveUserPaymentInformation,

        getUserPersonalInformations: me.getUserPersonalInformations,
        getUserLoginInformations: me.getUserLoginInformations,
        getUserAddressInformations: me.getUserAddressInformations,
        getUserBillingInformations: me.getUserBillingInformations,
        getGuestPersonalInformations: me.getGuestPersonalInformations,
        getGuestAddressInformations: me.getGuestAddressInformations,
        getUserOrders: me.getUserOrders,
        getUserPaymentInformation: me.getUserPaymentInformation,
        getUserName: me.getUserName
    }
}]);