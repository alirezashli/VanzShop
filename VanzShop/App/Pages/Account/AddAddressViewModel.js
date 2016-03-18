app.controller('addAddressViewModel', ['$scope', 'helperService', 'userService', 'constantService', '$stateParams', '$http', function ($scope, helperService, userService, constantService, $stateParams, $http) {

    /********** INITIALIZATIONS *************/

    if (!userService.isUserLoggedIn())
        helperService.moveToPage('home');
    
    $scope.helperService = helperService;

    $scope.constantService = constantService;

    $scope.addressInformations = null;

    var addressInformationsTmp = userService.getUserAddressInformations() || [];

    if ($stateParams.id)
    {
        var id = (parseInt($stateParams.id, 10) >= 0) ? parseInt($stateParams.id, 10) : null;

        $scope.addressInformations = addressInformationsTmp[id] || null;
    }

    helperService.moveToTop();

    $http.get('../../../assets/jsonData/countries.json').success(function (data, status, headers, config) {

        $scope.countries = data;

        if ($scope.addressInformations) {

            var index = helperService.searchIndex($scope.addressInformations.country.name, $scope.countries);

            $scope.addressInformations.country = $scope.countries[index];
        }

    }).
   error(function (data, status, headers, config) {
       console.log(status);
   });

    $http.get('../../../assets/jsonData/states.json').success(function (data, status, headers, config) {

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
    
    $scope.submitAddressForm = function () {

        var me = this;

        if (me.addressForm.$valid) {

            if (id >= 0) {
                addressInformationsTmp[id] = $scope.addressInformations;

                userService.saveUserAddressInformations(addressInformationsTmp);

                bootbox.alert('Update successfully.');
            }
            else {
                addressInformationsTmp.push($scope.addressInformations);

                userService.saveUserAddressInformations(addressInformationsTmp);

                bootbox.alert('New Address Added.');
            }

            helperService.moveToPage('myAddress');
        }
        else {
            bootbox.alert('Required fields needs to filled up.');
        }
    }

}]);