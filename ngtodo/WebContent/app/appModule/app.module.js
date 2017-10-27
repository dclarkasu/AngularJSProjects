//Module creation and telling Angular to look for something called ngRoute. A dependency
angular.module('appModule', ['ngRoute'])
.config(function($routeProvider){
	//Sets the routes for the url path after #/
	//template 
	$routeProvider
		.when('/', {
			template : `
				<home></home>
				`
		})
		.when('/about', {
			template : `
				<about></about>
				`
		})
		.when('/contact', {
			template : `
				<contact></contact>
				`
		})
		.when('/todos', {
			template : `
			<todo-list></todo-list>
			`
		})
		//If it isn't a route defined above go here:
		.otherwise({
			template : `
				<h1>404 - NOT FOUND</h1>
		`
		})
});