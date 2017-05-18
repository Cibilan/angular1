var pilotApp = angular.module('pilotApp', ['ngRoute','dataGrid','pagination','ngMaterial']);

pilotApp.config(['$routeProvider', function($routeProvider){
	
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'mainController'
		})
		.when('/assetList', {
			templateUrl: 'views/assetList.html',
			controller: 'assetListController'
		})
		.when('/orderList', {
			templateUrl: 'views/contractList.html',
			controller: 'contractListController'
		})
		.when('/contractDetails/:id', {
			templateUrl: 'views/contractDetails.html',
			controller: 'contractDetailsController'
		})
		.when('/createOrder', {
			templateUrl: 'views/createOrder.html',
			controller: 'createOrderController'
		})
		.otherwise({
			redirectTo: '/orderList'
		});
}]);

pilotApp.controller('mainController', ['$scope' , function($scope) {

}]);

pilotApp.controller('assetListController', ['$scope', '$http', function($scope, $http) {

	$http.get('data/assestListResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.assetList = JSON.parse(reponse.result.message);
		console.log($scope.assetList);
	});

}]);

pilotApp.controller('contractListController', ['$scope', '$http' , '$location', function($scope, $http, $location) {

		$scope.gridOptions = {
            data: [],
            urlSync: false
        };

	$http.get('data/dispatchOrderList.json').success(function(reponse){
		console.log(reponse);
		var message = reponse.result.message;
		var message1 = message.replace	("}{","},{");
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

pilotApp.controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams' , function($scope, $http, $location, $routeParams) {

	$scope.dispatchOrderId = $routeParams.id;

	$http.get('data/contractHistoryResponse.json').success(function(reponse){
		console.log(reponse);
		
		$scope.contractHisory = JSON.parse(reponse.result.message);
		console.log($scope.contractHisory);
	});
	$http.get('data/dispatchOrderDetails.json').success(function(reponse){
		console.log(reponse);
		$scope.dispatchOrderDetails = JSON.parse(reponse.result.message);
		console.log($scope.dispatchOrderDetails);
	}); 
	
}]);

