var pilotApp = angular.module('pilotApp', ['ngRoute','dataGrid','pagination','ngMaterial', 'ngMessages']);

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

pilotApp.provider('userinfo',function () {
	return {
		$get: function (){
			return {
				userData: function (){
					var user = {
						url: "http://localhost:7050/chaincode",
						userName: "test_user0",
						cc : "74170f66035903ab2f722a3515347dadda4995710a46135458269596fcf7f7f34aea1a8c4489501251d280dd0e91d8ec3ea3b4756d4b818c485fdfc85190c1ef"
					};
					return user;
				} 	

			}
		}	
	}
	
});

pilotApp.service('para',function(){
	this.myFunc = function(type,func,user,arg){
	return JSON.stringify({
		  "jsonrpc": "2.0",
		  "method": type,
		  "params": {
		    "type": 1,
		    "chaincodeID": {
		      "name": user.cc
		    },
		    "ctorMsg": {
		      "function": func,
		      "args": arg
		    },
		    "secureContext": user.userName
		  },
		  "id": 3   
    	});
	}
});

pilotApp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});

pilotApp.controller('mainController', ['$scope' , function($scope) {

}]);

pilotApp.controller('assetListController', ['$scope', '$http', function($scope, $http) {

	$http.get('data/assestListResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.assetList = JSON.parse(reponse.result.message);
		console.log($scope.assetList);
	});

}]);