angular.module('pilotApp').controller('voucherDetailsController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', 'myutils', 'para', '$mdSidenav',function($scope, $http, $location, $routeParams, $rootScope,myutils, para,$mdSidenav) {

	$scope.voucherId = $routeParams.id;
	$scope.voucherDetails = {};

	myutils.showWait();	

	var arg = ["voucher" , $scope.voucherId];

	console.log(arg);
	$scope.param = para.myFunc("query","getVouchers",arg);

	setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;			

				var voucher = JSON.parse(message);
				$scope.voucherDetails = voucher[0];
				console.log($scope.voucherDetails);
		        myutils.hideWait();	
			});
	},1000);

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

}]);