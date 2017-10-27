angular.module('appModule')
	.filter('incomplete', function(){
		return function(todos, completion) {
			if (completion === true) {
				return todos;
			}
			var incompleteTodos = [];
			
			todos.forEach(function(val) {
				if (val.completed === false) {
					incompleteTodos.push(val);
				}
			})
			return incompleteTodos;
		}
	});
