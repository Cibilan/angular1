angular.module('pilotApp').controller('contractDetailsController', ['$scope', '$http', '$location', '$routeParams','userinfo','para','myutils' , function($scope, $http, $location, $routeParams, userinfo,para,myutils) {

	$scope.dispatchOrderId = $routeParams.id;
	$scope.user = userinfo.userData();
	$scope.dispatchOrderDetails = {};
	$scope.contractHisory = {};
	$scope.selected = [];
	$scope.openAssetList = [];
	$scope.show = {};
	$scope.stepper = {};

	$scope.stepper.step1Completed = true;
	$scope.stepper.step1Disabled = false;


	function refresh(){

		var arg = [$scope.dispatchOrderId];
		var arg2 = ["transaction",$scope.dispatchOrderId];	      

    	var param = para.myFunc("query","read",$scope.user,arg); 
    	var param2 = para.myFunc("query","getHistory",$scope.user,arg2);         
    
    	$scope.show = {
    		asset : false,
    		transporter : false,
    		confirmArrival : false,
    		documentUpload : false,
    		updocumentID1 : false,
    		downdocumentID1 : false,
    		updocumentID2 : false,
    		downdocumentID2 : false,
    		updocumentID3 : false,
    		downdocumentID3 : false,
    		updocumentID4 : false,
    		downdocumentID4 : false,
    		goodsLoad : false,
    		goodsReceived : false,
    		goodsDelivered : false
    	};

    	console.log($scope.show);


    	setTimeout(function(){	

			$http.post($scope.user.url,param2).success(function(reponse){
			$scope.contractHisory = JSON.parse(reponse.result.message);
			console.log($scope.contractHisory);
			});

			$http.post($scope.user.url,param).success(function(reponse){
			$scope.dispatchOrderDetails = JSON.parse(reponse.result.message);
			console.log($scope.dispatchOrderDetails);
			
			//Dispatch Officer			
			if($scope.user.userName == 'test_user0'){
				if($scope.dispatchOrderDetails.stage == "0"){
					$scope.show.asset = true;
				}
				else if($scope.dispatchOrderDetails.transporter == "" && $scope.dispatchOrderDetails.stage == "1"){
					$scope.show.transporter = true;
				}
				else if($scope.dispatchOrderDetails.transporter != "" && $scope.dispatchOrderDetails.stage == "1"){
					$scope.show.confirmArrival = true;
				}
				else if ($scope.dispatchOrderDetails.stage == "2"){

					$scope.show.documentUpload = true;
					$scope.show.readyShip = true;

					if($scope.dispatchOrderDetails.documentID1 == ""){
						$scope.show.updocumentID1 = true;
					}
					else{
						$scope.show.downdocumentID1 = true;
					}

					if($scope.dispatchOrderDetails.documentID2 == ""){
						$scope.show.updocumentID2 = true;
					}
					else{
						$scope.show.downdocumentID2 = true;
					}

					if($scope.dispatchOrderDetails.documentID3 == ""){
						$scope.show.updocumentID3 = true;
					}
					else{
						$scope.show.downdocumentID3 = true;
					}

					if($scope.dispatchOrderDetails.documentID4 == ""){
						$scope.show.updocumentID4 = true;
					}
					else{
						$scope.show.downdocumentID4 = true;
					}
				}
				else if($scope.dispatchOrderDetails.stage == "3"){
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;
					$scope.show.goodsLoad = true;	
					$scope.show.goodsReceived = true;
				}
				else if($scope.dispatchOrderDetails.stage == "4"){
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;						
					$scope.show.goodsDelivered = true;	
				}
				else{
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;
				}
			}

						//Planner	
			if($scope.user.userName == 'test_user1'){
				$scope.show.documentUpload = true;
				$scope.show.downdocumentID1 = true;
				$scope.show.downdocumentID2 = true;
				$scope.show.downdocumentID3 = true;
				$scope.show.downdocumentID4 = true;	

			}

			//Transporter
			if($scope.user.userName == 'test_user2'){
				if($scope.dispatchOrderDetails.stage == "4"){
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;
					$scope.show.goodsDelivered = true;
					$scope.show.goodsReceived = true;	
				}	

			}

			//Buyer
			if($scope.user.userName == 'test_user3'){
				if($scope.dispatchOrderDetails.stage == "4"){
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;
					$scope.show.goodsDelivered = true;
				}
				if($scope.dispatchOrderDetails.stage == "5"){
					$scope.show.documentUpload = true;
					$scope.show.downdocumentID1 = true;
					$scope.show.downdocumentID2 = true;
					$scope.show.downdocumentID3 = true;
					$scope.show.downdocumentID4 = true;
				}
			}	
			console.log($scope.show);

		});

		myutils.hideWait();	

	},4000);


	
}

	function update(){

		myutils.showWait();
		var arg = [$scope.dispatchOrderDetails.dispatchOrderId,$scope.dispatchOrderDetails.stage,$scope.dispatchOrderDetails.customer,$scope.dispatchOrderDetails.transporter,$scope.dispatchOrderDetails.seller,$scope.dispatchOrderDetails.assetIDs,$scope.dispatchOrderDetails.asnNumber,$scope.dispatchOrderDetails.source,$scope.dispatchOrderDetails.shipmentType,$scope.dispatchOrderDetails.contractType,$scope.dispatchOrderDetails.deliveryTerm,$scope.dispatchOrderDetails.dispatchDate,$scope.dispatchOrderDetails.transporterRef,$scope.dispatchOrderDetails.loadingType,$scope.dispatchOrderDetails.vehicleType,$scope.dispatchOrderDetails.weight,$scope.dispatchOrderDetails.consignment,$scope.dispatchOrderDetails.quantity,$scope.dispatchOrderDetails.partNumber,$scope.dispatchOrderDetails.partName,$scope.dispatchOrderDetails.orderRefNum,$scope.dispatchOrderDetails.createdOn,$scope.dispatchOrderDetails.documentID1,$scope.dispatchOrderDetails.documentID2,$scope.dispatchOrderDetails.documentID3,$scope.dispatchOrderDetails.documentID4,$scope.dispatchOrderDetails.dropDescription,$scope.dispatchOrderDetails.deliverydescription,$scope.dispatchOrderDetails.inTransitDisptachOfficerSigned,$scope.dispatchOrderDetails.inTransitTransporterSigned,$scope.dispatchOrderDetails.transactionDescription];
		var param = para.myFunc("invoke","updateDispatchOrder",$scope.user,arg);

		setTimeout(function(){
		    $http.post($scope.user.url,param).success(function(reponse){
			console.log($scope.param);
			refresh();			
			});
	      	},4000);		

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
		      var arg = [$scope.dispatchOrderId+id,fileName,fileType,result];

		      var parameter2 = para.myFunc("invoke","createDocument",$scope.user,arg);         

		     console.log(parameter2);	     

	        $http.post($scope.user.url,parameter2).then(function(response) {
			   	$scope.dispatchOrderDetails[field] = $scope.dispatchOrderId + id;
		     	$scope.dispatchOrderDetails.transactionDescription = id + " Uploaded";	
            	update();
      		});

		    }
		  }


	$scope.downFile = function(field){

			var name = $scope.dispatchOrderDetails[field]; 

			var arg = ["document",name];

			var parameter3 = para.myFunc("query","getDocuments",$scope.user,arg);

			console.log(parameter3);
			$http.post($scope.user.url,parameter3).success(function(response) {
            console.log(response);
                  
            var result = response.result.message;
            var result2 = JSON.parse(result); 
            var result3 = result2[0].documentString;
            var name = result2[0].documentName;


		      var arr=[];
		      for(var i=0; i<result3.length; i++) {
		            arr.push(result3.charCodeAt(i))
		        }
		      var arr2 = new Uint8Array(arr); 

		      var fileName = name;
		            var a = document.createElement("a");
		            document.body.appendChild(a);
		            var fileout = new Blob([arr2], {type: 'application/pdf'});
		            var fileURL = window.URL.createObjectURL(fileout);
		            a.href = fileURL;
		            a.download = fileName;
		            a.click();
		      	});	

		}

	$scope.readyShip = function(){
		
		$scope.dispatchOrderDetails.transactionDescription = "Ready for shipment";
		$scope.dispatchOrderDetails.stage = "3";
		update();
	}	

	$scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        $scope.assetList = JSON.parse($scope.content);
        console.log($scope.content );
    }	

	$scope.createAsset = function() {
				

		for (var i = 0; i < $scope.assetList.length; i++) {

			var asset = $scope.assetList[i];
			var arg = [asset.assetId,asset.partNumber,asset.partDescription,asset.owner,asset.stage,asset.batchNumer,asset.manufactureDate,asset.itchs,asset.exciseChaperNumber,asset.orderId];
			var param = para.myFunc("invoke","createAsset",$scope.user,arg);
			console.log(param);

			$http.post($scope.user.url,param).then(function(response) { 	
			
        		console.log(asset.assetId);

  			});


		}
    		
			
		$scope.dispatchOrderDetails.transactionDescription = "Asset Created";		     

		update();	                	
      	
	}

	$scope.getAsset = function (){

		$scope.openAssetList = [];

		var arg = ["asset"];
		var param = para.myFunc("query","getAssets",$scope.user,arg);
		console.log(param);
		$http.post($scope.user.url,param).success(function(reponse){
			$scope.getAssetList = JSON.parse(reponse.result.message);
			console.log($scope.getAssetList);
			angular.forEach($scope.getAssetList, function(openAsset){
				if(openAsset.stage == "Open"){
					$scope.openAssetList.push(openAsset);	
				}
			})
			console.log($scope.openAssetList);	
		});

	}

	$scope.exist = function(openAsset){

		return $scope.selected.indexOf(openAsset.assetId) > -1;

	}

	$scope.toggleSelection = function (openAsset){

		var idx = $scope.selected.indexOf(openAsset.assetId);
		if (idx > -1){
			$scope.selected.splice(idx,1);
		}
		else{
			$scope.selected.push(openAsset.assetId);
		} 
	}

	$scope.checkAll = function(){
		if ($scope.selectAll) {
			angular.forEach($scope.openAssetList, function(openAsset){
				idx = $scope.selected.indexOf(openAsset.assetId);
				if (idx >= 0 ){
					return true;
				}
				else {
					$scope.selected.push(openAsset.assetId);
				}
			});
		}
		else {
			$scope.selected = [];
		}
	}

	$scope.mapAsset = function() {
			
		var arr = $scope.selected.toString('');
		var arg = [$scope.dispatchOrderId,arr];
		
		var param = para.myFunc("invoke","mapAsset",$scope.user,arg);
		console.log(param);
		
		$http.post($scope.user.url,param).then(function(response) { 
			$scope.dispatchOrderDetails.transactionDescription = "Asset Mapped";
			$scope.dispatchOrderDetails.assetIDs = arr;   
			console.log($scope.dispatchOrderDetails); 			
           	update();

           	setTimeout(function(){
           		$scope.dispatchOrderDetails.stage = "1";
           		$scope.dispatchOrderDetails.transactionDescription = "Ready for Dispatch";
           		update();
	      	},4000);
           	
      	});
	}

	$scope.addTransporter = function(){
				
		console.log($scope.dispatchOrderDetails);
		$scope.dispatchOrderDetails.transactionDescription = "Transporter added";
		update();
	}

	$scope.transporterArrived = function(){
			
		console.log($scope.dispatchOrderDetails);
		$scope.dispatchOrderDetails.transactionDescription = "Transporter Arrived";
		$scope.dispatchOrderDetails.stage = "2";
		update();
	}

	$scope.confirmLoading = function(){
		
		console.log($scope.dispatchOrderDetails);
		$scope.dispatchOrderDetails.transactionDescription = "Goods Loaded";
		$scope.dispatchOrderDetails.inTransitDisptachOfficerSigned = "True";		
		update();

	}

	$scope.goodsLoaded = function(){
		console.log($scope.dispatchOrderDetails);
		$scope.dispatchOrderDetails.transactionDescription = "Goods Received";
		$scope.dispatchOrderDetails.inTransitTransporterSigned = "True";
		update();
				setTimeout(function(){
           		$scope.dispatchOrderDetails.stage = "4";
           		$scope.dispatchOrderDetails.transactionDescription = "In transit";
           		update();
	     },4000);
	}

	$scope.goodsdelivered = function(){
		console.log($scope.dispatchOrderDetails);
		$scope.dispatchOrderDetails.transactionDescription = "Shipment Delivered";
		$scope.dispatchOrderDetails.stage = "5";
		update();
	}
		
}]);