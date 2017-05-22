angular.module('pilotApp').controller('createOrderController',['$scope', '$location', '$http',function($scope,$location,$http){

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