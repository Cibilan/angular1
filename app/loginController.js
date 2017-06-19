angular.module('pilotApp').controller('loginController', ['$scope', '$http', '$location', '$rootScope',function($scope,$http, $location,$rootScope){

	$scope.login = {

		peer : "localhost",	
		port : "7050",
		cc : "1c6083ad65d084e81d9002bbba2512a2c65d158e2a944c392df6b8da0a58521fca4a95253b9ca31e5c638dd7b202aa8bb1192811a0fe846a5ac9cc6e7d8c4afd",
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

			if( $rootScope.userName == 'test_user0') {
		    	$rootScope.dispatch = true;
		    	$rootScope.invoice = true;
			}

		    if( $rootScope.userName == 'bosch_planner' || $rootScope.userName == 'bosch_dispatch' || $rootScope.userName == 'ford_inbound') {
		    	$rootScope.dispatch = true;
		    	$rootScope.invoice = false;
			}

			if( $rootScope.userName == 'ksh_transport') {
		    	$rootScope.dispatch = true;
		    	$rootScope.invoice = true;
			}

			if( $rootScope.userName == 'bosch_finance') {
		    	$rootScope.dispatch = false;
		    	$rootScope.invoice = true;
			}

			if($rootScope.userName == 'bosch_finance'){
				$location.path('/voucherList');
			}
			else {
				$location.path('/orderList');
			}
		}, function errorCallback(response) {
		  	alert(response.data.Error);
		});
	}

}]);