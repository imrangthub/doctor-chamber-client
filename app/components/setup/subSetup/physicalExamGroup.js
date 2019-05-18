app.component('physicalExamGroupComponent', {
    templateUrl : 'app/components/setup/subSetup/physicalExamGroup.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.physicalExamGroupList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.physicalExamGroup = {};
	$scope.selectedPhysicalExamGroup = {};
	$scope.dtInstance = {};
};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/physical-exam-group/gridList",
    type:"POST",
    data: userObj,
    dataSrc: function(response){
     // console.log("physical-exam-group response:",response)
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
            $scope.selectedPhysicalExamGroup = aData;
             $scope.physicalExamGroup = aData;
           // console.log("Selected Row data:",$scope.selectedPhysicalExamGroup);
        });
    });
return nRow;
});
$scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("groupName", "Physical Exam Group Name").withOption('name', 'groupName'),
        DTColumnBuilder.newColumn("serial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'serial')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditPhysicalExamGroup = function() {
 // console.log("PhysicalExamGroup data:",$scope.physicalExamGroup);
    var obj = {};

  if(!$scope.physicalExamGroup.groupName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.groupName = $scope.physicalExamGroup.groupName;
        obj.serial = $scope.physicalExamGroup.serial;
        obj.isShowHeader = $scope.physicalExamGroup.isShowHeader;
        obj.isEnable = $scope.physicalExamGroup.isEnable;
        if($scope.physicalExamGroup.id == undefined){
          apiService.createObject("physical-exam-group", obj, function(response){
             $scope.successMessage = "Physical Exam Group added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.physicalExamGroup = {};               
          });
        }else{
          obj.id = $scope.physicalExamGroup.id;
          apiService.updateObject("physical-exam-group", obj, function(response){
           $scope.successMessage = "Physical Exam Group Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.physicalExamGroup = {};               
          });
        }
      }
};

$scope.deletePhysicalExamGroup = function() {
  var postData = {examgroupId : $scope.selectedPhysicalExamGroup.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("physical-exam-group", querystring, function(response){
      $scope.successMessage = "Physical Exam Group delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};


$scope.resetPhysicalExamGroup = function() {
  $scope.physicalExamGroup = {};
};


  }]
});