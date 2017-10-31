angular.module('authModule').component('logout', {
	templateUrl : "app/authModule/logout/logout.component.html",
	controller : function(authService, $location) {
		var vm = this;
		
		//Behaviors
		
		vm.logout = function(user) {
			authService.logout()
			.then(function(res) {
				$location.path('/')
			})
		}
	},
	controllerAs: 'vm'
});