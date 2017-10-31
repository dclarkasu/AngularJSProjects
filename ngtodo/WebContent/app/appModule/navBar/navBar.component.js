angular.module('appModule').component('navBar', {
	templateUrl : 'app/appModule/navBar/navBar.component.html',
	controller : function(authService) {
		var vm = this;
		
		vm.checkLogin = function() {
			if (authService.getToken().id) {
				return true;
			}
			return false;
		}
		
	},
	controllerAs: 'vm'
});