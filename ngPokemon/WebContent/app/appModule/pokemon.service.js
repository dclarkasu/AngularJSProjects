angular.module('appModule').factory('pokeService', function($http) {//$http must be injected into function to make requests
	var service = {};
	var BASE_URL = "http://52.25.225.137:8080/pokemon/data/poke";
	
	service.index = function() {
		return $http ({
			method : 'GET',
			url : BASE_URL + '?sorted=true'
		})
	};
	
	service.create = function(poke) {
		return $http ({
			method : 'POST',
			url : BASE_URL,
			//headers property gets assigned an object with a key-value pair. ContentType is key, value is obj type
			headers : {
				'Content-Type' : 'application/json'
			},
			data : poke
		})
	};
	return service;
});