angular.module('appModule').component('pokeList', {
	
	templateUrl : "app/appModule/pokeList.component.html",
	//inject service I created into controller function
	controller : function(pokeService) {
		
		var vm = this;
		
		vm.pokemons = [];
		
		vm.errors = [];
		
		vm.pokemons;
		//Component functions calls Service's request (to server)
		vm.getAllPokes = function() {
			//returns response object containing data
			var res = pokeService.index();
			res.then(function(res){
				console.log(res.data);
				vm.pokemons = res.data;
			})
		}
		
		vm.getAllPokes();
		
		vm.addPoke = function(poke) {
			var res = pokeService.create(poke);
			res.then(function(res) {
				console.log(res);
				console.log(res.data);
				vm.pokemons.push(res.data);
				vm.pokemons = vm.getAllPokes();
			})
			.catch(function(err){
				////////
			})
		};
		
		vm.selectedType = 'all';
		
		vm.types = [
			  'all',
			  'normal',
			  'poison',
			  'water',
			  'fighting',
			  'fire',
			  'bug',
			  'flying',
			  'electric',
			  'ground',
			  'rock',
			  'psychic',
			  'ghost',
			  'dragon'
			];

	},
	//Allows controller to be known as 'vm' outside of a local variable
	controllerAs: 'vm'
});