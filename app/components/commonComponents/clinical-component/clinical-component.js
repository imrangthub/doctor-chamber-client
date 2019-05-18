function clinicalController($scope,apiService) {
	$scope.ctrl = this;
	console.log($scope.ctrl," ++++++++++++")
	$scope.ctrl.$onInit = function() {

        $scope.ctrl.patient = {};
        $scope.ctrl.vitalData = {}; 
        $scope.ctrl.finalizationData = {};
        $scope.ctrl.physicalExamData = {};

	      $scope.ctrl.note = {};
	      $scope.ctrl.medicineList = [];
	      $scope.ctrl.diagnosisList = [];             
	      $scope.ctrl.adviceList = [];
	      $scope.ctrl.investigatList = [];
	      $scope.ctrl.chiefComplainList = [];
	      $scope.ctrl.clinicalHistory2List = [];
	      $scope.ctrl.vitalList = [];
	      $scope.ctrl.finalizationList = [];
	      $scope.ctrl.physicalExamList = [];

		console.log($scope.ctrl.consNumber);
		console.log($scope.ctrl.doctorId);
		$scope.ctrl.findPrescription($scope.ctrl.doctorId, $scope.ctrl.consNumber);
	};

    $scope.ctrl.findPrescription = function(doctorId, consultationId) {
      let obj = {doctor_no : doctorId, consultationId : consultationId};
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          $scope.ctrl.patient = response.obj;
          console.log("Patient Info From Clinical  :",$scope.ctrl.patient);
          let obj = {"consultationId": consultationId};
          apiService.findObject("prescription/search", obj, function(response) {
             //console.log("From Clinical /search findObject response:",response);
            if(response.success) {
              $scope.ctrl.note = response.model.note;
              $scope.ctrl.medicineList = response.model.medicineList;
              $scope.ctrl.diagnosisList = response.model.diagnosisList;              
              $scope.ctrl.adviceList = response.model.adviceList;
              $scope.ctrl.investigatList = response.model.investigationList;
              $scope.ctrl.chiefComplainList = response.model.chiefComplainList;
              $scope.ctrl.clinicalHistory2List = response.model.clinicalHistory2List;
              $scope.ctrl.vitalList = response.model.vitalList;
              $scope.ctrl.finalizationList = response.model.finalizationList;
              $scope.ctrl.physicalExamList = response.model.physicalExamList;
              $scope.ctrl.prescription = response.model.prescription;

            }
          });          
        }
       // console.log("From Clinical Obj Bind",ctrl);
      });
    }

	$(document).ready(function(){
		$('.close').click(function(){
		    $('.mac-window').removeClass('active');
		    $('.mac-window').removeClass('maximize');
		    $('.mac-window').removeClass('minimize');
	    });
		$('.minimize').click(function(){
		    $('.mac-window').toggleClass('minimize');
		    $('.mac-window').removeClass('maximize');
		});
		$('.maximize').click(function(){
		    $('.mac-window').toggleClass('maximize');
		    $('.mac-window').removeClass('minimize');
		});
	});
}

app.component('clinicalDetailComponent', {
    templateUrl : 'app/components/commonComponents/clinical-component/clinical-component.html',
    controller : clinicalController,
    bindings : {
    	data: '=',
		consNumber : '=',
		doctorId   : '='
	}
});
