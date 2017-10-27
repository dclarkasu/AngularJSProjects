// Component creation
angular.module('appModule').component('todoList', {
	templateUrl : "app/appModule/todoList/todoList.component.html",
	controller : function(todoService, $filter) {
		//^^^todoService is "injected into controller"
//Variables
		//vm is shared scope between template and controller
		//a 'var' here is only local
		var vm = this;
		
		vm.selected = null;

		vm.todos = [];
		
		var incompleteFilter = $filter('incomplete')(vm.todos);
		//Sets array values and later used to refresh value of todos array after functions
		
// Behaviors
		
		vm.reload = function() {
			todoService.index()
			.then(function(res) {
				console.log(res);
				vm.todos = res.data;
			})
		};
		
		vm.reload();
		console.log(vm.todos);
			
		//Adds new todo and sets it's properties	
		vm.addTodo = function(todo) {
			todoService.create(todo)
			.then(function(res) {
				console.log(todo);
				vm.todos.push(res.data)
				vm.reload();
			})
		}
		
		
		vm.todoCount = function() {
//			return vm.todos.length;
			return $filter('incomplete')(vm.todos).length;
		}
		
		
		vm.displayTodo = function(todo) {
			vm.selected = todo;
		}
		
		vm.displayTable =function() {
			vm.selected = null;
			vm.editTodo = null;
		}
		//Creation of editTodo
		vm.setEditTodo = function() {
			vm.editTodo = angular.copy(vm.selected);
		}
		
		vm.cancel = function(editTodo) {
			vm.displayTodo(editTodo);
			vm.editTodo = null;
		}
		
		vm.updateTodo = function(todo) {
			todoService.update(todo.id, todo)
			.then(function(res){
				vm.reload();
				vm.displayTable();
			})
		}
		
		vm.deleteTodo = function(id) {
			todoService.destroy(id)
			.then(function(res){
				vm.reload();
			})
		}
		
		vm.checkTodoNum = function() {
			if (vm.todoCount() > 10) {
				return "redWarning";
			}
			if (vm.todoCount() > 5) {
				return "yellowWarning";
			}
			if (vm.todoCount() < 5) {
				return "greenWarning";
			}
		}
		
		vm.checkTaskCompletion = function(todo) {
			if (todo.completed === true) {
				return "strikeTask";
			}
		}
		
	},
	controllerAs: 'vm'
});