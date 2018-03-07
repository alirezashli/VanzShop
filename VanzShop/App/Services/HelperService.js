app.factory('helperService', ['constantService', '$location', '$anchorScroll', function (constantService, $location, $anchorScroll) {
    var me = this;

    me.getBaseURL = function () {
        //return 'http://localhost/vanzshop/'
        return 'http://localhost:55464/';
        //return 'http://vanzpshop.somee.com/';
    }

    me.convertToTwoDecimalPlaces = function (value) {
        return parseFloat(Math.round(value * 100) / 100).toFixed(constantService.utility.NUMBER_OF_DECIMAL_PLACES);
    }

    me.moveToPage = function (pageName, id, isHash) {

        if (angular.isDefined(id)) {

            var id = (isHash == false) ? id : me.sha256(id);

            $location.path(pageName + "/" + id);
        }
        else {
            $location.path(pageName)
        }
    }

    me.searchIndex = function (nameKey, myArray) {
        for(var i=0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return i;
            }
        }
    },

    me.generateGuid = function ()
    {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    me.generateDate = function ()
    {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();

        return curr_date + "-" + curr_month + "-" + curr_year;
    }

    me.generateRandomNumbers = function ()
    {
        var max = 10;
        var min = 5;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    me.findItemIndex = function (productItem, lists)
    {
        for (i = 0; i < lists.length; i++) {
            if (lists[i].ItemId == productItem.ItemId)
                return i;
        }
    }

    me.moveToTop = function ()
    {   
        $anchorScroll();
    }

    me.sha256 = function (value)
    {
        //return Sha256.hash(constantService.security.SALT + " " + value);
        return $.sha256(constantService.security.SALT + " " + value);
    }
   
    return {
        getBaseURL: me.getBaseURL,
        convertToTwoDecimalPlaces: me.convertToTwoDecimalPlaces,
        moveToPage: me.moveToPage,
        searchIndex: me.searchIndex,
        generateGuid: me.generateGuid,
        generateDate: me.generateDate,
        generateRandomNumbers: me.generateRandomNumbers,
        findItemIndex: me.findItemIndex,
        moveToTop: me.moveToTop,
        sha256: me.sha256
    }
}]);