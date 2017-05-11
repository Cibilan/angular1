var pilotApp = angular.module('pilotApp', ['ngRoute']);

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
		.when('/contractList', {
			templateUrl: 'views/contractList.html',
			controller: 'contractListController'
		})
		.when('/contractDetails', {
			templateUrl: 'views/contractDetails.html',
			controller: 'contractDetailsController'
		})
		.otherwise({
			redirectTo: '/home'
		})
}]);

pilotApp.controller('mainController', ['$scope' , function($scope) {

}]);

pilotApp.controller('assetListController', ['$scope', '$http' , function($scope, $http) {

	$http.get('data/assestListResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.assetList = JSON.parse(reponse.result.message);
		console.log($scope.assetList);
	});

}]);

pilotApp.controller('contractListController', ['$scope', '$http' , function($scope, $http) {

	$http.get('data/contractListResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.contractList = JSON.parse(reponse.result.message);
		console.log($scope.contractList);
	});
	
}]);

pilotApp.controller('contractDetailsController', ['$scope', '$http' , function($scope, $http) {

	$http.get('data/contractHistoryResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.contractHisory = JSON.parse(reponse.result.message);
		console.log($scope.contractHisory);
	});
	
}]);