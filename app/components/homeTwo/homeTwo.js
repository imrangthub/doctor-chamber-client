app.component('hometwoController', {
	templateUrl: 'app/components/homeTwo/homeTwo.html',
	controllerAs: 'ctrl',
	controller: ['$http', '$location', '$rootScope', '$scope', "apiService", "$stateParams", "$filter", "dataCacheService", function($http, $location, $rootScope, $scope, apiService, $stateParams, $filter, dataCacheService) {
	var ctrl = this;
  var engObj={};
  var localObj={};
  var basicNumbers = { 0:'০', 1:'১', 2:'২', 3:'৩', 4:'৪', 5:'৫', 6:'৬', 7:'৭', 8:'৮', 9:'৯'};
  
  this.$onInit = function() {
    $scope.changeActive = function(index){
      $scope.activeIndex = index;
    }   

    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.preferenceList = $rootScope.logedUserInfo.preferenceInfo;
    $scope.isTabVitalEnable = false;
    
    $scope.doctorObj = {"doctorNo" : $scope.userNo};
    $scope.urlMap = {};
    $scope.urlMap.clinical_history_1    = ".ClinicalHis";
    $scope.urlMap.clinical_history_2    = ".ClinicalHisTwo";
    $scope.urlMap.chief_complain        = ".ChiefComplain";
    $scope.urlMap.physical_exam         = ".PhysicalExamination";
    $scope.urlMap.history               = ".History";
    $scope.urlMap.investigation         = ".Investigation";
    $scope.urlMap.medication            = ".Medication";
    $scope.urlMap.diagnosis             = ".Diagnosis";
    $scope.urlMap.advice                = ".Advice";
    $scope.urlMap.finalization_1        = ".Finalization";
    $scope.urlMap.finalization_2        = ".Finalization2";
    $scope.urlMap.vital                 = ".Vital";
    $scope.urlMap.referral_key          = ".Referral";
    $scope.urlMap.general_note          = ".GeneralNote";

    $scope.activeIndex = 0;
    $scope.preferenceList = $filter('orderBy')($scope.preferenceList, 'preferencesSerial', false) 
    angular.forEach($scope.preferenceList, function(preference, index) {
      if(preference.activeStatus == 1 && preference.userPreferencesValue == "1") {
        preference[preference.userPreferencesKey] = true;
        preference.url = $scope.urlMap[preference.userPreferencesKey];
        if(index == 0) {
          let indexCustome = 'active_' + index;
          preference[indexCustome] = true;
          $scope[preference.userPreferencesKey + "_active"] = true;
        } else {
          let indexCustome = 'active_' + index;
          preference[indexCustome] = false;
          $scope[preference.userPreferencesKey + "_active"] = false;          
        }
        if(preference.userPreferencesKey=='vital'){
          $scope.isTabVitalEnable = true;
        }
      }
    });
 
    $scope.favListSearchParms = {};
    $scope.isPatientOut = 0;
    $scope.isSaveFromTab = false;
    $scope.allFavoriteData = [];
    $scope.labReportList = [];
    $scope.nonLabReportList = [];
    $scope.labInvestigationDetailList = [];
    $scope.nonLabInvestigationDetailList = [];


    $scope.favInvestigatList = [];
    $scope.investigatList = [];
    //$scope.investigatListDelete = [];
    $scope.investigatData = [];
    $scope.investigat = {};

    $scope.favChiefComplainList = [];
    $scope.chiefComplainList = [];
    //$scope.chiefComplainListDelete = [];
    $scope.chiefComplainData = [];
    $scope.chiefComplain = {};
    
    $scope.favClinicalHistory2List = [];
    $scope.clinicalHistory2List = [];
    //$scope.clinicalHistory2ListDelete = [];
    $scope.clinicalHistory2Data = [];
    
    $scope.favDiagnosisList = [];
    $scope.diagnosisList = [];
    //$scope.diagnosisListDelete = [];
    $scope.diagnosisData = [];

    $scope.favAdviceList = [];
    $scope.adviceList = [];
    //$scope.adviceListDelete = [];
    $scope.adviceData = [];

    $scope.favVitalList = [];
    $scope.vitalData = [];
    $scope.vitalList = [];

    $scope.finalizationData = [];
    $scope.finalizationList = [];

    $scope.clinicalHistoryList = [];
    $scope.clinicalHistory = {};
    $scope.selectedClinicalHistory = {};

    $scope.note = {"prescritionDataType": "5"};
    $scope.noteList = [];

    $scope.favMedicineList = [];
    $scope.medicineList = [];
    //$scope.medicineListDelete = [];
    $scope.medicineData = [];

    $scope.physicalExamGroupList = [];

    $scope.favPhysicalExamList = [];
    $scope.physicalExamList = [];
    $scope.physicalExamData = [];

    $scope.historyGroupList = [];
    $scope.historyList = [];
    $scope.historyData = [];

    $scope.generalExamData = [];
    $scope.examData = [];
    $scope.systemicExamData = [];

    $scope.generalPres = true;

    $scope.prescription = {};

    $scope.allNotesList = [];
    $scope.allNote = {
       "prescription":{}

    };
 
    $scope.medicineNote = {
      "notesDataType":4,
      "notesDataHead":"Instruction",
      "prescription":{}
    };
    $scope.investigationNote = {
      "notesDataType":1,
      "notesDataHead":"Investigation Note",
      "prescription":{}
    };
    $scope.generalNote = {
      "notesDataType":5,
      "notesDataHead":"General Note",
      "prescription":{}
    };
    $scope.isDisableSaveBtn = false;
    $scope.isDisablePrintBtn = true;
    $scope.doctorData = [];
   // $scope.refDoctorList = [];

    $scope.assignPrescriptionDetailData = function(presDataObj){
      $scope.note = (presDataObj.note == null ? {"prescritionDataType": "5"} : presDataObj.note);
      $scope.medicineList = presDataObj.medicineList;
      $scope.diagnosisList = presDataObj.diagnosisList;      
    //  $scope.refDoctorList = presDataObj.refDoctorList;             
      $scope.adviceList = presDataObj.adviceList;
      $scope.investigatList = presDataObj.investigationList;
      $scope.chiefComplainList = presDataObj.chiefComplainList;
      $scope.clinicalHistory2List = presDataObj.clinicalHistory2List;
      $scope.bindVitalData(presDataObj.vitalList);
      $scope.bindFinalizeData(presDataObj.finalizationList);
      $scope.bindPhysicalExamData(presDataObj.physicalExamList);
      $scope.bindHistoryPrescriptionData(presDataObj.historyList);
      $scope.bindAllNotesPrescriptionData(presDataObj.allNotesList);
      $scope.prescription = presDataObj.prescription;
      if($scope.prescription.id != undefined)$scope.isDisablePrintBtn = false;
    }

    $scope.findPrescription = function(){
      let obj = {doctor_no : $scope.doctorId, consultationId : $scope.consultantionId};
      var homeTwoMainContent = document.getElementById("homeTwoMainTableContent");
      angular.element(homeTwoMainContent).addClass('loader');
      apiService.findObject("consulation/findByConsultationId", obj, function(response) {
        if(response.success) {
          //console.log("consulationfindByConsultationId:",response);
          $scope.patient = response.obj;
          let obj = {"consultationId": $scope.consultantionId};
          apiService.findObject("prescription/search", obj, function(response) {
            if(response.success) {
              //console.log("prescription/search data:",response);
              $scope.assignPrescriptionDetailData (response.model);
            }
          });          
        } else {
          $scope.alertMessage = "Consultation Data Not Found !";
          $('#alertMessage').show().delay(2000).fadeOut();
        }
        angular.element(homeTwoMainContent).removeClass('loader');
      });
    }

    if($stateParams.consultantionId != undefined){
      $scope.consultantionId = $stateParams.consultantionId;
      $scope.doctorId = $stateParams.doctorId;
      $scope.hospitalId = $stateParams.hospitalId;
      $scope.findPrescription();
    } 

    if($rootScope.medicineData == undefined) {
      apiService.listObject("medicine", {}, function(response) {
        $scope.medicineData = response.items;
      });      
    } else {
      $scope.medicineData = $rootScope.medicineData;
    }

    $scope.vitalSetupData($scope.doctorObj);
    $scope.chiefcomplainSetupData($scope.doctorObj);
    $scope.historyGroupSetupData($scope.doctorObj);
    $scope.historySetupData($scope.doctorObj);
    $scope.physicalExamGroupSetupData($scope.doctorObj);
    $scope.physicalExamSetupData($scope.doctorObj);
    $scope.investigaionSetupData($scope.doctorObj);
    $scope.diagnosisSetupData($scope.doctorObj)
    $scope.adviceSetupData($scope.doctorObj);
    $scope.getAllFavoriteData();
    $scope.clinicalHistory2SetupData($scope.doctorObj);
    $scope.finalizationSetupData($scope.doctorObj);
    $scope.noteSetupData($scope.doctorObj);
    $scope.shortKeySetupData($scope.doctorObj);
    $scope.opdMedicineSetupData({});
    $scope.flushDeletedList();
    $scope.flushDeletedList();


  //  $scope.getDoctorList();

  }     // End Init Method

  
  // $scope.lastPresDataKey = ["adviceList", "clinicalHistory2List", "physicalExamList", "historyList",
  // "diagnosisList","chiefComplainList","investigationList", "medicineList", "finalizationList", "note", "vital"];   

  $scope.lastPresDataKey = ["medicineList", "clinicalHistory2List","chiefComplainList","investigationList","diagnosisList","adviceList"]; 

  $scope.onLoadOldPres =  function(object){
    let obj = {"consultationId": object.consultationId};
    var myEl = document.getElementById("homeTwoMainTableContent");
    angular.element(myEl).addClass('loader');
    apiService.findObject("prescription/search", obj, function(response) {
      console.log("prescription/search", response);
      if(response.success) {
        angular.forEach($scope.lastPresDataKey, function(listName){
            var customeArr = []
            angular.forEach($scope[listName], function(item) {
              if(item.id != undefined) {
                item.isDeleted = 1;
                if($scope[listName + 'Delete']){
                  $scope[listName + 'Delete'].push(item);
                }
              } 
            })      
            if(response.model[listName] != null) {
              angular.forEach(response.model[listName], function(resItem) {
                delete resItem["inReportSerial"];
                delete resItem.id;
                customeArr.push(resItem);
              });
            } 
            $scope[listName] = customeArr;
            console.log(listName,$scope[listName]);
            console.log(listName + 'Delete',$scope[listName + 'Delete']);
        });

        $scope.note.prescritionData = response.model.note != null ? response.model.note.prescritionData : "";
        $scope.bindPhysicalExamData($scope.removeId(response.model.physicalExamList));
        $scope.bindHistoryPrescriptionData($scope.removeId(response.model.historyList));
        $scope.bindFinalizeData($scope.removeId(response.model.finalizationList));
        $scope.bindAllNotesPrescriptionData($scope.removeId(response.model.allNotesList));
      }
      angular.element(myEl).removeClass('loader');
    });
  } 

  $scope.onPrintOldPres = function(object) {
    let url;
    url = serverUrl + "/api/report/prescription?prescriptionId=" + object.prescriptionId + "&pClient=bsh&pLayout="+ $rootScope.logedUserInfo.reportLink; 
    window.open(url, '_blank');
  }


$scope.saveOrUpdatePresData = function(){
  $scope.isSaveFromTab = true;
//  console.log("Update prescription data");
 // $scope.onSave();
}

$scope.flushDeletedList = function(){
  $scope.adviceListDelete = [];
  $scope.medicineListDelete = [];
  $scope.diagnosisListDelete  = [];
 // $scope.refDoctorListDelete  = [];
  $scope.investigatListDelete   = [];
  $scope.chiefComplainListDelete  = [];
  $scope.clinicalHistory2ListDelete = [];
}

$scope.onSave = function(){
  $scope.isDisableSaveBtn = true;

  if($scope.patient != undefined) {
    let obj = {};
    obj.prescription  = {
      "hospitalId"     : $scope.patient.hospitalNo, 
      "consultationNo" : $scope.patient.consultationNo, 
      "consultationId" : $scope.patient.consultationId,
      "appointmentNo"  : $scope.patient.appointmentNo,                          
      "doctorNo"       : $scope.userNo,
      "isPatientOut"   : $scope.prescription.isPatientOut,
      "modifiedDate"   : new Date(),
      "modifiedBy"     : $rootScope.logedUserInfo.empName,
      "createdDate"    : $scope.prescription.createdDate != undefined ? $scope.prescription.createdDate : new Date(),
      "createdBy"      : $scope.prescription.createdBy != undefined ? $scope.prescription.createdBy : $rootScope.logedUserInfo.empName,
    };
    obj.note                 = $scope.note.prescritionData == undefined? {} : $scope.note;
    obj.vitalList            = $scope.makeVitalList($scope.vitalData)
    obj.finalizationList     = $scope.makeFinalizeList($scope.finalizationData)
    obj.physicalExamList     = $scope.makePhysicalExamList($scope.physicalExamData)
    obj.historyList          = $scope.makeHistoryList($scope.historyData)
    obj.allNotesList         = $scope.makeAllNotesList()
    obj.adviceList           = $scope.adviceList.concat($scope.adviceListDelete);
    obj.medicineList         = $scope.medicineList.concat($scope.medicineListDelete);
    obj.diagnosisList        = $scope.diagnosisList.concat($scope.diagnosisListDelete);
   // obj.refDoctorList        = $scope.refDoctorList.concat($scope.refDoctorListDelete);
    obj.investigationList    = $scope.investigatList.concat($scope.investigatListDelete);
    obj.chiefComplainList    = $scope.chiefComplainList.concat($scope.chiefComplainListDelete);
    obj.clinicalHistory2List = $scope.clinicalHistory2List.concat($scope.clinicalHistory2ListDelete);
    console.log("Prescription Obj :",obj);
    var myEl = document.getElementById("homeTwoMainTableContent");
    angular.element(myEl).addClass('loader');
    if($scope.prescription.id == undefined){
        apiService.createObject("prescription", obj, function(response) {
        if(response.success) {
          $scope.assignPrescriptionDetailData (response.model);
         // $scope.findPrescription();
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
     //$scope.findPrescription(); 
      if($scope.isSaveFromTab==false){ 
        $scope.successMessage = "Prescription Update successfully !";
        $('#successMessage').show().delay(2000).fadeOut();   
      }      
      var myEl = document.getElementById("homeTwoMainTableContent");
      angular.element(myEl).removeClass('loader');
      $scope.isDisableSaveBtn = false;
      $scope.flushDeletedList();
    } else {
      $scope.alertMessage = "Update failed! Please contact with administrator.";
      $('#alertMessage').show().delay(2000).fadeOut();
      var myEl = document.getElementById("homeTwoMainTableContent");
      angular.element(myEl).removeClass('loader');
      $scope.isDisableSaveBtn = false;
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
  console.log("onSelect",obj);
  if(obj.prescritionData=="" && obj.prescritionData==undefined && obj.brandName==""){
       $scope.alertMessage = "Empty information will be not added !";
       $('#alertMessage').show().delay(2000).fadeOut();
    return;
  } 
  $scope[listName].push(obj);
  if(obj.new == 1){
    console.log("Form on save",obj);
    if(obj.prescritionDataType != 14){
      $scope.onSaveObj(obj);
    }
  }
  if($scope.selectedMedication){
    $scope.selectedMedication = "";
  }
}

$scope.selectedMedication = undefined;

$scope.onSelectedMedication = function ($item, $model, $label) {
    console.log("selected medication ",$item);
};

$scope.onSelectHistory = function(object){
  console.log('onSelectHistory', object);
  let obj = {doctor_no : object.doctorNo, consultationId : object.consultationId};
  apiService.findObject("consulation/findByConsultationId", obj, function(response) {
    if(response.success) {
      $scope.ctrl.patient = response.obj;
      let obj = {"consultationId": object.consultationId};
      apiService.findObject("prescription/search", obj, function(response) {
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
          $scope.ctrl.historyList = response.model.historyList;
          $scope.ctrl.prescription = response.model.prescription;
         // $scope.ctrl.refDoctorList = response.model.refDoctorList;
         // console.log('onSelectHistory Response:',response);
          modalOpen('clinicalRecord');
        }
      });          
    }
  });
}

$scope.onDelete = function(index, listName){
  if($scope[listName][index].id == undefined){
    $scope[listName].splice(index, 1);
    return;
  }
  $scope[listName][index].isDeleted = 1;
  $scope[listName + 'Delete'].push($scope[listName][index]);
  $scope[listName].splice(index, 1);
  var list = $scope[listName];
  console.log(list);
}


// $scope.onDelete = function(index, listName){
//   console.log("onDelete Current:",$scope[listName], index);
//   if($scope[listName][index].id == undefined){
//     $scope[listName].splice(index, 1);
//     return;
//   } 
//   $scope[listName][index].isDeleted = 1;
// }

//*************************Start Favoirit List Create Remove Reload***********************//
$scope.getAllFavoriteData = function() {
  var postData = {id : $scope.userNo};
  var querystring = $rootScope.encodeQueryData(postData);
  apiService.listObjectWithQueryParams("user-data-preferences", querystring, function(response) {

    if(response.success && response.items != null){
      $scope.favInvestigatList       = $filter('filter')(response.items, {'userPrefDataType' : 1}, true);
      $scope.favMedicineList         = $filter('filter')(response.items, {'userPrefDataType' : 4}, true);
      $scope.favDiagnosisList        = $filter('filter')(response.items, {'userPrefDataType' : 6}, true);
      $scope.favChiefComplainList    = $filter('filter')(response.items, {'userPrefDataType' : 7}, true);
      $scope.favAdviceList           = $filter('filter')(response.items, {'userPrefDataType' : 8}, true);
      $scope.favClinicalHistory2List = $filter('filter')(response.items, {'userPrefDataType' : 9}, true);
    }
  });
}

$scope.onReloadFavorit = function(listName, dataType) { 
  var postData = {id : $scope.userNo};
  var querystring = $rootScope.encodeQueryData(postData);
  apiService.listObjectWithQueryParams("user-data-preferences", querystring, function(response) {
    if(response.success){
      $scope[listName] = $filter('filter')(response.items, {'userPrefDataType' : parseInt(dataType, 10)}, true);
    }
  });
}

$scope.onMakeFavorit = function(object, listName) {
 
  let obj = {};
  obj.route                        = object.route               != undefined ? object.route : "";
  obj.userNo                       = $scope.userNo;
  obj.userPrefDataType             = object.prescritionDataType != undefined ? object.prescritionDataType : "";
  obj.userPrefDataValue            = object.prescritionData     != undefined ? object.prescritionData : "";
  obj.userPrefDataBrandName        = object.brandName           != undefined ? object.brandName : "";
  obj.userPrefDataForm             = object.form                != undefined ? object.form : "";
  obj.userPrefDataStrength         = object.strength            != undefined ? object.strength : "";
  obj.userPrefDataDosage           = object.dosage              != undefined ? object.dosage : "";
  obj.userPrefDataDuration         = object.duration            != undefined ? object.duration : "";
  obj.medicineComment              = object.medicineComment     != undefined ? object.medicineComment : "";
  obj.userPrefDataRelationWithMeal = object.relationWithMeal    != undefined ? object.relationWithMeal : "";
  obj.genericName                  = object.genericName         != undefined ? object.genericName : "";
  obj.referenceId                  = object.referenceId         != undefined ? object.referenceId : 0;
  $scope[listName].push(obj);
  apiService.createObject("user-data-preferences", obj, function(response) {
    if(response.success){
      $scope.successMessage = "Favorite Added Successfully."; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.onReloadFavorit(listName, object.prescritionDataType);
    }else{
       $scope.alertMessage = "Favorite Not Added!";
       $('#alertMessage').show().delay(2000).fadeOut();
    }
  });
}

$scope.onRemoveFavorit = function(obj, listName, index) {
  var postData = {id : obj.id};
  var querystring = $rootScope.encodeQueryData(postData);
  apiService.deleteObjectWithQueryParams("user-data-preferences", querystring, function(response){
    if(response.success){
      $scope.successMessage = "Successfully remove Item !"; 
      $('#successMessage').show().delay(2000).fadeOut();       
      $scope.onReloadFavorit(listName, obj.userPrefDataType);
    }
  });
}

$scope.addFavoriteToList = function(object, listName,event) {
      if(event == "NO"){
    	  return;
      }
	  let obj = {};
	  if($scope[listName].indexOf(object) == -1){
	    obj.prescritionData = object.userPrefDataValue;
	    obj.prescritionDataType = object.userPrefDataType;
	    obj.brandName = object.userPrefDataBrandName;
	    obj.form = object.userPrefDataForm;
	    obj.strength = object.userPrefDataStrength;
	    obj.brandName = object.userPrefDataBrandName;
	    obj.duration = object.userPrefDataDuration;
	    obj.relationWithMeal = object.userPrefDataRelationWithMeal;
	    obj.dosage = object.userPrefDataDosage;
	    obj.route = object.route;
	    obj.medicineComment = object.medicineComment;
	    obj.genericName = object.genericName;
      obj.referenceId = object.referenceId;
	    $scope[listName].push(obj);
	  }

  
}

//*************************End Favoirit List Create Remove Reload***********************//

$scope.onSaveObj = function(object){
  let obj = {};
  let apiUri="";
  obj.doctorNo = $scope.userNo;
  if(object.prescritionDataType===7){
    apiUri = "chiefcomplain";
    obj.chiefComName = object.prescritionData;
  }else if(object.prescritionDataType===9){
    apiUri = "clinical-history";
    obj.clinicalHistory = object.prescritionData;
  }else if(object.prescritionDataType===6){
    apiUri = "diagnosis";
    obj.diagnosisName = object.prescritionData;
  }else if(object.prescritionDataType===8){
    apiUri = "advice";
    obj.shortCode = object.prescritionData;
    obj.adviceEng = object.prescritionData;
    obj.adviceLocal = object.prescritionData;
  }

  obj.userPrefDataNo = (object.referenceId != undefined && object.referenceId != "")? object.referenceId : 0;
  obj.userPrefDataType = object.prescritionDataType != undefined ? object.prescritionDataType : "";
  obj.userPrefDataValue = object.prescritionData != undefined? object.prescritionData : "";
  obj.userNo = $scope.userNo;
  apiService.createObject(apiUri, obj, function(response) {
    if(response.success){
      if(obj.userPrefDataType===9){
        $scope.clinicalHistory2SetupData($scope.doctorObj);
      }else if(obj.userPrefDataType===7){
        $scope.chiefcomplainSetupData($scope.doctorObj);
      }else if(obj.userPrefDataType===6){
        $scope.diagnosisSetupData($scope.doctorObj); 
      }else if(obj.userPrefDataType===8){
        $scope.adviceSetupData($scope.doctorObj);
      }
    }
  });
}

// $scope.bindVitalData = function(vitalList) {
//   angular.forEach(vitalList, function(item) {
//     var obj = $filter('filter')($scope.vitalData, {'vitalName':item.vitalName})[0];
//     if(obj != undefined){
//       obj.newId = item.id;
//       obj.vitalResult = item.vitalResult;
//       obj.defaultValue = item.defaultValue;
//     } else {
//       let obj = {};
//       obj.newId = item.id;
//       obj.vitalName = item.vitalName;
//       obj.vitalResult = item.vitalResult;
//       obj.defaultValue = item.defaultValue;
//       $scope.vitalData.push(obj);
//     }
//   });
// }

// $scope.makeVitalList = function(array) {
//   console.log('makeVitalList array:',array)
//   let jsonArr = [];
//   angular.forEach(array, function(arrItem) {
//     if(arrItem.vitalResult != undefined){
//       let jsonData = {
//         'vitalEntity':{}
//       };        
//       jsonData.id = arrItem.newId;
//       jsonData.vitalName   = arrItem.vitalName;
//       jsonData.vitalUnit   = arrItem.vitalUnit;
//       jsonData.vitalResult = arrItem.vitalResult;
//       jsonData.vitalEntity.id   = arrItem.id;
//       console.log('makeVitalList pushdata:',jsonData)
//       jsonArr.push(jsonData);
//     }
//   });
//   return jsonArr;    
// }


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
      if(data.vitalEntity != null && data.vitalEntity.id == item.id){
        item.newId                = data.id;
        item.vitalResult          = data.vitalResult;
        item.presVitalcreatedDate = data.createdDate
        item.presVitalcreatedBy   = data.createdBy;
      } else if(data.vitalName === item.vitalName){
        item.newId                = data.id;
        item.vitalResult          = data.vitalResult;
        item.presVitalcreatedDate = data.createdDate
        item.presVitalcreatedBy   = data.createdBy;
      }
    });
  });
}


$scope.bindFinalizeData = function(finalizationList) {
  angular.forEach($scope.finalizationData, function(item) {
    angular.forEach(finalizationList, function(data) {
      if(data.finalizationEntity != null && data.finalizationEntity.id == item.id){
        item.newId = data.id;
        item.finalizeResult = data.finalizeResult;
        item.createdDate = data.createdDate;
        item.createdBy = data.createdBy;
      } else if(data.finalizeName === item.finalizeName){
        item.newId = data.id;
        item.finalizeResult = data.finalizeResult;
        item.createdDate = data.createdDate;
        item.createdBy = data.createdBy;
      }
    });
  });
}


$scope.makeFinalizeList = function(array) {
  let jsonArr = [];
  angular.forEach(array, function(arrItem) {
    if(arrItem.finalizeResult != undefined){
      let jsonData = {
        "finalizationEntity":{}
      };        
      jsonData.id = arrItem.newId;
      jsonData.finalizationEntity.id= arrItem.id;
      jsonData.finalizeName   = arrItem.finalizeName;
      jsonData.finalizeResult = arrItem.finalizeResult;
      jsonData.inReportSerial = arrItem.serial;
      console.log('finalizationEntity pushdata:',jsonData)
      jsonArr.push(jsonData);
    }
  });
  return jsonArr;    
}

  // new Method 
  $scope.bindPhysicalExamData = function(physicalExamList) {
    angular.forEach($scope.physicalExamData, function(item) {
      angular.forEach(physicalExamList, function(data) {
        if(data.physicalExam != null && data.physicalExam.id == item.id){
          item.seveItemId = data.id;
          item.examResult = data.examResult;
          item.createdDate = data.createdDate;
          item.createdBy = data.createdBy;
        } else if(data.examName === item.examName){
          item.seveItemId = data.id;
          item.examResult = data.examResult;
          item.createdDate = data.createdDate;
          item.createdBy = data.createdBy;
        }
      });
    });
  }

  // new Method 
  $scope.bindHistoryPrescriptionData = function(historyList) {
    angular.forEach($scope.historyData, function(item) {
      angular.forEach(historyList, function(data) {
        if(data.history != null && data.history.id == item.id){
          item.seveItemId = data.id;
          item.historyResult = data.historyResult;
          item.createdDate = data.createdDate;
          item.createdBy = data.createdBy;
        } else if(data.historyName === item.historyName){
          item.seveItemId = data.id;
          item.historyResult = data.historyResult;
          item.createdDate = data.createdDate;
          item.createdBy = data.createdBy;
          item.createdBy = data.createdBy;
        }
      });
    });
  }

  $scope.makeHistoryList = function(array) {
    let jsonArr = [];
    angular.forEach(array, function(arrItem) {
      let jsonData = {};   
      if(arrItem.historyResult != undefined){     
        jsonData.id = arrItem.seveItemId;
        jsonData.historyName   = arrItem.historyName;
        jsonData.historyResult = arrItem.historyResult;
        jsonData.historyDataType = arrItem.historyDataType;
        jsonData.historyGroup = arrItem.historyGroup.id;
        jsonData.history = arrItem.id;
        jsonData.inReportSerial = arrItem.historySerial;
        jsonArr.push(jsonData);
      }
    });
    return jsonArr;    
  }

  $scope.bindAllNotesPrescriptionData = function(allNoteList) {
    angular.forEach(allNoteList, function(item) {
      let obj = {};
      if(item.notesDataType == 1){
        $scope.investigationNote = item;
      }else if(item.notesDataType == 4){
        $scope.medicineNote = item;
      }else if(item.notesDataType == 5){
        $scope.generalNote = item;
      }
    });
  }

  $scope.investigatListData = [
    {"groupName" : "Lipid Profile","attribute" : "LDL","result" : "1.5" },
    {"groupName" : "Lipid Profile","attribute" : "HDL","result" : "1.5" },
    {"groupName" : "Lipid Profile","attribute" : "TG","result" : "125" },
    {"groupName" : "Lipid Profile","attribute" : "Total Cholesterol","result" : "1.5" }
  ];

  $scope.invetigatonShow = false;
  $scope.onSelectNote = function(scope){
    if($scope[scope]){
      $scope[scope] = false;
    } else {
      $scope[scope] = true;
    }
  }

  $scope.addInvestNote = function(obj) {
    if($scope.investigationNote.notesData == undefined){
      $scope.investigationNote.notesData = "";
    }
    $scope.investigationNote.notesData = $scope.investigationNote.notesData + (obj.attr + " : " + obj.result + ", ");
  }

$scope.resetTemplateHead = function(){
     $scope.note.noteName=undefined;
}

$scope.saveAsTemplate  = function() {
    if($scope.note.prescritionData == undefined){
      $scope.alertMessage = "Template body should must have a value !";
      $('#alertMessage').show().delay(2000).fadeOut();
      return;
    }
    if($scope.note.noteName == undefined){
      $scope.alertMessage = "Template Name must have a value !";
      $('#alertMessage').show().delay(2000).fadeOut();
      return;
    }
    let obj = {};
        obj.doctorNo = $scope.userNo;
        obj.noteName = $scope.note.noteName;
        obj.noteDescription = $scope.note.prescritionData;

    apiService.createObject("note", obj, function(response){
      $scope.successMessage = "Clinical history added as Template Successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut();  
      apiService.listObject("note", {doctorNo:$scope.userNo}, function(response){
      $scope.clinicalHistoryList = response.items;
    });            
  });
  $scope.note.prescritionData = obj.noteDescription;
  CKEDITOR.instances['editor'].setData(obj.noteDescription);
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

$scope.lastPresData = function(){
  if($scope.patient == undefined){
    $scope.alertMessage = "Please add Patient from worklist !";
    $('#alertMessage').show().delay(2000).fadeOut();
    return;
  }
  let obj = { hospitalId: $scope.hospitalId };
  apiService.findObject("prescription/findPreviousConsulation", obj    , function(response){
    $scope.lastPresInfo = response.model;
    console.log("lastPresInfo",$scope.lastPresInfo);
    if($scope.lastPresInfo==null){
      $scope.alertMessage = "This is a new patient !";
      $('#alertMessage').show().delay(2000).fadeOut();
      return;
    }
    angular.forEach($scope.lastPresDataKey, function(key) {
      if(key==='finalizationList') {
        $scope.bindFinalizeData($scope.removeId($scope.lastPresInfo[key]));
      } else if(key==='physicalExamList') {
        $scope.bindPhysicalExamData($scope.removeId($scope.lastPresInfo[key]));
      } else if(key === 'historyList') {
        $scope.bindHistoryPrescriptionData($scope.removeId($scope.lastPresInfo[key]));
      } else if(key === 'allNotesList') {
        $scope.bindAllNotesPrescriptionData($scope.removeId($scope.lastPresInfo[key]));
      } else { 
        if($scope.lastPresInfo[key]!=null) {
          $scope[key] = $scope.removeId($scope.lastPresInfo[key]);
        }      
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

$scope.shortKeySetupData = function (obj) {
  apiService.listObject("shortKey", obj, function(response){
    $scope.shortKeyData = response.items;
    angular.forEach($scope.shortKeyData, function(data){
      engObj[data.shortCode] = data.shortValEng;
      localObj[data.shortCode] = data.shortValLocal;
    })
    for(var key in basicNumbers) {
        localObj[key] = basicNumbers[key];
    }
    //console.log("shortKeyData", $scope.shortKeyData);
    //console.log("shortKey", engObj);
  }); 
}

$scope.vitalSetupData = function (obj) {
  apiService.listObject("vital", obj, function(response){
    $scope.vitalData = response.items;
  }); 
}

$scope.noteSetupData = function (obj) {
  apiService.listObject("note", obj, function(response){
    $scope.clinicalHistoryList = response.items;
  }); 
}

$scope.chiefcomplainSetupData = function(obj){
  apiService.listObject("chiefcomplain", obj, function(response){
    $scope.chiefComplainData = response.items;
  });  
}

$scope.historyGroupSetupData = function (obj) {
  apiService.listObject("history-group", obj, function(response){
    $scope.historyGroupList = response.items;
  });
}

$scope.historySetupData = function (obj) {
  apiService.listObject("history", obj, function(response){
    $scope.historyData = response.items;
  }); 
}

$scope.finalizationSetupData = function (obj) {
  apiService.listObject("finalization", obj, function(response){
    $scope.finalizationData = response.items;
  }); 
}
$scope.physicalExamGroupSetupData = function (obj) {
  apiService.listObject("physical-exam-group", obj, function(response){
    $scope.physicalExamGroupList = response.items;
  });
}
$scope.physicalExamSetupData = function (obj) {
  apiService.listObject("physical-exam", obj, function(response){
    $scope.physicalExamData = response.items;
  }); 
}

$scope.investigaionSetupData = function (obj) {
  apiService.listObject("investigation", {}, function(response){
    $scope.investigatData = response.items;
  });
}
$scope.clinicalHistory2SetupData = function(obj){
  apiService.listObject("clinical-history", obj, function(response){
    $scope.clinicalHistory2Data = response.items;
  });
} 

$scope.diagnosisSetupData = function(obj){
  apiService.listObject("diagnosis", obj, function(response){
    $scope.diagnosisData = response.items;
  });  
} 
$scope.adviceSetupData = function(obj){
  apiService.listObject("advice", obj, function(response){
    $scope.adviceData = response.items;
  });  
}

$scope.getDoctorList = function (obj) {
  apiService.listObjectWithCompleteUrl("/api/doctorWisePscrip/doctorList", obj, function(response){
    if(response.success){
      angular.forEach(response.items, function(item){
        let nameAndDept  = ""
        if(item.dpecialization!=null){
          nameAndDept = item.doctorName+' \nDept: '+item.dpecialization;
        }else{
          nameAndDept = item.doctorName;
        }
        item.nameAndDept = nameAndDept;
      });
      $scope.doctorData = response.items;
    }
    //console.log("Final doctorData",$scope.doctorData);
  }); 
}

$scope.opdMedicineSetupData = function(obj) {
  if(dataCacheService.getCache('medicineList') == null){
    apiService.listObject("opd-medicine", obj, function(response){
      dataCacheService.setCache('medicineList', response.items);
      $scope.opdMedicineData = dataCacheService.getCache('medicineList');
      //console.log("opdMedicineData :",$scope.opdMedicineData);
    });  
  } else {
    $scope.opdMedicineData = dataCacheService.getCache('medicineList');
    console.log("opdMedicine Storage :",$scope.opdMedicineData);
  }
}

$scope.labInvesListShow = true;
$scope.nonLabInvesListShow = false;
  $scope.showInvesData = function(scope1, scope2){
    if(!$scope[scope1]){
      $scope[scope1] = true;
      $scope[scope2] = false;
    } else if(!$scope[scope2]){
      $scope[scope1] = false;
      $scope[scope2] = true;
    }
  }
$scope.investReport = function(){
  var querystring = $rootScope.encodeQueryData({hnNumber: $scope.hospitalId});

  apiService.findObjectWithParams("lab-nonlab-report/labReportList", querystring, function(response){
    $scope.labReportList = response.items;
    console.log($scope.labReportList);
  }); 

  apiService.findObjectWithParams("lab-nonlab-report/nonLabReportList", querystring, function(response){
    $scope.nonLabReportList = response.items;
    console.log($scope.nonLabReportList);
  }); 
}

  $scope.labInvestDetail = function(obj){
    let querystring = $rootScope.encodeQueryData({"regNumber" : obj.regNo, "itemNo" : obj.itemNo});  
    apiService.findObjectWithParams("lab-nonlab-report/labInvestigationDetailList", querystring, function(response){
      $scope.labInvestigationDetailList = response.items;
      console.log($scope.labInvestigationDetailList);
    }); 
  }
  $scope.nonLabInvestDetail = function(obj){
    let querystring = $rootScope.encodeQueryData({"invoiceNo" : obj.regNo, "itemNo" : obj.itemNo});  
    apiService.findObjectWithParams("lab-nonlab-report/nonLabInvestigationDetailList", querystring, function(response){
      $scope.nonLabInvestigationDetailList = response.items;
      console.log($scope.nonLabInvestigationDetailList);
    }); 
  }




  $scope.makePhysicalExamList = function(array) {
    let jsonArr = [];
    angular.forEach(array, function(arrItem) {
      let jsonData = {};   
      if(arrItem.examResult != undefined){
        jsonData.id = arrItem.seveItemId ;
        jsonData.examName   = arrItem.examName;
        jsonData.examResult = arrItem.examResult;
        jsonData.examDataType = arrItem.examDataType;
        jsonData.inputType = arrItem.inputType;
        jsonData.examGroup = arrItem.examGroup.id;
        jsonData.physicalExam = arrItem.id;
        jsonData.inReportSerial = arrItem.examSerial;
        jsonArr.push(jsonData);
      }
    });
    return jsonArr;    
  }
  


  $scope.makeAllNotesList = function() {
    let jsonArr = [];
    if($scope.investigationNote.notesData !=  undefined){
      let obj = {};
      obj=$scope.investigationNote;
      jsonArr.push(obj);
    }
    if($scope.medicineNote.notesData !=  undefined){
      let obj = {};
      obj=$scope.medicineNote;
      jsonArr.push(obj);
    }
    if($scope.generalNote.notesData !=  undefined){
      let obj = {};
      obj=$scope.generalNote;
      jsonArr.push(obj);
    }
    console.log("makeAllNotesList", jsonArr);
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

$scope.getMatchingMedicines = function($viewValue) {
    var matchingMedicines = [];
    matchingMedicines = $filter('filter')($scope.opdMedicineData, {'brandName' : $viewValue.toUpperCase()});
    return matchingMedicines;
}
$scope.getMatchingGenericMedicines = function($viewValue) {
    var matchingMedicines = [];
    matchingMedicines = $filter('filter')($scope.opdMedicineData, {'genericName' : $viewValue.toUpperCase()});
    return matchingMedicines;
}

$scope.shortcutkey = function(inputStr, ev){
  if($scope.bnDose) {
      numbers = localObj;
  } else {
      numbers = engObj;
  }
  if(ev.keyCode==32){
    var inputStrArr = inputStr.split(" ");
    var lastStr = inputStrArr[inputStrArr.length - 1];
    var output = [];
    if (numbers.hasOwnProperty(lastStr)) {
        inputStrArr[inputStrArr.length - 1] = numbers[lastStr];
    } else {
        for(var i = 0; i < lastStr.length; ++i){
            if (numbers.hasOwnProperty(lastStr[i])) {
                output.push(numbers[lastStr[i]]);
            } else {
                output.push(lastStr[i]);
            }
        }
        inputStrArr[inputStrArr.length - 1] = output.join('');
    }
    document.getElementById(ev.target.id).value = inputStrArr.join(' ') + " ";
  }
}


$scope.UpDown = function(idPrefix, index ,ev) {
  console.log(index);
  ev.preventDefault();
  if(ev.keyCode == 40 && document.getElementById(idPrefix+ (index+2)) !== null){
      // console.log("Arrow Down")
      document.getElementById(idPrefix+ (index+2)).focus();
  } else if(ev.keyCode == 38 && document.getElementById(idPrefix + (index + 2 - 1)) !== null && document.getElementById(idPrefix + (index)) != null){
      // console.log("Arrow Up")
      document.getElementById(idPrefix + (index)).focus();
  }
}

  $scope.sortableOptions = {
    stop: function (e, ui) {
      for (var i in $scope.medicineList) {
        if($scope.medicineList[i].isDeleted != 1){
          $scope.medicineList[i].inReportSerial = Number(i) + 1;
        }
      }
    }
  }

}]

});
