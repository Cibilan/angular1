angular.module('pilotApp').controller('loginController', ['$scope', '$http', '$location', '$rootScope',function($scope,$http, $location,$rootScope){

	$scope.login = {

		peer : "localhost",	
		port : "7050",
		cc : "973826f23f42b8dfdda6b712b3016cef013f6a02f5999ccc63c663a48539298439a11dcdf71cc3d456ceabd9fb60b165d1e63b5a7dabcb6c039a8b510294d893",
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
		    	$rootScope.voucher = true;
		    	$rootScope.invoice = true;
			}

		    if( $rootScope.userName == 'bosch_planner' || $rootScope.userName == 'bosch_dispatch' || $rootScope.userName == 'ford_inbound') {
		    	$rootScope.dispatch = true;
		    	$rootScope.voucher = false;
		    	$rootScope.invoice = false;
			}

			if( $rootScope.userName == 'ksh_transport') {
		    	$rootScope.dispatch = true;
		    	$rootScope.voucher = true;
		    	$rootScope.invoice = true;
			}

			if( $rootScope.userName == 'bosch_finance') {
		    	$rootScope.dispatch = false;
		    	$rootScope.voucher = false;
		    	$rootScope.invoice = true;
			}

			if($rootScope.userName == 'bosch_finance'){
				$location.path('/logisticsInvoiceList');
			}
			else {
				$location.path('/orderList');
			}
		}, function errorCallback(response) {
		  	alert(response.data.Error);
		});
	}

}]);