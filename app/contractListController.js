angular.module('pilotApp').controller('contractListController', ['$scope', '$http' , '$location','para', '$rootScope','myutils' ,function($scope, $http, $location, para, $rootScope,myutils) {

	$scope.gridOptions = {
            data: [],
            urlSync: false
        };

    var arg = [""];


    if($rootScope.userName == 'test_user0' || $rootScope.userName == 'test_user1'){
    	$scope.show = true;
    	console.log($scope.show);
    }

    myutils.showWait();	

    $scope.param = para.myFunc("query","getAllDispatchOrdersLatest",arg);
    
    setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;
				var message1 = message.split("}{").join("},{");
				var message2 = "[" + message1 + "]";
				console.log(message2);
				$scope.gridOptions.data = JSON.parse(message2);
		        myutils.hideWait();	
			});
	},1000);			

	$scope.goPath = function(path){
		var url = "/contractDetails/" + path;
	  	$location.path(url);
	}

	$scope.reload = function(){
		console.log("reload");
		 myutils.showWait();		
		setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;
				var message1 = message.split("}{").join("},{");
				var message2 = "[" + message1 + "]";
				console.log(message2);
				$scope.gridOptions.data = JSON.parse(message2);
		        myutils.hideWait();	
			});
		},1000);	
	}
	
}]);