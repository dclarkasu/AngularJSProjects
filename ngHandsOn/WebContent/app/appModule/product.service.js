angular.module('appModule').factory('productService', function() {
	//Service object which must be returned
	var service = {};
	
	var products = [
		{
		    name : 'Oh, The Places You\'ll Go!',
		    price : 11.39,
		    imgUrl : 'https://images-na.ssl-images-amazon.com/images/I/518eq5NjZkL._SY160_.jpg',
		    rating : 5
		  },
		  {
		    name : 'The Giving Tree',
		    price : 8.31,
		    imgUrl : 'https://images-na.ssl-images-amazon.com/images/I/51XKHozHPEL._SY160_.jpg',
		    rating : 4
		  },
		  {
		    name : 'Pete the Cat: Big Easter Adventure',
		    price : 7.29,
		    imgUrl : 'https://images-na.ssl-images-amazon.com/images/I/61VqwEXgCdL._AC_US218_.jpg',
		    rating : 4
		  },
		  {
		    name : 'Harry Potter and the Chamber of Secrets',
		    price : 8.99,
		    imgUrl : 'https://images-na.ssl-images-amazon.com/images/I/51PFoq3WlaL._AC_US218_.jpg',
		    rating : 5
		  }
	];
	//publicly visible functions for private/locally visible objects (products)
	service.index = function() {
		return products;
	}
	
	service.create = function(product) {
		products.push(product);
	}
	
	return service;
})