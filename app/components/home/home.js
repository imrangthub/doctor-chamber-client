app.component('homeController', {
	templateUrl: 'app/components/home/home.html',
	controllerAs: 'model',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter) {
	var model = this;

  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;

    $scope.doctorNo = {"doctorNo" : $scope.userNo};
    $scope.note = {};
    $scope.prescription = {};
    $scope.noteList = [];
    $scope.visitNoteList = [];
    $scope.visitNote = {};
    $scope.vitalList = [];
    $scope.medicineList = [];
    $scope.diagnosisList = [];
    $scope.pathInvestigationList = [];
    $scope.radioInvestigationList = [];
    $scope.radioInvestigationList = [];
    $scope.setupHeadList = [];
    $scope.radiologyNoteShow = false;
    $scope.phatologyNoteShow = false;
    $scope.radiologyNote = {};
    $scope.phatologyNote = {};
    $scope.allNoteList = [];
    $scope.noteArray = ["radiologyNote", "phatologyNote", "investigationNote", "medicationNote"];

    $scope.medicineData = [];
    $scope.diagnosisData = [];
    $scope.vitalData = [];
    $scope.pathInvestigationData = [];
    $scope.radioInvestigationData= [];
    $scope.generalPres = true;
    $scope.printable = true;

    $scope.findPrescription = function(consultationId){
      let obj = {doctor_no : $scope.doctorId, consultationId : consultationId};
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          $scope.patient = response.obj;
          console.log("Patient Info:",$scope.patient);
          let obj = {"consultationId": $scope.consultantionId};
          apiService.findObject("prescription/search", obj, function(response) {
            console.log(response);
            if(response.success) {
              $scope.note = (response.model.note == null ? {"prescritionDataType": "5"} : response.model.note);
              $scope.medicineList = response.model.medicineList;
              $scope.diagnosisList = response.model.diagnosisList;
              $scope.pathInvestigationList = response.model.phatologyList;
              $scope.phatologyNote = (response.model.phatologyNote == null ? {"notesDataType": "1"} : response.model.phatologyNote);
              $scope.radioInvestigationList = response.model.radiologyList;
              $scope.radiologyNote = (response.model.radiologyNote == null ? {"notesDataType": "2"} : response.model.radiologyNote);
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
        //localStorage.setItem("medicineData", JSON.stringify($scope.medicineData));
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
        // localStorage.setItem("pathInvestigationData", $scope.pathInvestigationData);
        // localStorage.setItem("radioInvestigationData", $scope.radioInvestigationData);
      });
    } else {
      $scope.pathInvestigationData = $rootScope.pathInvestigationData;
      $scope.radioInvestigationData = $rootScope.radioInvestigationData;
    }

    apiService.listObject("diagnosis", {}, function(response) {
        $scope.diagnosisData = response.items;
    });

    apiService.listObject("vital", {}, function(response) {
        $scope.vitalData = response.items;
    });

    apiService.listObject("note", {}, function(response){
      $scope.visitNoteList = response.items;
    });

    apiService.listObject("setup-head", $scope.doctorNo, function(response){
      $scope.setupHeadList = response.items;
    });
}
    
  $scope.isPrintableReport = function(isPrintable, headNameKey,dataType) {
	   console.log("Print Head",headNameKey);
	  	let obj = {};
	    obj.isPrintable = isPrintable
	    obj.doctorNo = $scope.userNo
	    obj.headNamePrint = headNameKey
	    obj.headName = headNameKey
	    obj.dataType = dataType
      if (headNameKey == "Radiology" ) {
         if (isPrintable) {
           $scope.generalPres = false;  
         }else{
          $scope.generalPres = true;  
         }        
      }

	    $scope.updateSetupHead (obj);	    
	}
  
  $scope.updateSetupHead = function(obj) { 

	  console.log('Userd fNo0000000000000000', obj);
	  
	  apiService.saveOrupdateObject("setup-head", obj, function(response) {
	      console.log("Response After Update",response);
	      if(response.success) {      
	      /*  $scope.successMessage = "Prescription Update successfully !";
	        $('#successMessage').show().delay(2000).fadeOut();*/
	      }

	    }); 

	}
  
  $scope.onSelect = function(obj, listName){
    $scope[listName].push(obj);
  }

  $scope.onSelectNote = function(scope){
    if($scope[scope]){
      $scope[scope] = false;
    } else {
      $scope[scope] = true;
    }
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
      // if($scope.note.prescritionData == "" && $scope.note.id != undefined){
      //   $scope.note.isDeleted = 1;         
      // }
      if ($scope.note.prescritionData== undefined) {
         obj.note={};
      }else{
          obj.note={};
          obj.note = $scope.note;
          obj.note.prescritionDataType = 5;
      }
      obj.vitalList     = $scope.makeVitalList($scope.vitalData)
      obj.medicineList  = $scope.medicineList;
      obj.diagnosisList = $scope.diagnosisList;
      obj.phatologyList = $scope.pathInvestigationList;
      obj.radiologyList = $scope.radioInvestigationList;
      obj.allNoteList   = $scope.makeAllNoteList($scope.noteArray);

      console.log(obj.diagnosisList);

      var homeOneMainTableContent = document.getElementById("homeOneMainTableContent");
      angular.element(homeOneMainTableContent).addClass('loader');
      if($scope.prescription.id == undefined){
          apiService.createObject("prescription", obj, function(response) {
          if(response.success){
            $scope.findPrescription(obj.prescription.consultationId);
            $scope.successMessage = "Prescription saved successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut(); 
          }else{
             $scope.alertMessage = "Please Enter Prescription information !";
             $('#alertMessage').show().delay(2000).fadeOut();
          }
          angular.element(homeOneMainTableContent).removeClass('loader');
        });

      } else if ($scope.prescription.id != undefined){
        $scope.onUpdate(obj);
      }
    } else {
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
        $scope.findPrescription(response.model.prescription.consultationId);        
        $scope.successMessage = "Prescription Update successfully !";
        $('#successMessage').show().delay(2000).fadeOut();
      }else{
        $scope.alertMessage = "Update failed, Please contact with admin.";
        $('#alertMessage').show().delay(2000).fadeOut();
      }
      var homeOneMainTableContent = document.getElementById("homeOneMainTableContent");
      angular.element(homeOneMainTableContent).removeClass('loader');
    });  
  }

  $scope.onDelete = function(index, listName){
    if($scope[listName][index].id == undefined){
      $scope[listName].splice(index, 1);
      return;
    } 
    $scope[listName][index].isDeleted = 1;
    console.log($scope[listName]);
  }


//====================== Prescription report for BSH =====================================
/*  $scope.onPrint = function(event){                    
    if($scope.prescription.id == undefined) {
      $scope.alertMessage = "Please Save Prescription!";
      $('#alertMessage').show().delay(2000).fadeOut();      
      return; 
    }
    
    let url;
    console.log("General Prescription ");
    url = serverUrl + "/api/report/prescription?prescriptionId=" + $scope.prescription.id + "&pClient=bsh&pLayout="+ $rootScope.logedUserInfo.reportLink; 
    window.open(url, '_blank'); // in new tab
  }*/

//====================== Prescription report for BSH =====================================



//====================== Prescription report for Wahab =====================================

  $scope.printChange = function(scope){
    if($scope[scope]){
      $scope[scope] = false;
    } else {
      $scope[scope] = true;
    }
  }

  $scope.onPrint = function(event){                  
    if($scope.prescription.id == undefined) {
      $scope.alertMessage = "Please Save Prescription!";
      $('#alertMessage').show().delay(2000).fadeOut();      
      return; 
    }
    
    let url;
    if(!$scope.generalPres){
      console.log("General Prescription Percial");
      url = serverUrl + "/api/report/prescription?prescriptionId=" + $scope.prescription.id + "&pClient=wahab&pLayout=3";
    } else {
      console.log("General Prescription ");
      url = serverUrl + "/api/report/prescription?prescriptionId=" + $scope.prescription.id + "&pClient=wahab&pLayout=1";      
    }
    window.open(url, '_blank'); // in new tab

  }
  
  //====================== Prescription report for Wahab =====================================

  $scope.bindVitalData = function(vitalList) {
    console.log(vitalList);
    angular.forEach(vitalList, function(item) {
      var obj = $filter('filter')($scope.vitalData, {'vitalName':item.vitalName})[0];
      console.log(obj);
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

  $scope.makeAllNoteList = function(array){
    let jsonArr = [];
    angular.forEach(array, function(arrItem) {
      if($scope[arrItem] != undefined && $scope[arrItem].notesData != undefined){
        jsonArr.push($scope[arrItem]);
      }
    });
    return jsonArr;    
  }


  // hide_show_print
   $(document).ready(function(){
      $(".detailsp").click(function(){
        $(".clicktoggle").toggle();
      });
  });
  
	
//=====================clock script============================
  var myVar = setInterval(myTimer, 1000);

  function myTimer() {
      var d = new Date();
      if(document.getElementById("clock")){
        document.getElementById("clock").innerHTML = d.toLocaleTimeString();
      }
  }


  $(document).ready(function(){
    $(".navMenu").click(function(){
      $(".header").slideToggle('');
    });
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
}]
});
