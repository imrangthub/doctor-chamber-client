app.component('homefourController', {
	templateUrl: 'app/components/homeFour/homeFour.html',
	controllerAs: 'ctrl',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
	var ctrl = this;
  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;

    $scope.favInvestigatList = [];
    $scope.investigatList = [];
    $scope.investigatData = [];
    $scope.investigat = {};

    $scope.favChiefComplainList = [];
    $scope.chiefComplainList = [];
    $scope.chiefComplainData = [];
    $scope.chiefComplain = {};
    
    $scope.favDiagnosisList = [];
    $scope.diagnosisList = [];
    $scope.diagnosisData = [];

    $scope.favAdviceList = [];
    $scope.adviceList = [];
    $scope.adviceData = [];

    $scope.favVitalList = [];
    $scope.vitalData = [];
    $scope.vitalList = [];

    $scope.clinicalHistoryList = [];
    $scope.clinicalHistory = {};
    $scope.selectedClinicalHistory = {};

    $scope.note = {"prescritionDataType": "5"};
    $scope.noteList = [];

    $scope.favMedicineList = [];
    $scope.medicineList = [];
    $scope.medicineData = [];

    $scope.favPhysicalExamList = [];
    $scope.physicalExamList = [];
    $scope.physicalExamData = [];

    $scope.generalExamData = [];
    $scope.examData = [];
    $scope.systemicExamData = [];

    $scope.generalPres = true;

    $scope.prescription = {};

    $scope.findPrescription = function(consultationId){
      let obj = {doctor_no : $scope.doctorId, consultationId : consultationId};
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          $scope.patient = response.obj;
//          console.log("Patient Info:",$scope.patient);
          let obj = {"consultationId": $scope.consultantionId};
          apiService.findObject("prescription/search", obj, function(response) {
            //console.log("prescription/search findObject response:",response);
            if(response.success) {
              $scope.note = (response.model.note == null ? {"prescritionDataType": "5"} : response.model.note);
              $scope.medicineList = response.model.medicineList;
              $scope.diagnosisList = response.model.diagnosisList;              
              $scope.adviceList = response.model.adviceList;
              $scope.investigatList = response.model.investigationList;
              $scope.chiefComplainList = response.model.chiefComplainList;
              $scope.bindVitalData(response.model.vitalList);
              $scope.prescription = response.model.prescription;
            }
          });          
        } else {
          $scope.alertMessage = "Consultation Data Not Found !";
          $('#alertMessage').show().delay(2000).fadeOut();
        }
      });
    }

    if($stateParams.consultantionId != undefined){
      $scope.consultantionId = $stateParams.consultantionId;
      $scope.doctorId = $stateParams.doctorId;
      $scope.findPrescription($scope.consultantionId);
    } 

    if($rootScope.medicineData == undefined) {
      apiService.listObject("medicine", {}, function(response) {
        $scope.medicineData = response.items;
      });      
    } else {
      $scope.medicineData = $rootScope.medicineData;
    }
    
  };

$scope.onSave = function(){
  if($scope.patient != undefined){
    let obj = {};
    obj.prescription  = {
                          "hospitalId"     : $scope.patient.hospitalNo, 
                          "consultationNo" : $scope.patient.consultationNo, 
                          "consultationId" : $scope.patient.consultationId,
                          "appointmentNo"  : $scope.patient.appointmentNo,                          
                          "doctorNo"       : $scope.userNo
                        };
    obj.note              = $scope.note.prescritionData == undefined? {} : $scope.note;
    obj.vitalList         = $scope.makeVitalList($scope.vitalData)
    obj.adviceList        = $scope.adviceList;
    obj.medicineList      = $scope.medicineList;
    obj.diagnosisList     = $scope.diagnosisList;
    obj.investigationList = $scope.investigatList;
    obj.chiefComplainList = $scope.chiefComplainList;

    console.log("Prescription Obj :",obj);
    var myEl = document.getElementById("homeTwoMainTableContent");
    angular.element(myEl).addClass('loader');
    if($scope.prescription.id == undefined){
        apiService.createObject("prescription", obj, function(response) {
        if(response.success){
          $scope.findPrescription(obj.prescription.consultationId);
          $scope.successMessage = "Prescription saved successfully !"; 
          $('#successMessage').show().delay(2000).fadeOut(); 
          angular.element(myEl).removeClass('loader');
        }else{
           $scope.alertMessage = "Please Enter Prescription information !";
           $('#alertMessage').show().delay(2000).fadeOut();
           angular.element(myEl).removeClass('loader');
        }
      });

    }else if ($scope.prescription.id != undefined){
      $scope.onUpdate(obj);
    }
  }else {
    $scope.alertMessage = "Please add Prescription from worklist !";
    $('#alertMessage').show().delay(2000).fadeOut();
  }

}

$scope.onUpdate = function(obj) {
  obj.prescription.id = $scope.prescription.id;
  obj.prescription.doctorNo = $scope.userNo;
  apiService.updateObject("prescription", obj, function(response) {
    console.log("Response After Update",response);
    if(response.success) {
      $scope.findPrescription(response.obj.consultationId);        
      $scope.successMessage = "Prescription Update successfully !";
      $('#successMessage').show().delay(2000).fadeOut();
      var myEl = document.getElementById("homeTwoMainTableContent");
      angular.element(myEl).removeClass('loader');
    }
  });  
}
//====================== Prescription report for BSH =====================================
$scope.onPrint = function(event){                     
  if($scope.prescription.id == undefined) {
    $scope.alertMessage = "Please Save Prescription!";
    $('#alertMessage').show().delay(2000).fadeOut();      
    return; 
  }
  
  let url;
  console.log("General Prescription ");
  url = serverUrl + "/api/report/prescription?prescriptionId=" + $scope.prescription.id + "&pClient=bsh&pLayout="+ $rootScope.logedUserInfo.reportLink; 
  window.open(url, '_blank'); // in new tab
}
//====================== Prescription report for BSH =====================================



//====================== Prescription report for General =====================================

/*$scope.onPrint = function(event){                           
  if($scope.prescription.id == undefined) {
    $scope.alertMessage = "Please Save Prescription!";
    $('#alertMessage').show().delay(2000).fadeOut();      
    return; 
  }
  
  let url;
  console.log("General Prescription ");
  url = serverUrl + "/api/report/prescription?prescriptionId=" + $scope.prescription.id + "&pClient=gen&pLayout=1";  
  window.open(url, '_blank'); // in new tab
}*/

//====================== Prescription report for General =====================================




$scope.onSelect = function(obj, listName){
  $scope[listName].push(obj);
  console.log("onSelect", $scope[listName]);
}

$scope.onDelete = function(index, listName){
  if($scope[listName][index].id == undefined){
    $scope[listName].splice(index, 1);
    return;
  } 
  $scope[listName][index].isDeleted = 1;
  console.log($scope[listName]);
}

$scope.onMakeFavorit = function(obj, listName){
  $scope[listName].push(obj);
  console.log("onMakeFavorit", $scope[listName]);
}

$scope.bindVitalData = function(vitalList) {
    angular.forEach(vitalList, function(item) {
      var obj = $filter('filter')($scope.vitalData, {'vitalName':item.vitalName})[0];
      if(obj != undefined){
        obj.newId = item.id;
        obj.vitalResult = item.vitalResult;
      } else {
        let obj = {};
        obj.newId = item.id;
        obj.vitalName = item.vitalName;
        obj.vitalResult = item.vitalResult;
        $scope.vitalData.push(obj);
      }
    });
}



$scope.copyClinicalHistoryToEditor  = function(obj){
    $scope.note.prescritionData = obj.noteDescription;
  CKEDITOR.instances['editor'].setData(obj.noteDescription);
}
$scope.catchKeyPress = function(keyEvent) {
  if (keyEvent.which === 17) { 
   console.log(" You pareasa a key This is Ctr+Q");
  }
}


apiService.listObject("investigation", {}, function(response){
  $scope.investigatData = response.items;
});

apiService.listObject("chiefcomplain", {}, function(response){
  $scope.chiefComplainData = response.items;
});  

apiService.listObject("vital", {}, function(response){
  $scope.vitalData = response.items;
}); 

apiService.listObject("diagnosis", {}, function(response){
  $scope.diagnosisData = response.items;
}); 

apiService.listObject("advice", {}, function(response){
  $scope.adviceData = response.items;
}); 

apiService.listObject("note", {}, function(response){
  $scope.clinicalHistoryList = response.items;
}); 

// if($rootScope.medicineData == undefined) {
//   apiService.listObject("medicine", {}, function(response) {
//     $scope.medicineData = response.items;
//   });      
// } else {
//   $scope.medicineData = $rootScope.medicineData;
// }

apiService.listObject("physical-exam", {}, function(response){
  $scope.physicalExamData = response.items;
  angular.forEach($scope.physicalExamData, function(item) {
    if(item.examDataType == 2){
      $scope.generalExamData.push(item);
    } else if(item.examDataType == 3){
      $scope.examData.push(item);
    } else if(item.examDataType == 4){
      $scope.systemicExamData.push(item);
    }
  });
}); 


$scope.makeVitalList = function(array) {
    let jsonArr = [];
    angular.forEach(array, function(arrItem) {
      if(arrItem.vitalResult != undefined){
        let jsonData = {};        
        jsonData.id = arrItem.newId;
        jsonData.vitalName   = arrItem.vitalName;
        jsonData.vitalUnit   = arrItem.vitalUnit;
        jsonData.vitalResult = arrItem.vitalResult;
        jsonArr.push(jsonData);
      }
    });
    return jsonArr;    
}


	//===================date_piker=====================
$(function () {
  $("#datepicker").datepicker({ 
    format : 'dd/mm/yyyy',
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());
});



//for ckeditor=================
//initSample();
//end for ckeditor=================
//=====================clock script============================
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}
//=============================select row js=================== 
$('#patientList tbody').on('click', 'tr', function () {
      $('#patientList tbody tr').removeClass("activetable");
      $(this).addClass("activetable");
    });
	
	$('#patientList tbody').on('click', 'tr', function () {
      $('#patientList tbody tr').removeClass("activetable");
      $(this).addClass("activetable");
    });
	
	
	//==================drop_dow==============
	$(document).ready(function(){
  $(".drop_value").click(function(){
    $(".drop_value_slide").show();
  $(".span_close").show();
  
  });
  
  
  $(".span_close").click(function(){
    $(".drop_value_slide").hide();
  $(".span_close").hide();
  });
  

});

//=================================all_modal_js===============
	function modalOpen(getClass){
    $('.'+getClass).addClass('active');
  }

  $(document).ready(function(){
  $('.openModal').click(function(){
    modalOpen('clinicalRecord')
  });

  $('.openModal2').click(function(){
    modalOpen('patientHistory')
  });

   $('.openModal3').click(function(){
    modalOpen('medicineSetup')
  });

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
$.fn.extend ( {
    timeTarget: function(offSet) {
         
      },
  
    timeUser: function() {
        var userTime, 
        userDate;
        
        userTime = new Date();
        userDate = userTime.toDateString(); 
        userTime = userTime.toTimeString();
               
       this.html(userDate + ' ' + userTime.substring(0, 8)); 
    }        
});
// hide_show_print
 $(document).ready(function(){
    $(".detailsp").click(function(){
        $(".clicktoggle").toggle();

    });
});

function modalContent(modalObj){
    $('#'+modalObj.modalId).modal('show');
    $scope.modalHeader = modalObj.header;
    var headerClass = document.getElementById(modalObj.modalId);
    console.log(headerClass)
}
$scope.ClinicalHistory = function(){
      modalContent({
        modalId : "modalListClinical",
        header: "Clinical History"
      })
}
$scope.Investigation  = function(){
    modalContent({
      modalId : "modalList",
      header: "Investigation List"
    })
}
$scope.Medication  = function(){
    modalContent({
      modalId : "modalListMedi",
      header: "Medication"
    })
}
$scope.SytemicExamination = function(){
    modalContent({
      modalId : "modal2",
      header: "Sytemic Examination"
    })
}
$scope.GeneralExam  = function(){
    modalContent({
      modalId : "modal2",
      header: "General Exam"
    })
}
$scope.Examination  = function(){
    modalContent({
      modalId : "modal2",
      header: "Examination"
    })
}

}]

	

});
