//Service doesn't know anything about the DOM, aka what the component knows about. Therefore it cannot use vm or any
//of the vars and functions called in the html
//The service will be called on by the component when it requires data to display in the DOM

angular.module('appModule').factory('todoService', function($http, $filter){
	var service = {};
	
	
	service.index = function() {
		return $http ({
			method : 'GET',
			url : 'rest/users/1/todos'
		});
	}
	
	service.create = function(todo) {
		todo.completed = false;
		todo.description = '';
		return $http ({
			method : 'POST',
			url : 'rest/users/1/todos',
			headers : {
				'ContentType' : 'application/json'
			},
			data : todo
		})
	};
	
	service.update = function(id, todo) {
//		Sets completed Date property to current date/time before sending request to DB
		if (todo.completed === true) {
			todo.completeDate = $filter('date')(Date.now(), 'MM/dd/yyyy');
		} else {
			todo.completeDate = "";
		}
		return $http({
		      method : 'PUT',
		      url : 'rest/users/1/todos/' + id,
		      headers : {
		        'Content-Type' : 'application/json'
		      },
		      data : todo
		    })
	};
	
	service.destroy = function(id) {
		return $http ({
			method : 'DELETE',
			url : 'rest/users/1/todos/' + id
		})
	};
	//Must always return the object created first in the service
	return service;
})
	
//	service.destroy = function(id) {
//		//todo in forEach is the value of what's at that index, the obj. idx is the index number
//		todos.forEach(function(todo, idx) {
//			if(todo.id === id) {
//				todos.splice(idx, 1);
//				console.log("Deleted");
//			} else {
//				console.log("Not deleted");
//			}
//		});
//	}
//	service.update = function(todo) {
//		console.log(todo);
//		//Pass in the array and index so that you can do the update inside function
//		//Copy prevents dupes
//		todos.forEach(function(t, idx, arr) {
//			if(t.id === todo.id) {
//				var copy = angular.copy(todo);
//				//sets previous object to updated one
//				arr[idx] = copy;
//				console.log("Added");
//			} 
//		});
//	}