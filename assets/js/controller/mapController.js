app.controller('mapController',['$scope','$http',function($scope,$http){
	$scope.center = {
        lat: 30.2909,
        lng: -97.7330,
        zoom: 13
    };
	$scope.markers = [];
    $http.get('https://data.texas.gov/resource/9e7h-gz56.json').success(function(data) {
    	//console.log(data);
    	$scope.markers = [];
    	data.forEach(function(bus){
    		locationTemp = bus.location.split(',');
    		$scope.markers.push({
    			lat : parseFloat(locationTemp[0]),
    			lng : parseFloat(locationTemp[1]),
    			message : 'fuk'
    		});
    	});
    });

}]);