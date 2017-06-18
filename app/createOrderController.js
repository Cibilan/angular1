angular.module('pilotApp').controller('createOrderController',['$scope', '$location', '$http', '$rootScope' ,'para','myutils', '$mdSidenav',function($scope,$location,$http,$rootScope,para,myutils,$mdSidenav){

	$scope.order ={};
	console.log($rootScope.userName);
	$scope.submitOrder = function(order) {

	myutils.showWait();	
	var t = new Date();	
	var n = t.toISOString();

	var arg = [order.orderId,"0",order.destination,"","Bosch","",order.asn,order.source,order.shipmentType,order.orderType,order.deliveryterm,order.dispatchDate,"","","","","",order.quantity,order.partNumber,order.partName,order.orderRef,n,"","","","","","","","","Order Created"];


    $scope.param = para.myFunc("invoke","createDispatchOrder", arg);  

     console.log($scope.param);    
	$http.post($rootScope.url,$scope.param)
        .then(function(response) {
            $scope.message = response.data;
            var url = "/orderList";			
			console.log($scope.message);

			setTimeout(function(){
		        $scope.message = "Order getting created";
		        myutils.hideWait();
		        $location.path(url);
	      	},4000);
        });	
	};

	$scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

}]);