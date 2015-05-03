app.controller('mapController',['$scope','$http', '$timeout', 'geolocation', function($scope,$http,$timeout, geolocation){
    
    geolocation.getLocation().then(function(data) {
        $scope.coords = {latitude:data.coords.latitude, longitude:data.coords.longitude};
        console.log(data.coords.latitude);
        console.log(data.coords.longitude);
    });

	$scope.center = {
        lat: 30.2909,
        lng: -97.7330,
        zoom: 13
    };
	$scope.markers = [];
    $scope.getData = function(){
        $http.get('https://data.texas.gov/resource/9e7h-gz56.json').success(function(data) {
        	//console.log(data);
        	$scope.markers = [];
        	data.forEach(function(bus){
        		locationTemp = bus.location.split(',');
                vehicleId = bus.vehicleid
        		$scope.markers.push({
        			lat : parseFloat(locationTemp[0]),
        			lng : parseFloat(locationTemp[1]),
        			message : vehicleId
        		});
        	});
            console.log('Fetched data');
        });
    }
    $scope.intervalFunction = function(){
        $timeout(function() {
          $scope.getData();
          $scope.intervalFunction();
        }, 3000)
      };

    $scope.intervalFunction();
}]);