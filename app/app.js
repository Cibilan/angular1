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
    var parameter = JSON.stringify({
		  "jsonrpc": "2.0",
		  "method": "query",
		  "params": {
		    "type": 1,
		    "chaincodeID": {
		      "name": "7a4fa3cb79ea47991ea0b471b9c02c0a17502050906529a7715b15cfab1e0296d76c04f9fc9652e12ec18c9625fa8eafdfc0fbf40ff09cf072bc3ebb0bbc3499"
		    },
		    "ctorMsg": {
		      "function": "getAllDispatchOrdersLatest",
		      "args": [
		        "A002"
		        ]
		    },
		    "secureContext": "test_user0"
		  },
		  "id": 3   
    });    

	$http.post('http://localhost:7050/chaincode',parameter).success(function(reponse){
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
	
}]);

pilotApp.controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams' , function($scope, $http, $location, $routeParams) {

	$scope.dispatchOrderId = $routeParams.id;

	var parameter = JSON.stringify({
		  "jsonrpc": "2.0",
		  "method": "query",
		  "params": {
		    "type": 1,
		    "chaincodeID": {
		      "name": "7a4fa3cb79ea47991ea0b471b9c02c0a17502050906529a7715b15cfab1e0296d76c04f9fc9652e12ec18c9625fa8eafdfc0fbf40ff09cf072bc3ebb0bbc3499"
		    },
		    "ctorMsg": {
		      "function": "read",
		      "args": [
		        $scope.dispatchOrderId
		        ]
		    },
		    "secureContext": "test_user0"
		  },
		  "id": 3   
    }); 

    console.log(parameter);

	$http.get('data/contractHistoryResponse.json').success(function(reponse){
		console.log(reponse);
		
		$scope.contractHisory = JSON.parse(reponse.result.message);
		console.log($scope.contractHisory);
	});

	$http.post('http://localhost:7050/chaincode',parameter).success(function(response) {
		console.log(reponse);
		$scope.dispatchOrderDetails = JSON.parse(reponse.result.message);
		console.log($scope.dispatchOrderDetails);
	});

	$scope.uploadFile = function openfile(files) { 
  var input = document.getElementById("files").files;
  console.log(input);
  var fileData = new Blob([input[0]]);
  var reader = new FileReader();
  reader.readAsArrayBuffer(fileData);

  reader.onload = function(){
      var arrayBuffer = reader.result;
      var bytes = new Uint8Array(arrayBuffer);      
      var result = "";
      for(var i = 0; i < bytes.length; i++){
        result+= (String.fromCharCode(bytes[i]));
      };         
      var parameter = JSON.stringify({"jsonrpc": "2.0",
        "method": "invoke",
        "params": {
          "chaincodeID": {
            "name": "94b82bfc9b1eced38a9a3f489fcbc6735cdc27d83ba09edac0d941a5b22b7820f92868e2a4b81cd7d59504565b8d650afa1b974f5819f7eb1b99a9e9e03e44e3"
          },
          "ctorMsg": {
            "function": "write",
            "args": [
              "hello_world",
               result
            ]
          },
          "secureContext": "test_user0"
        },
        "id": "2"
      });

      console.log(result);


    }
  }; 
	
}]);

pilotApp.controller('createOrderController',['$scope', '$location', '$http',function($scope,$location,$http){

	$scope.order ={};
	$scope.submitOrder = function(order) {
	var t = new Date();	
	var n = t.toISOString();
    var parameter = JSON.stringify({
	  "jsonrpc": "2.0",
	  "method": "invoke",
	  "params": {
	    "type": 1,
	    "chaincodeID": {
	      "name": "7a4fa3cb79ea47991ea0b471b9c02c0a17502050906529a7715b15cfab1e0296d76c04f9fc9652e12ec18c9625fa8eafdfc0fbf40ff09cf072bc3ebb0bbc3499"
	    },
	    "ctorMsg": {	    	
	      "function": "createDispatchOrder",
	      "args": [
	        order.orderId,"0",order.destination,"","Bosch","",order.asn,order.source,order.shipmentType,order.orderType,order.deliveryterm,order.dispatchDate,"","","","","",order.quantity,order.partNumber,order.partName,order.orderRef,n,"","","","","","","","","Order Created"
	      ]
	    },
	    "secureContext": "test_user0"
	  },
	  "id": 3
	}); 
	console.log(parameter);
	console.log(order);
	$http.post('http://localhost:7050/chaincode',parameter)
        .then(function(response) {
            $scope.message = response.data;
            var url = "/orderList";
			$location.path(url);
			console.log($scope.message);
        });	
	};

}]);

