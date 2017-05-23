angular.module('pilotApp').controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams','userinfo','para' , function($scope, $http, $location, $routeParams, userinfo,para) {

	$scope.dispatchOrderId = $routeParams.id;
	$scope.user = userinfo.userData();
	$scope.dispatchOrderDetails = {};
	$scope.contractHisory = {};


	function refresh(){

		var arg = [$scope.dispatchOrderId];
		var arg2 = ["transaction",$scope.dispatchOrderId];	      

    	var param = para.myFunc("query","read",$scope.user,arg); 
    	var param2 = para.myFunc("query","getHistory",$scope.user,arg2)         
    

		$http.post($scope.user.url,param2).success(function(reponse){
		$scope.contractHisory = JSON.parse(reponse.result.message);
		console.log($scope.contractHisory);
		});

		$http.post($scope.user.url,param).success(function(reponse){
		$scope.dispatchOrderDetails = JSON.parse(reponse.result.message);
		console.log($scope.dispatchOrderDetails);
		});
		
	}

	function update(){

		var arg = [$scope.dispatchOrderDetails.dispatchOrderId,$scope.dispatchOrderDetails.stage,$scope.dispatchOrderDetails.customer,$scope.dispatchOrderDetails.transporter,$scope.dispatchOrderDetails.seller,$scope.dispatchOrderDetails.assetIDs,$scope.dispatchOrderDetails.asnNumber,$scope.dispatchOrderDetails.source,$scope.dispatchOrderDetails.shipmentType,$scope.dispatchOrderDetails.contractType,$scope.dispatchOrderDetails.deliveryTerm,$scope.dispatchOrderDetails.dispatchDate,$scope.dispatchOrderDetails.transporterRef,$scope.dispatchOrderDetails.loadingType,$scope.dispatchOrderDetails.vehicleType,$scope.dispatchOrderDetails.weight,$scope.dispatchOrderDetails.consignment,$scope.dispatchOrderDetails.quantity,$scope.dispatchOrderDetails.partNumber,$scope.dispatchOrderDetails.partName,$scope.dispatchOrderDetails.orderRefNum,$scope.dispatchOrderDetails.createdOn,$scope.dispatchOrderDetails.documentID1,$scope.dispatchOrderDetails.documentID2,$scope.dispatchOrderDetails.documentID3,$scope.dispatchOrderDetails.documentID4,$scope.dispatchOrderDetails.dropDescription,$scope.dispatchOrderDetails.deliverydescription,$scope.dispatchOrderDetails.inTransitDisptachOfficerSigned,$scope.dispatchOrderDetails.inTransitTransporterSigned,$scope.dispatchOrderDetails.transactionDescription];
		var param = para.myFunc("invoke","updateDispatchOrder",$scope.user,arg);
		$http.post($scope.user.url,param).success(function(reponse){
			console.log($scope.param);			
		});

	}


	refresh();    

	$scope.upFile = function (id,field){ 
		  console.log(id);
		  var input = document.getElementById(id).files;
		  console.log(input);
		  var fileName = input[0].name;
		  var fileType = input[0].type;
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
		      var arg = [$scope.dispatchOrderId + id,fileName,fileType,result];

		      var parameter2 = para.myFunc("invoke","createDocument",$scope.user,arg);         

		     console.log(parameter2);

		     $scope.dispatchOrderDetails.documentID1 = $scope.dispatchOrderId + id;
		     $scope.dispatchOrderDetails.transactionDescription = id + " Uploaded";

		     

	        $http.post($scope.user.url,parameter2).success(function(response) {
            	update();

		     	refresh();
      		});

		    }
		  }


	$scope.downFile = function(){

			var arg = ["document",$scope.dispatchOrderDetails.documentID1];

			var parameter3 = para.myFunc("query","getDocuments",$scope.user,arg);

			console.log(parameter3);
			$http.post($scope.user.url,parameter3).success(function(response) {
            console.log(response);
                  
            var result = response.result.message;
            var result2 = JSON.parse(result); 
            var result3 = result2[0].documentString;


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

		}  
		
}]);