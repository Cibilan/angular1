var pilotApp = angular.module('pilotApp', ['ngRoute','dataGrid','pagination','ngMaterial', 'ngMessages','md-steppers']);


pilotApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  $mdThemingProvider.theme('grey').backgroundPalette('grey');
  $mdThemingProvider.theme('orange').backgroundPalette('orange');
  $mdThemingProvider.theme('purple').backgroundPalette('deep-purple');
  $mdThemingProvider.theme('blue').backgroundPalette('blue');
});


pilotApp.config(['$routeProvider', function($routeProvider){
	
	$routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'
		})
		.when('/orderList', {
			resolve:{
				"check":function($location,$rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/login');
					}
				}	
			},
			templateUrl: 'views/contractList.html',
			controller: 'contractListController'
		})
		.when('/contractDetails/:id', {
			resolve:{
				"check":function($location,$rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/login');
					}
				}	
			},
			templateUrl: 'views/contractDetails.html',
			controller: 'contractDetailsController'
		})
		.when('/createOrder', {
			resolve:{
				"check":function($location,$rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/login');
					}
				}	
			},
			templateUrl: 'views/createOrder.html',
			controller: 'createOrderController'
		})
		.when('/voucherList',{
			resolve:{
				"check":function($location,$rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/login');
					}
				}	
			},
			templateUrl: 'views/voucherList.html',
			controller: 'voucherListController'			
		})
		.when('/voucherDetails/:id',{
			resolve:{
				"check":function($location,$rootScope){
					if(!$rootScope.loggedIn){
						$location.path('/login');
					}
				}	
			},
			templateUrl: 'views/voucherDetails.html',
			controller: 'voucherDetailsController'			
		})
		.otherwise({
			redirectTo: '/login'
		});
}]);

pilotApp.service('para',function($rootScope){
	this.myFunc = function(type,func,arg){
	return JSON.stringify({
		  "jsonrpc": "2.0",
		  "method": type,
		  "params": {
		    "type": 1,
		    "chaincodeID": {
		      "name": $rootScope.cc
		    },
		    "ctorMsg": {
		      "function": func,
		      "args": arg
		    },
		    "secureContext": $rootScope.userName,
		    "metadata" : $rootScope.callerMeta
		  },
		  "id": 3   
    	});
	}
});

pilotApp.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});


pilotApp.service('myutils',['$mdDialog', '$rootScope', function($mdDialog,  $rootScope){

return {
  hideWait: hideWait,
  showWait: showWait
}
     
function hideWait(){
  $mdDialog.cancel();
}
      
function showWait(){
  $mdDialog.show({
  template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' +
            '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
            '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
            '<p> {{message}} </p>' +
            '</div>' +
            '</md-dialog>',
  parent: angular.element(document.body),
  clickOutsideToClose:false,
  fullscreen: false
  });
}

}]);

pilotApp.controller('mainController', ['$scope' , function($scope) {


}]);

pilotApp.controller('assetListController', ['$scope', '$http', function($scope, $http) {

	$http.get('data/assestListResponse.json').success(function(reponse){
		console.log(reponse);
		$scope.assetList = JSON.parse(reponse.result.message);
		console.log($scope.assetList);
	});

}]);