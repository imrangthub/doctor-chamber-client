app.component('doctorWisePrescriptionController', {
	templateUrl: 'app/components/setup2/doctorWisePrescriptionComponent/doctor-wise-prescription.html',
	controllerAs: 'model',
  	controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  	var model = this;
  	var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
  $scope.userNo = $rootScope.logedUserInfo.userNo;
  $scope.presTemplateList = [];
  $scope.presFormList = [];

  $scope.listOfPresTemplate();
  $scope.listOfPresFrom();

  $scope.doctorWisePscrip = {
    "presReportEntity":{},
    "presFormEntity":{}
  };
  $scope.selectedDoctorWisePscrip = {
    "presReportEntity":{},
    "presFormEntity":{}
  };
  $scope.dtInstance = {};
}



$scope.listOfPresTemplate = function() {
  apiService.listObject("presReport", {}, function(response){
    console.log("presTemplateList List  response data:",response);
    $scope.presTemplateList = response.items;
    console.log("presTemplateList List :",$scope.presTemplateList);
  }); 
};

$scope.listOfPresFrom = function() {
  apiService.listObject("presForm", {}, function(response){
    console.log("presFormList List  response data:",response);
    $scope.presFormList = response.items;
  }); 
};




  	}]
});
