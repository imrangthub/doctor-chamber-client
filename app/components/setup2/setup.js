app.component('setup2Controller', {
	templateUrl: 'app/components/setup2/setup.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", 
  	function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
  		var model = this;

	    this.$onInit = function() {
	    }
	}]
});
