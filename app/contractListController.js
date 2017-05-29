angular.module('pilotApp').controller('contractListController', ['$scope', '$http' , '$location','para', '$rootScope' ,function($scope, $http, $location, para, $rootScope) {

	$scope.gridOptions = {
            data: [],
            urlSync: false
        };

    var arg = [""];

    $scope.param = para.myFunc("query","getAllDispatchOrdersLatest",arg);
           
    console.log($rootScope.userName);
	$http.post($rootScope.url,$scope.param).success(function(reponse){
		console.log(reponse);
		var message = reponse.result.message;
		var message1 = message.split("}{").join("},{");
		var message2 = "[" + message1 + "]";
		console.log(message2);
		$scope.gridOptions.data = JSON.parse(message2);
        console.log($scope.gridOptions);
	});

	$scope.goPath = function(path){
		var url = "/contractDetails/" + path;
	  	$location.path(url);
	}
	
}]);