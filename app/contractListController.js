angular.module('pilotApp').controller('contractListController', ['$scope', '$http' , '$location','para', '$rootScope' ,function($scope, $http, $location, para, $rootScope) {

	$scope.gridOptions = {
            data: [],
            urlSync: false
        };

    var arg = [""];


    if($rootScope.userName == 'test_user0' || $rootScope.userName == 'test_user1'){
    	$scope.show = true;
    	console.log($scope.show);
    }



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

	$scope.reload = function(){
		console.log("reload");
		$location.path('/orderList');	
	}

	$scope.logout = function(){
		console.log("reload");
		$location.path('/login');	
	}
	
}]);