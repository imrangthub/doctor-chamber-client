app.component('menuController', {
	templateUrl: 'app/components/setup2/menuComponent/menu.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", 
  function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
  	var model = this;

    this.$onInit = function() {
    	$scope.menuArray = [
    		{"id": "initGtid1", "menueSerial" : 1, "menueHead" : "Clinical History", "menuelink" : "clinical-history"},
    		{"id": "initGtid2", "menueSerial" : 2, "menueHead" : "Chief Complain", "menuelink" : "chief-complain"},
        {"id": "initGtid3", "menueSerial" : 3, "menueHead" : "DoctorWisePrescription", "menuelink" : "doctor-wise-prescription"},
        {"id": "initGtid4", "menueSerial" : 4, "menueHead" : "User Preference", "menuelink" : "user-preference"}
    	]
    }
  }]
});
