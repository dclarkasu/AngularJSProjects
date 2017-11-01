//Module creation and telling Angular to look for something called ngRoute. A dependency
//In order to use authentication code it must bring in authModule
angular.module('appModule', ['ngRoute', 'ngCookies', 'authModule'])
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
		.when('/todos/:id', {
			template : `
				<todo-list></todo-list>
				`
		})
		.when('/register', {
			template : `
				<register></register>
			`
		})
		.when('/login', {
			template : `
				<login></login>
			`
		})
		//If it isn't a route defined above go here:
		.otherwise({
			template : `
				<not-found></not-found>
		`
		})
});