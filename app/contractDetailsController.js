angular.module('pilotApp').controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams' , function($scope, $http, $location, $routeParams) {

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