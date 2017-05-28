angular.module('pilotApp').controller('loginController', ['$scope', '$http', function($scope,$http){
	$scope.login = {};
	
	$scope.loginUser = function(){

		console.log($scope.login);

	}

}]);