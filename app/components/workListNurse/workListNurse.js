app.component('worklistNurseController', {
  templateUrl: 'app/components/workListNurse/workListNurse.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$http', '$location', '$rootScope', '$scope',"apiService", '$filter', '$rootScope', '$state', function($http, $location, $rootScope, $scope, apiService, $filter, $rootScope, $state) {
  var model = this;
  this.$onInit = function() {
    $scope.doctorList = [];
    $scope.getDoctorList({});

    $scope.worklistSearchParamsFromDate = $rootScope.worklistSearchFromDate;
    $scope.worklistSearchParamsToDate = $rootScope.worklistSearchToDate;



 
  }
    $scope.worklistSearchDoctorName =  $rootScope.worklistSearchDoctorName;
    
    $scope.consultationStatus = $rootScope.consultationStatus;
    $scope.searchParms = {};
    $scope.worklistSearchParams = {};
    $scope.selectedDoctor = {};
    $scope.actvConstData = {};
    $scope.filteredpatientsbyAppointed = {};
    $scope.filteredpatientsbyCompleted = {};
    $scope.filteredpatientsbyConsultation = {};
    $scope.filteredpatientsbyWait = {};
    $scope.filteredPatientsbyMorningShift = {};
    $scope.filteredPatientsbyEveningShift = {};
    $scope.patients=[];
    
    $scope.logedUserInfo = JSON.parse(localStorage.getItem("loginInfo")); 


  $scope.setDateForSearchPatient = function(){
    console.log("worklistSearchParamsFromDate:",$scope.worklistSearchParamsFromDate);
    console.log("worklistSearchParamsToDate:",$scope.worklistSearchParamsToDate);
    $rootScope.worklistSearchFromDate = $scope.worklistSearchParamsFromDate;
    $rootScope.worklistSearchToDate = $scope.worklistSearchParamsToDate;
    $scope.searchPatient(); 
  }
  $scope.worklistSearchParams = {doctorNo:$rootScope.worklistSearchDoctorNo, shiftdtlNo: $rootScope.worklistSearchShiftdtlNo};
    
    $scope.searchPatient = function(){
      var myEl = document.getElementById("workListMainTableContent");
      angular.element(myEl).addClass('loader');
      $rootScope.worklistSearchDoctorNo = $scope.worklistSearchParams.doctorNo;
      $rootScope.worklistSearchShiftdtlNo = $scope.worklistSearchParams.shiftdtlNo;
      var postData = {doctorNo : $rootScope.worklistSearchDoctorNo , fromDate: $rootScope.worklistSearchFromDate, toDate: $rootScope.worklistSearchToDate, shiftdtlNo:$rootScope.worklistSearchShiftdtlNo};
      if($rootScope.worklistSearchShiftdtlNo>0){
        var postData = {doctorNo : $rootScope.worklistSearchDoctorNo, fromDate: $rootScope.worklistSearchFromDate, toDate: $rootScope.worklistSearchToDate, shiftdtlNo:$rootScope.worklistSearchShiftdtlNo};
      }else{
        var postData = {doctorNo : $rootScope.worklistSearchDoctorNo, fromDate: $rootScope.worklistSearchFromDate, toDate: $rootScope.worklistSearchToDate};
      }
      var querystring = encodeQueryData(postData);
      apiService.searchWorklist("consulation", querystring, function(response){
        //console.log("Work list Search response:",response);
        if(response.success){
          $scope.patients = response.items;
          $scope.filteredpatientsbyConsultation = $filter('filter')($scope.patients, function(vc) {return vc.consultationNo !=0});
          $scope.filteredpatientsbyAppointed = $filter('filter')($scope.patients, {consultationNo: 0});
          $scope.filteredpatientsbyCompleted = $filter('filter')($scope.patients, {consult_out: 1});
          $scope.filteredpatientsbyWait = $filter('filter')($scope.patients, {consult_in: 1, consult_out: 0});
          $scope.filteredpatientsbyReportCheck = $filter('filter')($scope.patients, {consultationType: 4});
          $scope.filteredpatientsbyNewPatient = $filter('filter')($scope.patients, {consultationType: 1});
          $scope.filteredpatientsby1stFollowUp = $filter('filter')($scope.patients, {consultationType: 2});
          $scope.filteredPatientsbyMorningShift = $filter('filter')($scope.patients, {shiftdtlNo: 1});
          $scope.filteredPatientsbyEveningShift = $filter('filter')($scope.patients, {shiftdtlNo: 2});
          $scope.actvConstData = $scope.patients[0];
          angular.element(myEl).removeClass('loader');
        } else {
          angular.element(myEl).removeClass('loader');              
        }
      });
    };

    $scope.searchDoctor = function(){
      return $scope.doctorList;
    }
 
    $scope.getSelectedDoctor = function($item, $model, $label){
       $rootScope.worklistSearchDoctorName = $scope.worklistSearchDoctorName;
       $scope.worklistSearchParams.doctorNo = $item.doctorNo;
       $scope.searchPatient(); 
     
    }


  $scope.$watch('consultationStatus',function () {
    //console.log("Filter Status by:",$scope.consultationStatus);
    $rootScope.consultationStatus = $scope.consultationStatus;
    $scope.consultationStatusColor="";
    if($scope.consultationStatus==='complted') {
      $scope.searchParms = {};
      $scope.searchParms.consult_out = 1;
      $scope.actvConstData = $scope.filteredpatientsbyCompleted[0];        
    }else if($scope.consultationStatus==='appointed') {
      $scope.searchParms = {};
      $scope.searchParms.consultationId = null;
      $scope.actvConstData = $scope.filteredpatientsbyAppointed[0];
    }else if($scope.consultationStatus==='waiting') {
      $scope.searchParms = {};
      $scope.searchParms.consult_in = 1;
      $scope.searchParms.consult_out = 0;
      $scope.actvConstData = $scope.filteredpatientsbyWait[0];
    }else if($scope.consultationStatus==='reportCheck') {
      $scope.searchParms = {};
      $scope.searchParms.consultationType = 4;
      $scope.actvConstData = $scope.filteredpatientsbyReportCheck[0];
    }else if($scope.consultationStatus==='newPatient') {
      $scope.searchParms = {};
      $scope.searchParms.consultationType = 1;
      $scope.actvConstData = $scope.filteredpatientsbyNewPatient[0];
    } else if($scope.consultationStatus==='1stFollowUp') {
      $scope.searchParms = {};
      $scope.searchParms.consultationType = 2;
      $scope.actvConstData = $scope.filteredpatientsby1stFollowUp[0];
    } else {
      $scope.actvConstData = $scope.patients[0];
      $scope.searchParms = {};
      if($scope.searchParms.consult_in==1 && $scope.searchParms.consult_out==1){
        $scope.consultationStatusColor = "complted";
      }
      if($scope.searchParms.consult_in==1 && $scope.searchParms.consult_out==0){
        $scope.consultationStatusColor = "waiting";
      }
    }
  });
  
  $scope.searchPatient();
  $scope.selectWorkListRow = function(obj) {
    $scope.actvConstData = obj;
    console.log("Selected  Work list Obj; ",obj);
  };

  $scope.startPrescription = function(obj) {
    if(obj.consultationId == null){
      $scope.alertMessage = "Consultation Fees Not Paid Yet!";
      $('#alertMessage').show().delay(2000).fadeOut();
      return;
    }
    let object = {hospitalId : obj.hospitalNo, doctorId : obj.doctor_no, consultantionId : obj.consultationId};
    $state.go('homenewnurse', object); 
  }

  $scope.getDoctorList = function (obj) {
    apiService.listObjectWithCompleteUrl("/api/doctorWisePscrip/doctorList", obj, function(response){
      $scope.doctorList = response.items;
      console.log("doctorList",response);
    }); 
  }

  function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  };



    //===================date_piker=====================
  $(function () {
    $("#datepicker").datepicker({ 
      format : 'dd/mm/yyyy',
          autoclose: true, 
          todayHighlight: true
    }).datepicker('update', new Date());
  });
  //=============================select row js=================== 
  $('#worklist tbody').on('click', 'tr', function () {
        $('#worklist tbody tr').removeClass("activetable");
        $(this).addClass("activetable");

      });
    
    $('#worklist tbody').on('click', 'tr', function () {
        $('#worklist tbody tr').removeClass("activetable");
        $(this).addClass("activetable");
      });

  //=================================all_modal_js===============

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

