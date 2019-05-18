app.component('homethreeController', {
	templateUrl: 'app/components/home-3/home-3.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope',"apiService", "$stateParams", "$filter", function($http, $location, $rootScope, $scope, apiService,  $stateParams, $filter) {
	var model = this;
  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;

    $scope.investigatList = [];
    $scope.investigatData = [];
    $scope.investigat = {};
    $scope.chiefComplainList = [];
    $scope.chiefComplainData = [];
    $scope.chiefComplain = {};
    $scope.diagnosisList = [];
    $scope.diagnosisData = [];
    $scope.vitalData = [];
    $scope.vitalList = [];
    $scope.clinicalHistoryList = [];
    $scope.clinicalHistory = {};
    $scope.selectedClinicalHistory = {};

    $scope.adviceList = [];
    $scope.adviceData = [];
    $scope.advice = {};

    $scope.note = {"prescritionDataType": "5"};
    $scope.prescription = {};
    $scope.noteList = [];
    $scope.medicineList = [];
    $scope.pathInvestigationList = [];
    $scope.radioInvestigationList = [];
    $scope.medicineData = [];
    $scope.pathInvestigationData = [];
    $scope.radioInvestigationData= [];            
    $scope.generalPres = true;

    $scope.findPrescription = function(consultationId){
      let obj = {doctor_no : $scope.doctorId, consultationId : consultationId};
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          $scope.patient = response.obj;
          console.log("Patient Info:",$scope.patient);
          let obj = {"consultationId": $scope.consultantionId};
          apiService.findObject("prescription/search", obj, function(response) {
            console.log("prescription/search findObject response:",response);
            if(response.success) {
              $scope.note = (response.model.note == null ? {"prescritionDataType": "5"} : response.model.note);
              $scope.medicineList = response.model.medicineList;
              $scope.diagnosisList = response.model.diagnosisList;
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
    if($rootScope.pathInvestigationData == undefined || $rootScope.radioInvestigationData == undefined) {
      apiService.listObject("investigation", {}, function(response) {
        $scope.investigationData = response.items;
        angular.forEach($scope.investigationData, function(item) {
          if(item.itemTypeNo == 1){
              $scope.pathInvestigationData.push(item);
          } else if(item.itemTypeNo == 2){
              $scope.radioInvestigationData.push(item);            
          }
        });
      });
    } else {
      $scope.pathInvestigationData = $rootScope.pathInvestigationData;
      $scope.radioInvestigationData = $rootScope.radioInvestigationData;
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
    apiService.listObject("note", {}, function(response){
      $scope.clinicalHistoryList = response.items;
    }); 
    apiService.listObject("advice", {}, function(response){
      $scope.adviceData = response.items;
    }); 
  }

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
    obj.note          = $scope.note.prescritionData == undefined? {} : $scope.note;
    obj.vitalList     = $scope.makeVitalList($scope.vitalData)
    obj.medicineList  = $scope.medicineList;
    obj.diagnosisList = $scope.diagnosisList;
    obj.investigationList = $scope.investigatList;
    obj.chiefComplainList = $scope.chiefComplainList;
    console.log("Prescription Obj :",obj);
    var myEl = document.getElementById("homeThreeMainTableContent");
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
  var myEl = document.getElementById("homeThreeMainTableContent");
  apiService.updateObject("prescription", obj, function(response) {
    console.log("Response After Update",response);
    if(response.success) {
      $scope.findPrescription(response.obj.consultationId);        
      $scope.successMessage = "Prescription Update successfully !";
      $('#successMessage').show().delay(2000).fadeOut();
       angular.element(myEl).removeClass('loader');
    }else{
      $scope.alertMessage = "Update failed, Please contact with admin.";
      $('#alertMessage').show().delay(2000).fadeOut();
      var myEl = document.getElementById("homeThreeMainTableContent");
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
/*$scope.onPrint = function(event){                 // prescription report for General layout
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

function modalContent(modalObj){
      $('#'+modalObj.modalId).modal('show');
      $scope.modalHeader = modalObj.header;
      var headerClass = document.getElementById(modalObj.modalId);
      console.log(headerClass)
    }
    
    $scope.chiefComplain = function(){
        modalContent({
          modalId : "modalList",
          header: "Chief Complain"
        })
}  
$scope.OnExamination = function(){
      modalContent({
        modalId : "modalList",
          header: "On Examination"
        })
}
$scope.Diagnosis = function(){
      modalContent({
        modalId : "modalList",
        header: "Diagnosis"
      })
      
}
$scope.Investigation = function(){
      modalContent({
        modalId : "modalList",
        header: "Investigation"
      })
}
$scope.rxModal = function(){
      modalContent({
        modalId : "rxModal",
        header: "RX"
      })
      
}

$scope.advice = function(){
      modalContent({
        modalId : "advice",
        header: "Advice"
      })
      
}
$scope.Followup = function(){
      modalContent({
        modalId : "followup",
        header: "Follow Up"
      })
      
}




// hide_show_print
 $(document).ready(function(){
    $(".detailsp").click(function(){
        $(".clicktoggle").toggle();

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


	}]

});
