angular.module('pilotApp').controller('loginController', ['$scope', '$http', '$location', '$rootScope',function($scope,$http, $location,$rootScope){

	$scope.login = {

		peer : "localhost",	
		port : "7050",
		cc : "e24fd807f7a1b5bd8267ce623d23fc1db3be59092a4e293ac9998e5587d61399759901604a778a6d46004679aba98d099e719b3f6e33b24020742126f36a5cb6",
		userName : "test_user0" ,
		password : "MS9qrN8hFjlE"
	};

	var user = "";
	$scope.metacaller = [];

	
	$scope.loginUser = function(){
		user = $scope.login.userName;
	
		for(var i = 0; i < user.length; ++i){
			$scope.metacaller[i] = user.charCodeAt(i);
		}

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
		    $rootScope.userName = $scope.login.userName;
		    $rootScope.url = $scope.login.chainUrl;
		    $rootScope.cc = $scope.login.cc;
		    $rootScope.callerMeta = $scope.metacaller;
		    $rootScope.peer = $scope.login.port;
			$location.path('/orderList');
		}, function errorCallback(response) {
		  	alert(response.data.Error);
		});
	}

}]);