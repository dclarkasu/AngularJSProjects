angular.module('authModule').component('register', {
	templateUrl : "app/authModule/register/register.component.html",
	controller : function(authService, $location) {
		var vm = this;
		
		//Behaviors
		
		vm.register = function(user) {
			console.log(user);
			authService.register(user)
			.then(function(res) {
				$location.path('/todos');
			})
		}
	},
	controllerAs: 'vm'
});