app.component('aboutsectionController', {
	templateUrl: 'app/components/doctorChamber/aboutUsSection/aboutUsSection.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
	var model = this;

this.$onInit = function() {
	$scope.appointment = {
		gender:"MALE",
		doctor_no:"0"
	};
	$scope.selectedAppointment = {};
	$scope.appointmentList = [];

	$scope.medicineData = [];

	$scope.searchDoctorlist137();
	$scope.searchDoctorlist2();

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

	if($scope.appointment.doctor_no=='0'){
		$scope.alertMessage = "Please Select a doctor !";
		$('#alertMessage').show().delay(2000).fadeOut();
		return;
	}
	

	obj= $scope.appointment;
	console.log("Bookappoint Obj: ",obj);

	apiService.createObject("consulation", obj, function(response){
		if(response.success==true){
		    $scope.successMessage = response.message; 
			$('#successMessage').show().delay(2000).fadeOut();
			if($scope.appointment.doctor_no == '137'){
				$scope.searchDoctorlist137();
			}else if($scope.appointment.doctor_no == '2'){
				$scope.searchDoctorlist2();
			}else if($scope.appointment.doctor_no == '3'){
				$scope.searchDoctorlist3();
			}
			$scope.resetAppointForm();
		}else{
			$scope.alertMessage = response.message; 
			$('#alertMessage').show().delay(2000).fadeOut();
		}
            
	 });
	
}

$scope.searchDoctorlist137 = function(){
	let doctorNoStr = {doctorNo : 137};
    let querystring = encodeQueryData(doctorNoStr);
	apiService.searchDoctorlist("consulation", querystring, function(response){
		if(response.success==true){
			$scope.patientsFor137 = response.items;
		}else{
			$scope.alertMessage = response.message; 
			$('#alertMessage').show().delay(2000).fadeOut();
		}
            
	 });
	}

$scope.searchDoctorlist2 = function(){
	 let doctorNoStr = {doctorNo : 2};
	 let querystring = encodeQueryData(doctorNoStr);
	 apiService.searchDoctorlist("consulation", querystring, function(response){
		 if(response.success==true){
			 $scope.patientsFor2 = response.items;
		 }else{
			 $scope.alertMessage = response.message; 
			 $('#alertMessage').show().delay(2000).fadeOut();
		 }		 
  });
}

$scope.searchDoctorlist3 = function(){
	let doctorNoStr = {doctorNo : 3};
	let querystring = encodeQueryData(doctorNoStr);
	apiService.searchDoctorlist("consulation", querystring, function(response){
		if(response.success==true){
			$scope.patientsFor3 = response.items;
		}else{
			$scope.alertMessage = response.message; 
			$('#alertMessage').show().delay(2000).fadeOut();
		}		 
 });
}





$scope.resetAppointForm = function(){
	$scope.appointment = {
		gender:"MALE",
		doctor_no:"0"
	};
}
   











function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  };








  
}]
});
