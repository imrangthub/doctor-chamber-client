app.component('aboutsectionController', {
	templateUrl: 'app/components/doctorChamber/aboutUsSection/aboutUsSection.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
	var model = this;

this.$onInit = function() {
	$scope.appointment = {
		gender:"MALE"
	};
	$scope.selectedAppointment = {};
	$scope.appointmentList = [];

	$scope.medicineData = [];


}


$scope.onBookAppoitnment = function(){
	var obj = {};
	if(!$scope.appointment.patientName){
		$scope.alertMessage = "Please Enter Patient Name !";
		$('#alertMessage').show().delay(2000).fadeOut();
		return;
	}
	if(!$scope.appointment.phoneNo){
		$scope.alertMessage = "Please Enter a contact Number !";
		$('#alertMessage').show().delay(2000).fadeOut();
		return;
	}
	

	obj= $scope.appointment;
	console.log("Bookappoint Obj: ",obj);

	apiService.createObject("consulation", obj, function(response){
		$scope.successMessage = "Appoitnment book successfully !"; 
		$('#successMessage').show().delay(2000).fadeOut();
		$scope.resetAppointForm();            
	 });
	
}





$scope.resetAppointForm = function(){
	$scope.appointment = {
		gender:"MALE"
	};
}
   



















  
}]
});
