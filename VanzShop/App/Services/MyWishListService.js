app.factory('myWishListService', ['sessionService', 'constantService', 'helperService', function (sessionService, constantService, helperService) {

    var me = this;

    me.myWishLists = sessionService.getSession(constantService.sessions.MY_WISH_LIST) || [];
    
    me.addToMyWishList = function (productItem)
    {
        //if wish list transferred to web api, should be save with username

        me.myWishLists.push(productItem);
       
        sessionService.saveSession(constantService.sessions.MY_WISH_LIST, me.myWishLists);
    }

    me.removeFromMyWishList = function (productItem)
    {
        var existingItemIndex = helperService.findItemIndex(productItem, me.myWishLists);

        if (existingItemIndex >= 0) {

            me.myWishLists.splice(existingItemIndex, 1);

            sessionService.saveSession(constantService.sessions.MY_WISH_LIST, me.myWishLists);
        }
    }

    me.getMyWishLists = function ()
    {
        //if wish list data are from web api, should use username to retrieve.
        return sessionService.getSession(constantService.sessions.MY_WISH_LIST);
    }

    return {
        addToMyWishList: me.addToMyWishList,
        getMyWishLists: me.getMyWishLists,
        removeFromMyWishList: me.removeFromMyWishList
    }
}]);