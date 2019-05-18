app.component('userPreferenceController', {
	templateUrl: 'app/components/setup2/userPreferenceComponent/user-preference.html',
	controllerAs: 'model',
  	controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  	var model = this;
  	var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;

    $scope.userPreferenceList = [];
    $scope.userPreference = {};
    $scope.newPrescriptionPreferenceList = [];
    $scope.selectedUserPreference = {};

    $scope.prescriptionPreferenceList = [];
    $scope.prescriptionPreference = {};
    $scope.selectedPrescriptionPreference = {};
    $scope.prescriptionPreferenceObj = {};


  }




  	}]
});
