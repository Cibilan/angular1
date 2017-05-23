angular.module('pilotApp').service('para',function(){
	this.myFunc = function(){
	return JSON.stringify({
		  "jsonrpc": "2.0",
		  "method": "query",
		  "params": {
		    "type": 1,
		    "chaincodeID": {
		      "name": "$scope.user.cc"
		    },
		    "ctorMsg": {
		      "function": "read",
		      "args": [
		        "$scope.dispatchOrderId"
		        ]
		    },
		    "secureContext": "$scope.user.userName"
		  },
		  "id": 3   
    	});
	}
});