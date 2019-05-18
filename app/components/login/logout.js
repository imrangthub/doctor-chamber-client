app.controller('logoutCtroller', function($scope, $location) {
	
	localStorage.clear();
	$location.path('/login');
});