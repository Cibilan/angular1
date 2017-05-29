angular.module('pilotApp').controller('loginController', ['$scope', '$http', '$location', '$rootScope',function($scope,$http, $location,$rootScope){

	$scope.login = {

		peer : "localhost",	
		port : "7050",
		cc : "26abe9a1e0bf1f5ea6cc5522574659e184c7cd42fe5f2ae3ab085a0d45a898f083f5704d553bfc7b7739a0a21523379e556c71214010364a7b616585228b3e8f",
		userName : "test_user5" ,
		password : "MS9qrN8hFjlE"
	};
	
	$scope.loginUser = function(){

		$scope.login.chainUrl = "http://" + $scope.login.peer + ":" + $scope.login.port + "/chaincode" ; 
		$scope.login.regUrl = "http://" + $scope.login.peer + ":" + $scope.login.port + "/registrar" ; 
		console.log($scope.login);
		var param = JSON.stringify({
			"enrollId": $scope.login.userName,
			"enrollSecret": $scope.login.password
		});
		$rootScope.loggedIn = false;
		$http.post($scope.login.regUrl,param)
		.then(function successCallback(response) {
		    console.log("Login success");
		    $rootScope.loggedIn = true;
		    $rootScope.userName = $scope.login.userName,
		    $rootScope.url = $scope.login.chainUrl,
		    $rootScope.cc = $scope.login.cc
			$location.path('/orderList');
		}, function errorCallback(response) {
		  	alert(response.data.Error);
		});
	}

}]);