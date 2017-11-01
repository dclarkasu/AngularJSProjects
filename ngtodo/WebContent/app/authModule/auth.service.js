angular.module('authModule')
  .factory('authService', function($http, $cookies) {
    var service = {};

    //It never matters what the values of the user are because we know their names. The cookie
    //is concerned with storing their encrypted values
    
    var saveToken = function(user) {
      // TODO : Store the user's id and email in cookies
	    	$cookies.put('id', user.id);
    		$cookies.put('email', user.email);
    }

    service.getToken = function() {
      // TODO : Return an object with id and email properties,
      // the values are the values of the cookies
    		var user = {};
    		user.id = $cookies.get('id');
    		user.email = $cookies.get('email');
    		return user;
    }
    
    //remove token service is private on purpose
    var removeToken = function() {
      // TODO : Remove both the id and email cookies
    		$cookies.remove('id');
    		$cookies.remove('email');
    }

    service.login = function(user) {
      // TODO : Use the auth/login route to authenticate the user
      // On success, use saveToken to store the users id/email
    		return $http ({
    			method : 'POST',
    			url : 'rest/auth/login',
    			headers : {
    				'ContentType' : 'application/json'
    			},
    			data : user
    		})
    		.then(function(res) {
    			saveToken(res.data);
    		})
    };

    service.register = function(user) {
      // TODO : Use the auth/register route to create and authenticate the user
      // On success, use saveToken to store the users id/email
    		return $http ({
    			method : 'POST',
    			url : 'rest/auth/register',
    			headers : {
    				'ContentType' : 'application/json'
    			},
    			data : user
    		})
    		.then(function(res) {
    			saveToken(res.data);
    			return res;//passes along response to any future callbacks using this .then()
    		})
    }

    service.logout = function() {
      // TODO : Use the auth/logout route to remove the users session
      // On success, use removeToken to remove the id and email cookies
    	
    	//Logout does not have headers or a data object like other POST methods
    		return $http ({
    			method : 'POST',
    			url : 'rest/auth/logout'
    		})
    		.then(function(res) {
    			removeToken();
    		})
    }

    return service;
  })