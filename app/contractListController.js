angular.module('pilotApp').controller('contractListController', ['$scope', '$http' , '$location','para', '$rootScope','myutils', '$mdSidenav' ,function($scope, $http, $location, para, $rootScope,myutils,$mdSidenav) {

	$scope.gridOptions = {
            data: [],
            urlSync: false
        };

    var arg = [""];


    myutils.showWait();	

    if($rootScope.userName == 'test_user0' || $rootScope.userName == 'bosch_planner'){
     	$scope.show = true;
     	console.log($scope.show);
    }

    $scope.param = para.myFunc("query","getAllDispatchOrdersLatest",arg);
    
    setTimeout(function(){       
			$http.post($rootScope.url,$scope.param).success(function(reponse){
				console.log(reponse);
				var message = reponse.result.message;
				var message1 = message.split("}{").join("},{");
				var message2 = "[" + message1 + "]";
				console.log(message2);
				if($rootScope.userName == 'ksh_transport'){
					console.log("if works")
					orderList = JSON.parse(message2);
					angular.forEach(orderList, function(list){
						console.log("loop wprs")
						if((list.stage != "0") && (list.stage !="1")){
							console.log("if works")
							$scope.gridOptions.data.push(list);	
						}
					})	
				}
				else{
				$scope.gridOptions.data = JSON.parse(message2);
				}
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

	$scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

	
}]);