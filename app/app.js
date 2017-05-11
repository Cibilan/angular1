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

pilotApp.controller('assetListController', ['$scope' , function($scope) {
	
}]);

pilotApp.controller('contractListController', ['$scope' , function($scope) {
	
}]);

pilotApp.controller('contractDetailsController', ['$scope' , function($scope) {
	
}]);