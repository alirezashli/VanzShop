app.factory('constantService', ['$http', function ($http) {
    var me = this;
    
    me.sessions = {
        'MY_CARTS': 'myCarts',
        'MY_CARTS_SUBTOTAL': 'myCartsSubTotal',
        'USER': {
            'PERSONAL_INFORMATIONS': 'userPersonalInformations',
            'ADDRESS_INFORMATIONS': 'userAddressInformations',
            'BILLING_INFORMATIONS': 'billingInformations',
            'LOGIN_INFORMATIONS': 'loginInformations',
            'IS_USER_LOGGED_IN': 'isUserLoggedIn'
        },
        'GUEST': {
            'PERSONAL_INFORMATIONS': 'guestPersonalInformations',
            'ADDRESS_INFORMATIONS': 'guestaAddressInformations'
        },
        'ORDER': 'order',
        'PAYMENT_INFORMATION': 'paymentInformation',
        'MY_WISH_LIST': 'myWishList'
    };

    me.messages = {
        'ADD_TO_CART_SUCCESS': 'Successfully Added to Cart.',
        'REMOVE_FROM_CART': 'Successfully Removed from Cart.',
        'UPDATE_CART': 'Successfully Update the Cart.',
        'CUSTOM_MESSAGE': function (field, validationType, size)
        {
            if (validationType == 'required')
            {
                return field + " is required";
            }

            else if (validationType == 'email') {
                return field + " is invalid format.";
            }

            else if (validationType == 'minlength' && size)
            {
                return field + " must "+ size +" character(s) or more.";
            }

            else if (validationType == 'maxlength' && size) {
                return field + " must " + size + " character(s) or less.";
            }

            else if (validationType == 'match') {
                return field + " does not matched.";
            }
        },
        'PAYMENT_TYPES': {
            'MASTER_CARD': 'Master Card',
            'CASH_ON_DELIVERY': 'Cash On Delivery'
        },
        'ORDER_NUMBER_PREFIX': 'VPORD',
        'ADD_TO_WISH_LIST': 'Successfully Added to Wish List',
        'REQUIRED_LOGIN': 'Please Sign In or Create Account.',
        'REMOVE_FROM_WISH_LIST': 'Successfully Removed from My Wish List'
    }

    me.taxes = {
        'GOVERNMENT_TAX' : 0.07
    }

    me.selectOptions = {
        'QUANTITY': {
            'options': [{
                'id': 1,
                'name': 1
            },
            {
                'id': 2,
                'name': 2
            },
            {
                'id': 3,
                'name': 3
            },
            {
                'id': 4,
                'name': 4
            },
            {
                'id': 5,
                'name': 5
            },
            {
                'id': 6,
                'name': 6
            },
            {
                'id': 7,
                'name': 7
            },
            {
                'id': 8,
                'name': 8
            },
            {
                'id': 9,
                'name': 9
            },
            {
                'id': 10,
                'name': 10
            }]
        }
    }

    me.utility = {
        'NUMBER_OF_DECIMAL_PLACES': 2,
        'PASSWORD_LENGTH': 8
    }

    me.orderStatus = {
        'PENDING': 'Pending',
        'DONE': 'Done'
    }

    me.security = {
        'SALT': 'vanzp'
    }

    return {
        messages: me.messages,
        selectOptions: me.selectOptions,
        taxes: me.taxes,
        utility: me.utility,
        sessions: me.sessions,
        orderStatus: me.orderStatus,
        security: me.security
    }
}]);