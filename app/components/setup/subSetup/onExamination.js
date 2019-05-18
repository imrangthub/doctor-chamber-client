app.component('onExamination', {
    templateUrl : 'app/components/setup/subSetup/onExamination.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.onExaminationList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.onExamination = {};
	$scope.selectedOnExamination= {};
	$scope.dtInstance = {};
};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/vital/gridList",
    type:"POST",
    data: userObj,
    dataSrc: function(response){
      //console.log("VitalResponseForDataTable:",response)
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
            $scope.selectedOnExamination = aData;
             $scope.onExamination = aData;
           // console.log("Selected Row data:",$scope.selectedOnExamination);
        });
    });
return nRow;
});
$scope.dtColumns = [
        //here We will add .withOption('name','column_name') for send column name to the server 
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("vitalSerial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'vitalSerial'),
        DTColumnBuilder.newColumn("vitalName", "Name").withOption('name', 'vitalName'),
        DTColumnBuilder.newColumn("vitalUnit", "Unit").withOption('name', 'vitalUnit')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditOnExamination = function() {
 // console.log("addEditOnExamination data:",$scope.onExamination);
    var obj = {};

  if(!$scope.onExamination.vitalName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.vitalName = $scope.onExamination.vitalName;
        obj.vitalSerial = $scope.onExamination.vitalSerial;
        obj.vitalUnit = $scope.onExamination.vitalUnit;
        obj.inputType = $scope.onExamination.inputType;
        obj.defaultValue = $scope.onExamination.defaultValue;
        obj.isEnable = $scope.onExamination.isEnable;
        if($scope.onExamination.id == undefined){
          apiService.createObject("vital", obj, function(response){
             $scope.successMessage = "Examination added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.onExamination = {};               
          });
        }else{
          obj.id = $scope.onExamination.id;
          apiService.updateObject("vital", obj, function(response){
           $scope.successMessage = "Examination Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.onExamination = {};               
          });
        }
      }
};

$scope.deleteOnExamination = function() {
  var postData = {vitalId : $scope.selectedOnExamination.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("vital", querystring, function(response){
      $scope.successMessage = "On Examination delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};


$scope.resetOnExamination = function() {
  $scope.onExamination = {};
};


  }]
});