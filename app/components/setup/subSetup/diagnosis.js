app.component('diagnosisComponent', {
    templateUrl : 'app/components/setup/subSetup/diagnosis.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter','DTOptionsBuilder', 'DTColumnBuilder', function($rootScope, $scope, apiService, $filter,  DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.diagnosisList = [];
    $scope.filterParms = {};
    $scope.diagnosis = {};
    $scope.editModal = {};
    $scope.deleteModal = {};
    $scope.selectedDiagnosis = {};
    $scope.dtInstance = {};
  };

   //====================== DataTable Configuration =====================================
  $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
        url: serverUrl+"/api/diagnosis/gridList",
        type:"POST",
        data: userObj,
        dataSrc: function(response){
        response.draw = response.obj.draw;
        response.recordsTotal = response.obj.recordsTotal;
        response.recordsFiltered = response.obj.recordsFiltered;
       return response.obj.data;

        }
    })
  .withOption('processing', true) //for show progress bar
  .withOption('serverSide', true) // for server side processing
  .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
  .withDisplayLength(10) // Page size
  .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
   .withOption('autoWidth', false)
  .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){ 
    $("td:first", nRow).html(iDisplayIndex +1); // for serial number      
      $('td', nRow).unbind('click');  // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
      $('td', nRow).bind('click', function(){
          $scope.$apply(function() {
              $scope.selectedDiagnosis = aData;
              console.log("Selected Row data:",$scope.selectedDiagnosis);
          });
      });
  return nRow;
  });
  $scope.dtColumns = [
          //here We will add .withOption('name','column_name') for send column name to the server 
          DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
          DTColumnBuilder.newColumn("diagnosisName", "Diagnosis Name")
          .withOption('name', 'diagnosisName')
          .withOption('width', '80%')
      ];
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
  //====================== End DataTable Configuration =====================================

  $scope.saveDiagnosis = function(){
    if(!$scope.diagnosis.diagnosisName){
      $scope.alertMessage = "Please Enter diagnosis name !";
      $('#alertMessage').show().delay(2000).fadeOut();
    }else{   
      $scope.diagnosis.doctorNo = $rootScope.logedUserInfo.userNo;
      apiService.createObject("diagnosis", $scope.diagnosis, function(response){
        $scope.successMessage = "Diagnosis added successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut();
        $scope.diagnosis = {};
        $scope.reloadData();                 
      });
    }
  };
  $scope.updateDiagnosis = function(){ 
    if(!$scope.selectedDiagnosis.diagnosisName){
         $scope.alertMessage = "Please Enter diagnosis name !";
         $('#alertMessage').show().delay(2000).fadeOut();
    }else{     
      apiService.updateObject("diagnosis", $scope.selectedDiagnosis, function(response){
        $scope.successMessage = "Diagnosis Update successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut();
        $scope.selectedDiagnosis = {};
        $scope.diagnosis = {};
        $scope.reloadData();               
      });
    }
   };
   
  $scope.deleteDiagnosis = function(){
    var postData = {diagnosisId : $scope.selectedDiagnosis.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("diagnosis", querystring, function(response){
        $scope.successMessage = "Diagnosis delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.reloadData();
     });
  };

  }]
});