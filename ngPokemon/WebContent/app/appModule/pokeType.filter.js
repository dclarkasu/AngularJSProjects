angular.module('appModule')
	.filter('pokeType', function() {
		return function(pokemons, type) {
			if (type === 'all' || !type) {
				return pokemons;
			}
			var results = [];
			//Iterate over all the pokemons and their types array within
			pokemons.forEach(function(val) {
				val.types.forEach(function(pokeType) {
					if (pokeType.name === type) {
						results.push(val);//push the whole pokemon obj
					}
				})
			})
			return results;
		}
	});