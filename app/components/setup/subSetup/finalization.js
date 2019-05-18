app.component('finalizationComponent', {
    templateUrl : 'app/components/setup/subSetup/finalization.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.finalizationList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.finalization = {};
	$scope.selectedFinalization = {};
	$scope.dtInstance = {};
};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/finalization/gridList",
    type:"POST",
    data: userObj,
    dataSrc: function(response){
     // console.log("finalization response:",response)
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
            $scope.selectedFinalization = aData;
             $scope.finalization = aData;
           // console.log("Selected Row data:",$scope.selectedFinalization);
        });
    });
return nRow;
});
$scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("finalizeName", "Finalize Name").withOption('name', 'finalizeName'),
        DTColumnBuilder.newColumn("finalizePlaceHolder", "Place Holder").withOption('name', 'finalizePlaceHolder'),
        DTColumnBuilder.newColumn("serial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'serial'),
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditFinalization = function() {
 // console.log("addEditFinalization data:",$scope.finalization);
    var obj = {};
  if(!$scope.finalization.finalizeName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.finalizeName = $scope.finalization.finalizeName;
        obj.serial = $scope.finalization.serial;
        obj.finalizePlaceHolder = $scope.finalization.finalizePlaceHolder;
        obj.isEnable = $scope.finalization.isEnable;
        obj.inputType = $scope.finalization.inputType;
        if($scope.finalization.id == undefined){
          apiService.createObject("finalization", obj, function(response){
             $scope.successMessage = "Finalize added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.finalization = {};               
          });
        }else{
          obj.id = $scope.finalization.id;
          apiService.updateObject("finalization", obj, function(response){
           $scope.successMessage = "Finalize Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.finalization = {};               
          });
        }
      }
};

$scope.deleteFinalization = function() {
  var postData = {finalizId : $scope.selectedFinalization.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("finalization", querystring, function(response){
      $scope.successMessage = "Finalize delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};


$scope.resetFinalization = function() {
  $scope.finalization = {};
};


  }]
});