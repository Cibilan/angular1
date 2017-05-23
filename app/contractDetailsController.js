angular.module('pilotApp').controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams','userinfo','para' , function($scope, $http, $location, $routeParams, userinfo,para) {

	$scope.dispatchOrderId = $routeParams.id;
	$scope.user = userinfo.userData();
	$scope.dispatchOrderDetails = {};


    var arg = [$scope.dispatchOrderId];	      

    $scope.param = para.myFunc("query","read",$scope.user,arg);
           
    

	$http.get('data/contractHistoryResponse.json').success(function(reponse){
		
		$scope.contractHisory = JSON.parse(reponse.result.message);
		console.log($scope.contractHisory);
	});

	$http.post($scope.user.url,$scope.param).success(function(reponse){
		$scope.dispatchOrderDetails = JSON.parse(reponse.result.message);
	});

	$scope.uploadFile = function openfile(id) { 
			console.log(id);
		  var input = document.getElementById(id).files;
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
		      var parameter2 = JSON.stringify({"jsonrpc": "2.0",
		        "method": "invoke",
		        "params": {
		          "chaincodeID": {
		            "name": $scope.user.cc
		          },
		          "ctorMsg": {
		            "function": "createDocument",
		            "args": [
		              "DOC001",
		              "invoice",
		              "pdf",
		               result
		            ]
		          },
		          "secureContext": $scope.user.userName
		        },
		        "id": "2"
		      });

		      console.log(parameter2);

	        $http.post('http://localhost:7050/chaincode',parameter2).success(function(response) {
            	console.log($scope.dispatchOrderDetails);
      		}); 

		    }
		  };


	$scope.downFile = function(){

		console.log("Hellow");

			var parameter3 = JSON.stringify({
				  "jsonrpc": "2.0",
				  "method": "query",
				  "params": {
				    "type": 1,
				    "chaincodeID": {
				      "name": $scope.user.cc
				    },
				    "ctorMsg": {
				      "function": "getDocuments",
				      "args": [
				        "document"
				        ]
				    },
				    "secureContext": $scope.user.userName
				  },
				  "id": 3
				}
				);
			console.log(parameter3);
			$http.post('http://localhost:7050/chaincode',parameter3).success(function(response) {
            console.log(response);
            var result = "" ;         
            result = response.result.message;
            result2 = JSON.parse(result);
            console.log(result2);
            result3 = result2[0].documentString;


            console.log(result3);
		      var arr=[];
		      for(var i=0; i<result3.length; i++) {
		            arr.push(result3.charCodeAt(i))
		        }
		      var arr2 = new Uint8Array(arr); 

		      var fileName = "teset.pdf";
		            var a = document.createElement("a");
		            document.body.appendChild(a);
		            var fileout = new Blob([arr2], {type: 'application/pdf'});
		            var fileURL = window.URL.createObjectURL(fileout);
		            a.href = fileURL;
		            a.download = fileName;
		            a.click();
		      	});	

		};  
		
}]);