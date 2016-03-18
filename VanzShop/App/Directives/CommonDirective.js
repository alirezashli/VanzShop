
app.directive('colorSwitch', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).click(
                function () {
                    $(".swatches li.selected").removeClass("selected");
                    $(this).addClass('selected');
                }
            );
        }
    }
});

app.directive('smoothProducts', function () {
    var myTemplate = '';

    function link(scope, element, attrs) {

        function updateTemplate() {
      
            var html = '';

            angular.forEach(scope.selectedProductItem.SubImages, function (subImage, key) {
                html += '<a href="../../' + subImage + '"><img src="../../' + subImage + '" class="img-responsive" alt="img"></a>'
            });

            element.html(html);

            $(attrs.smoothProductWrap).smoothproducts();
        }

        scope.$watch(attrs.smoothProductWrap, function (value) {
            updateTemplate();
        });
    }

    return {
        restrict: 'E',
        link: link
    }
});

app.directive('newArrivalOwlCarousel', function () {

    function link(scope, element, attrs) {

        scope.$watch(scope.newArrivals, function () {

            $("#" + attrs.owlCarousel).owlCarousel({
                navigation: true,
                items: 4,
                itemsTablet: [768, 2]
            });

        });

    }

    return {
        restrict: 'E',
        link: link
    }
});

app.directive('compareTo', function () {

    function link (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
            if (!scope.otherModelValue)//considered matched if the compareTo has no value.
            {
                return true;
            }

            return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
            ngModel.$validate();
        });
    }
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: link
    };
});


app.directive('selectStates', ['$http', 'helperService', function ($http, helperService) {

    function link(scope, element, attributes, ngModel) {

        scope.id = attributes.id;

        $http.get('../../Content/jsonData/states.json').success(function (data, status, headers, config) {

            scope.states = data;

            if (scope.$parent.formFields)
            {
                var index = helperService.searchIndex(scope.$parent.formFields.states.name, scope.states);

                scope.$parent.formFields.states = scope.states[index];
            }
        }).
        error(function (data, status, headers, config) {
            console.log(status);
        });
    }
    return {
        restrict: "E",
        scope: {
            id: "="
        },
        scope: true,
        link: link,
        template: '<select class=\"form-control\" required aria-required=\"true\" id=\"{{ id }}\" name=\"{{ id }}\" ng-model="addressInformations.states" ng-options="state.name for state in states"><options></options>' +
                    '<option value="">-- Choose --</option>' +
                  '</select>'
    };
}]);

//app.directive('selectCountries', ['$http', 'helperService', function ($http, helperService) {

//    function link(scope, element, attributes) {

//        scope.id = attributes.id;

//        $http.get('../../assets/jsonData/countries.json').success(function (data, status, headers, config) {

//            scope.countries = data;

//            if (scope.$parent.formFields)
//            {
//                var index = helperService.searchIndex(scope.$parent.formFields.country.name, scope.countries);

//                scope.$parent.formFields.country = scope.countries[index]; 
//            }
//        }).
//        error(function (data, status, headers, config) {
//            console.log(status);
//        });
//    }
//    return {
//        restrict: "E",
//        scope: {
//            id: "="
//        },
//        scope: true,
//        link: link,
//        template: '<select class=\"form-control\" required  id=\"{{ id }}\" name=\"{{ id }}\" ng-model="addressInformations.country" ng-options="country.name for country in countries"><options></options>' +
//                    '<option value="">-- Choose --</option>' +
//                  '</select>'
//    };
//}]);

app.directive('selectCountries', ['$http', 'helperService', '$parse', function ($http, helperService, $parse) {

    var countries = [
      "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
      "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
      "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
      "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina",
      "Botswana", "Bouvet Island", "Brazil",
      "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
      "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
      "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
      "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba",
      "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)",
      "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia",
      "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece",
      "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea",
      "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)",
      "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq",
      "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
      "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan",
      "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
      "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of",
      "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique",
      "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of",
      "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
      "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger",
      "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau",
      "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
      "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation",
      "Rwanda", "Saint Barthelemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia",
      "Saint Martin (French Part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
      "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
      "Sint Maarten (Dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
      "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
      "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic",
      "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste",
      "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
      "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
      "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu",
      "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.",
      "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
    ];

    return {
        restrict: 'E',
        template: '<select><option value="">-- Choose --</option>'+
                  '<option>' + countries.join('</option><option>') + '</option></select>',
        replace: true,
        link: function (scope, elem, attrs) {


            if (!!attrs.ngModel) {
                var assignCountry = $parse(attrs.ngModel).assign;

                elem.bind('change', function (e) {
                    assignCountry(elem.val());
                });

                scope.$watch(attrs.ngModel, function (country) {
                    elem.val(country);
                });
            }
        }
    };
}]);

//app.directive('wholeNumber', function () {

//        return {
//            link: function (scope, elem, attrs) {
//                elem.on("change", function () {
//                    var num = Math.abs(parseInt(elem.val(), 10));
//                    num = num > scope.maxValue ? 0 : num;
//                    scope.myCart.Qty = num
//                    scope.$apply(); // update view
//                });
//            }
//    };
//});

app.directive('wholeNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModelController) {
            elem.on("blur", function () {
                //var num = Math.abs(parseInt(elem.val(), 10));
                //num = num > scope.maxValue ? 0 : num;
                //scope.myCart.Qty = num
                //scope.$apply(); // update view
                
                //ngModelController.$parsers.push(function (data) {
                //    //convert data from view format to model format
                //    return data; //converted
                //});
                ngModelController.$viewValue = Math.abs(parseInt(ngModelController.$viewValue, 10));
                scope.$apply();
                //ngModelController.$formatters.push(function (data) {
                //    //convert data from model format to view format
                //    return data; //converted
                //});

            });
            
        }
    }
});