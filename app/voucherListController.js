angular.module('pilotApp').controller('voucherListController', ['$scope', '$http' , '$location','para', '$rootScope','myutils' ,function($scope, $http, $location, para, $rootScope,myutils) {

	$scope.gridOptions = {
            data: [],
            urlSync: false
        };

    var arg = ["voucher"];

    myutils.showWait();	

    $scope.param = para.myFunc("query","getVouchers",arg);
    
    setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;
				console.log(message);

				$scope.gridOptions.data = JSON.parse(message);
				
		        myutils.hideWait();	
			});
	},1000);			

	$scope.goPath = function(path){
		var url = "/voucherDetails/" + path;
	  	$location.path(url);
	}

	$scope.reload = function(){
		console.log("reload");
		 myutils.showWait();		
		setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;
				console.log(message);
				$scope.gridOptions.data = JSON.parse(message);
		        myutils.hideWait();	
			});
		},1000);	
	}
	
}]);