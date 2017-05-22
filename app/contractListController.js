angular.module('pilotApp').controller('contractListController', ['$scope', '$http' , '$location', function($scope, $http, $location) {

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