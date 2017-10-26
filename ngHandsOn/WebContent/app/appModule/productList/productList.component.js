angular.module('appModule').component('productList', {
	templateUrl : "app/appModule/productList/productList.component.html",
	controller : function(productService) {
		//Storing reference to this component
		var vm = this;
		//assigning it as property of the shared component obj
		vm.list = [];
		
		//This component's list set to the data in Service
		vm.list = productService.index();
		//Function that when called returns number of items in list
		vm.getLengthOfList = function() {
			return vm.list.length;
		}
		//Click behavior that takes a string and prints when called
		vm.clickLog = function(str) {
			console.log(str);
		}
		
		vm.addToList = function(item) {
			var copy = angular.copy(item);
			console.log(copy);
			vm.list.push(copy);
		}
		
		vm.addProduct = function(product) {
			var copy = angular.copy(product);
			productService.create(copy);
			vm.products = productService.index();
		}
	},
	controllerAs: 'vm'
});