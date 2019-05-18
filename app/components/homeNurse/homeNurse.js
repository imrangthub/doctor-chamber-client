app.component('homeNurseController', {
	templateUrl: 'app/components/homeNurse/homeNurse.html',
	controllerAs: 'ctrl',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", "dataCacheService",'$state', function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter, dataCacheService, $state) {
	var ctrl = this;
  this.$onInit = function() {
    $scope.userPreferenceData = [];
    $scope.currentUserPrintPreference = {}
    if($stateParams.consultantionId != undefined){
      $scope.consultantionId = $stateParams.consultantionId;
      $scope.doctorId = $stateParams.doctorId;
      $scope.hospitalId = $stateParams.hospitalId;
    } 
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.doctorObj = {"doctorNo" : $scope.doctorId};
    $scope.prescription = {};
    $scope.favVitalList = [];
    $scope.vitalData = [];
    $scope.doctorWisePscrip = {};

  $scope.getUserPreference = function(userNo) {
      var postData = {id : userNo};
      var querystring = $rootScope.encodeQueryData(postData);
          apiService.listObjectWithQueryParams("user-preferences", querystring, function(response){
          $scope.userPreferenceData = response.items;
          console.log("getUserPreference In Nura: ",$scope.userPreferenceData );
          angular.forEach($scope.userPreferenceData, function(preference, index) {
            if(preference.activeStatus == 1 && preference.userPreferencesKey == 'nurse_station_print_privileges') {
               $scope.currentUserPrintPreference = preference;
            }
          });

      });
  }

    $scope.vitalSetupData($scope.doctorObj);
    $scope.assignPrescriptionDetailData = function(presDataObj){
      $scope.bindVitalData(presDataObj.vitalList);
      $scope.prescription = presDataObj.prescription;

    }

    $scope.findDoctorWisePscrip = function(){
      let querystring = $rootScope.encodeQueryData({"doctorNo" : $scope.doctorId});  
      apiService.getObjectWithParams("doctorWisePscrip/findByDoctorNo", querystring, function(response){
        $scope.doctorWisePscrip = response;
        console.log("doctorWisePscrip",$scope.doctorWisePscrip);
      }); 
    }

    $scope.findPrescription = function(){
      let obj = {doctor_no : $scope.doctorId, consultationId : $scope.consultantionId};
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          //console.log("consulationfindByConsultationId:",response.obj);
          $scope.patient = response.obj;
          let obj = {"consultationId": $scope.consultantionId};
          apiService.findObject("prescription/search", obj, function(response) {
            if(response.success) {
              console.log("prescription/search data Response:",response);
              $scope.assignPrescriptionDetailData (response.model);
            }
          });          
        } else {
          $scope.alertMessage = "Consultation Data Not Found !";
          $('#alertMessage').show().delay(2000).fadeOut();
        }
      });
    }
    $scope.getUserPreference($scope.doctorId); 
    $scope.findPrescription();
    $scope.findDoctorWisePscrip();
  }     
  // end Init Method

  $scope.typeaheadEnterPress = function(consultationId){
    console.log("Enter press found")
  }
  $scope.getSelectedPatient = function ($item, $model, $label) {
         console.log("getSelectedPatient",$item );
         $scope.startPrescription($item);
         $scope.getUserPreference($item.doctor_no); 
  };
  $scope.searchPatients = function (searchTerm) {
    let params = {};
    params.opdConsultationId = searchTerm;
    return $http
      .get(serverUrl+"/api/consulation/search-consulation",{
        params: params
      })
      .then(function (response) {
        return response.data.items;
      });
  };


  $scope.onPrint = function(object) {
    console.log("onPrint",object);
    let url;
    url = serverUrl + "/api/report/prescription?prescriptionId=" + object.id + "&pClient=bsh&pLayout="+ $scope.doctorWisePscrip.presReportEntity.reportLink; 
    window.open(url, '_blank');
  }


$scope.onSave = function(){
  console.log("onSave Prescription: ",$scope.prescription);

  $scope.isDisableSaveBtn = true;
  if($scope.patient != undefined) {
    let obj = {};
    obj.prescription  = {
      "hospitalId"     : $scope.patient.hospitalNo, 
      "consultationNo" : $scope.patient.consultationNo, 
      "consultationId" : $scope.patient.consultationId,
      "appointmentNo"  : $scope.patient.appointmentNo,                          
      "doctorNo"       : $scope.doctorId,
      "modifiedDate"   : new Date(),
      "modifiedBy"     : $rootScope.logedUserInfo.empName,
      "createdDate"    : $scope.prescription.createdDate != undefined ? $scope.prescription.createdDate : new Date(),
      "createdBy"      : $scope.prescription.createdBy != undefined ? $scope.prescription.createdBy : $rootScope.logedUserInfo.empName,
      "isPatientIn"    : 1,
    };
    obj.vitalList            = $scope.makeVitalList($scope.vitalData)
    console.log("Prescription Obj :",obj);
   // return;
    var myEl = document.getElementById("homeTwoMainTableContent");
    angular.element(myEl).addClass('loader');
    if($scope.prescription.id == undefined){
        apiService.createObject("prescription", obj, function(response) {
        if(response.success) {
          $scope.assignPrescriptionDetailData (response.model);
          if($scope.isSaveFromTab==false) {
            $scope.successMessage = "Prescription saved successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut(); 
          }  
          angular.element(myEl).removeClass('loader');
          $scope.isDisableSaveBtn = false;
        } else {
          $scope.isDisableSaveBtn = false;
          $scope.alertMessage = "Please Enter Prescription information !";
          $('#alertMessage').show().delay(2000).fadeOut();
          angular.element(myEl).removeClass('loader');
        }
      });
    } else if ($scope.prescription.id != undefined) {
      $scope.onUpdate(obj);
    }
  } else {
    $scope.alertMessage = "Please add Patient from worklist !";
    $('#alertMessage').show().delay(2000).fadeOut();
  }

}

$scope.onUpdate = function(obj) {
  $scope.isDisableSaveBtn = true;
  obj.prescription.id = $scope.prescription.id;
  obj.prescription.doctorNo = $scope.userNo;
  apiService.updateObject("prescription", obj, function(response) {
    if(response.success) {
      $scope.assignPrescriptionDetailData (response.model);
      if($scope.isSaveFromTab==false){ 
        $scope.successMessage = "Prescription Update successfully !";
        $('#successMessage').show().delay(2000).fadeOut();   
      }      
      var myEl = document.getElementById("homeTwoMainTableContent");
      angular.element(myEl).removeClass('loader');
      $scope.isDisableSaveBtn = false;
    } else {
      $scope.alertMessage = "Update failed! Please contact with administrator.";
      $('#alertMessage').show().delay(2000).fadeOut();
      var myEl = document.getElementById("homeTwoMainTableContent");
      angular.element(myEl).removeClass('loader');
      $scope.isDisableSaveBtn = false;
    }
  });  
}


$scope.makeVitalList = function(array) {
  console.log('makeVitalList array:',array)
  let jsonArr = [];
  angular.forEach(array, function(arrItem) {
    if(arrItem.vitalResult != undefined){
      let jsonData = {
        'vitalEntity':{}
      };        
      jsonData.id = arrItem.newId;
      jsonData.vitalName        = arrItem.vitalName;
      jsonData.vitalUnit        = arrItem.vitalUnit;
      jsonData.vitalResult      = arrItem.vitalResult;
      jsonData.vitalEntity.id   = arrItem.id;
      jsonData.modifiedDate     = new Date(),
      jsonData.modifiedBy       = $rootScope.logedUserInfo.empName,
      jsonData.createdDate      = arrItem.presVitalcreatedDate != undefined ? arrItem.presVitalcreatedDate : new Date(),
      jsonData.createdBy        = arrItem.presVitalcreatedBy != undefined ? arrItem.presVitalcreatedBy : $rootScope.logedUserInfo.empName,
      jsonArr.push(jsonData);
    }
  });
  return jsonArr;    
}

$scope.bindVitalData = function(vitalList) {
  angular.forEach($scope.vitalData, function(item) {
    let obj = {};
    angular.forEach(vitalList, function(data) {
      if(data.vitalEntity.id==item.id){
        item.newId = data.id;
        item.vitalResult = data.vitalResult;
        item.presVitalcreatedDate = data.createdDate
        item.presVitalcreatedBy = data.createdBy
      }
    });
  });
}

$scope.removeId = function (dataArr) {
  let newDataArr = [];
  angular.forEach(dataArr, function(data) {
    if(data.id){
      delete data.id;
    }
    newDataArr.push(data);
  });
  return newDataArr;
}

$scope.vitalSetupData = function (obj) {
  apiService.listObject("vital", obj, function(response){
    $scope.vitalData = response.items;
  }); 
}

$scope.startPrescription = function(obj) {
  if(obj.consultationId == null){
    $scope.alertMessage = "Consultation Fees Not Paid Yet!";
    $('#alertMessage').show().delay(2000).fadeOut();
    return;
  }
  let object = {hospitalId : obj.hospitalNo, doctorId : obj.doctor_no, consultantionId : obj.consultationId};
  $state.go('homenewnurse', object); 
}


	//===================date_piker=====================
$(function () {
  $("#datepicker").datepicker({ 
    format : 'dd/mm/yyyy',
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date());
});

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
          console.log("click0")

    modalOpen('clinicalRecord')
  });

  $('.openModal2').click(function(){
    modalOpen('patientHistory')
  });

   $('.openModal3').click(function(){
    modalOpen('medicineSetup')
  });

   $('.openModal4').click(function(){
    modalOpen('investigationReport')
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
  timeTarget: function(offSet) {},
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
