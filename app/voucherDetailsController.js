angular.module('pilotApp').controller('voucherDetailsController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', 'myutils', 'para', '$mdSidenav',function($scope, $http, $location, $routeParams, $rootScope,myutils, para,$mdSidenav) {

	$scope.voucherId = $routeParams.id;
	$scope.voucherDetails = {};
	$scope.approve = false;
	$scope.approved = false;
	$scope.finance = false;

	myutils.showWait();	

	function refresh(){

		var arg = ["voucher" , $scope.voucherId];

	console.log(arg);
	$scope.param = para.myFunc("query","getVouchers",arg);

	setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				$scope.approve = false;
				$scope.approved = false;
				$scope.finance = false;
				console.log(reponse);
				var message = reponse.result.message;			

				var voucher = JSON.parse(message);
				$scope.voucherDetails = voucher[0];
				console.log($scope.voucherDetails);
				if($rootScope.userName == 'test_user0' || $rootScope.userName == 'bosch_finance'){
					$scope.finance = true;
				}
				if($scope.voucherDetails.stage == "8"){
					$scope.approve = true;
				}
				else{
					$scope.approved = true;
				}
		        myutils.hideWait();	
			});
	},1000);
	}

	refresh();
	$scope.downFile = function(field){

			var name = $scope.voucherDetails[field]; 

			var arg = ["document",name];

			var parameter3 = para.myFunc("query","getDocuments",arg);


			$http.post($rootScope.url,parameter3).success(function(response) {

                  
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

	$scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

    $scope.approvefun = function(){
    	myutils.showWait();	
    	var arg = [$scope.voucherDetails.voucherOrderID, $scope.voucherDetails.dispatchOrderId ,$scope.voucherDetails.stage,$scope.voucherDetails.customer,$scope.voucherDetails.transporter,$scope.voucherDetails.seller,$scope.voucherDetails.assetIDs,$scope.voucherDetails.asnNumber,$scope.voucherDetails.source,$scope.voucherDetails.shipmentType,$scope.voucherDetails.contractType,$scope.voucherDetails.deliveryTerm,$scope.voucherDetails.dispatchDate,$scope.voucherDetails.transporterRef,$scope.voucherDetails.loadingType,$scope.voucherDetails.vehicleType,$scope.voucherDetails.weight,$scope.voucherDetails.consignment,$scope.voucherDetails.quantity,$scope.voucherDetails.partNumber,$scope.voucherDetails.partName , $scope.voucherDetails.orderRefNum, $scope.voucherDetails.createdOn, $scope.voucherDetails.documentID1, $scope.voucherDetails.documentID2, $scope.voucherDetails.documentID3, $scope.voucherDetails.documentID4, $scope.voucherDetails.dropDescription , $scope.voucherDetails.deliverydescription , $scope.voucherDetails.inTransitDisptachOfficerSigned , $scope.voucherDetails.inTransitTransporterSigned , $scope.voucherDetails.transactionDescription , $scope.voucherDetails.timeStamp , $scope.voucherDetails.amount];
    	$scope.param1 = para.myFunc("invoke","updateVoucher",arg);
    		setTimeout(function(){       
			$http.post($rootScope.url,$scope.param1).success(function(reponse){
				refresh();
			});
		},1000);

    }

    $scope.reload = function(){
    	myutils.showWait();
    	refresh();
    }

}]);