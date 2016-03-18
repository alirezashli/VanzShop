app.factory('myCartService', ['$rootScope', 'storeService', 'constantService', 'helperService', 'sessionService', function ($rootScope, storeService, constantService, helperService, sessionService) {

    var me = this;
    me.myCarts = me.myCarts || sessionService.getSession(constantService.sessions.MY_CARTS) || [];
    me.totalWithTax = helperService.convertToTwoDecimalPlaces(parseInt(me.subTotal, 10) + constantService.taxes.GOVERNMENT_TAX) || 0;
    me.totalWithoutTax = 0;

    me.addToCart = function (productItem, qty) {

        productItem.Qty += qty;

        if (me.myCarts.length <= 0) {
            me.myCarts.push(productItem);
        }
        else {
            var existingItemIndex = helperService.findItemIndex(productItem, me.myCarts);

            if (existingItemIndex >= 0) {
                me.myCarts[existingItemIndex] = productItem;
            }
            else {
                me.myCarts.push(productItem);
            }
        }

        var subTotal = me.calCulateSubTotal();

        sessionService.saveSession(constantService.sessions.MY_CARTS, me.myCarts);

        $rootScope.$emit('subTotalChangeEvent', { myCartSubTotal: subTotal });

        $rootScope.$emit('myCartsChangeEvent', { myCarts: me.myCarts });
    }

    me.removeFromCart = function (myCartProductItem) {

        var existingItemIndex = helperService.findItemIndex(myCartProductItem, me.myCarts);

        if (existingItemIndex >= 0) {

            me.myCarts.splice(existingItemIndex, 1);

            var subTotal = me.calCulateSubTotal();

            sessionService.saveSession(constantService.sessions.MY_CARTS, me.myCarts);

            $rootScope.$emit('subTotalChangeEvent', { myCartSubTotal: subTotal });

            $rootScope.$emit('myCartsChangeEvent', { myCarts: me.myCarts });
        }
    }

    me.updateCartQuantity = function (myCartProductItems) {

        var subTotal = me.calCulateSubTotal();

        sessionService.saveSession(constantService.sessions.MY_CARTS, me.myCarts);

        $rootScope.$emit('subTotalChangeEvent', { myCartSubTotal: subTotal });

        $rootScope.$emit('myCartsChangeEvent', { myCarts: me.myCarts });
    }

    me.calCulateSubTotal = function () {

        var subTotal = 0;

        for (i = 0; i < me.myCarts.length; i++) {
            subTotal += me.myCarts[i].PriceSale * (me.myCarts[i].Qty || 0);
        }

        me.totalWithTax = subTotal + constantService.taxes.GOVERNMENT_TAX;

        me.totalWithTax = helperService.convertToTwoDecimalPlaces(me.totalWithTax);

        me.subTotal = helperService.convertToTwoDecimalPlaces(subTotal);

        return me.subTotal;
    }

    me.getSubTotalCount = function () {
        return me.calCulateSubTotal() || 0;
    }

    me.getTotalWithoutTax = function ()
    {
        return me.totalWithoutTax;
    }

    me.getTotalWithTax = function () {
        return me.totalWithTax;
    }

    return {
        myCarts: me.myCarts,
        addToCart: me.addToCart,
        removeFromCart: me.removeFromCart,
        calCulateSubTotal: me.calCulateSubTotal,
        getSubTotalCount: me.getSubTotalCount,
        updateCartQuantity: me.updateCartQuantity,
        getTotalWithTax: me.getTotalWithTax,
        getTotalWithoutTax: me.getTotalWithoutTax
    }
}]);