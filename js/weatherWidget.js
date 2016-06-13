var weatherShowcaseApp = angular.module('weatherShowcaseApp',[]);
        weatherShowcaseApp.controller('weatherWidgetController', ['$scope','$http', '$templateCache', function($scope,$http, $templateCache){
            $scope.degreeSymbol = "°";
            $scope.minimaldaysToShowInWidget = 5; // change this as per the requirement to show no off days to display in the widget
            $scope.weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            $http({method:"GET", url: $scope.weatherUrl, cache: $templateCache}).
                 success(function(data, status) {
                    $scope.weatherResults = data.query.results;
                    $scope.dailyWeatherReportList = data.query.results.channel.item.forecast;
                    $scope.temperatureInDegree = data.query.results.channel.item.condition.temp;
                    $scope.temparaturecondition = data.query.results.channel.item.condition.text;
                    $scope.searchedCity = data.query.results.channel.location.city;
                    $scope.searchedState = data.query.results.channel.location.region;
                    //sets dynamically the position of the weather image for different conditions of weather
                    switch($scope.temparaturecondition) {
                        case "Cloudy":
                            $scope.position1 = "50% 50%";
                            break;
                        case "Showers":
                            $scope.position1 = "0% 100%";
                            break;
                        case "Partly Cloudy":
                            $scope.position1 = "0% 50%";
                        case "Mostly Sunny":
                            $scope.position1 = "0% 0%";
                        default :
                            $scope.position1 = "0% 0%";
                         }
                    }).
                 error(function(data, status) {
                    //not yet displaying any where the service failure
                    $scope.weatherResults = "try again after some time";
                    console.log("System failure:"+ $scope.weatherResults);
                    $scope.fetchingStatus = status;
            });
        }]);
