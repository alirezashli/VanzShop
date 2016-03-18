app.factory('storeService', ['$http', '$rootScope', 'helperService', function ($http, $rootScope, helperService) {

    var me = this;
    me.sections = [];
    me.newArrivals = [];
    me.featureProducts = [];
    me.allProductItems = [];
    me.productSections = [];
    me.allProducts = [];
    me.selectedProductItem = null;

    $http.get('../../Content/jsonData/product.json').success(function (data, status, headers, config) {

        me.sections = data || null;

        me.getProducts();
    }).
    error(function (data, status, headers, config) {
        console.log(status);
    });


    me.getProducts = function () {
        angular.forEach(me.sections, function (section, key) {
            angular.forEach(section.Products, function (product, key) {
                angular.forEach(product.Items, function (productItem, key) {
                    if (productItem.IsFeature == 1) {
                        me.featureProducts.push(productItem);
                    }

                    if (productItem.IsNewArrival == 1) {
                        me.newArrivals.push(productItem);
                    }

                    me.allProductItems.push(productItem);
                });
                me.allProducts.push(product);
            });
        });

        $rootScope.$emit('productSectionsLoadEvent', { productSections: me.sections });
    }

    me.getSelectedProductItem = function (itemId) {
        for (i = 0; i < me.allProductItems.length; i++) {
            if (helperService.sha256(me.allProductItems[i].ItemId) == itemId) {
                me.selectedProductItem = me.allProductItems[i];
                return me.allProductItems[i];
                break;
            }
        }
    }

    me.getProductsByCategoryId = function (categoryId)
    {
        var productCategories = [];

        for (i = 0; i < me.allProducts.length; i++) {
            if (helperService.sha256(me.allProducts[i].CategoryId) == categoryId) {
                product = me.allProducts[i];
                break;
            }
        }

        if (product)
        {
            angular.forEach(product.Items, function (productItem, key) {
                productCategories.push(productItem);
            });
        }

        return productCategories || [];
    }

    me.getCategoryNameById = function (categoryId)
    {
        for (i = 0; i < me.allProducts.length; i++) {
            if (helperService.sha256(me.allProducts[i].CategoryId) == categoryId) {
                product = me.allProducts[i];

                return product.Name || null;
                break;
            }
        }
    }

    return {
        featureProducts: me.featureProducts,
        newArrivals: me.newArrivals,
        allProductItems: me.allProductItems,
        getSelectedProductItem: me.getSelectedProductItem,
        selectedProductItem: me.selectedProductItem,
        getProductsByCategoryId: me.getProductsByCategoryId,
        getCategoryNameById: me.getCategoryNameById
    }
}]);