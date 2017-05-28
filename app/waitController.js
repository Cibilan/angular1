angular.module('pilotApp').controller('waitCtrl',['$mdDialog', '$rootScope', function($mdDialog, $rootScope){
	
	var vm = this;     
	        
	$rootScope.$on("hide_wait", function (event, args) {
		$mdDialog.cancel();
	});    

}]);