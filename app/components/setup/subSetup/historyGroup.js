app.component('historyGroupComponent', {
    templateUrl : 'app/components/setup/subSetup/historyGroup.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.historyGroupList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.historyGroup = {};
	$scope.selectedHistoryGroup = {};
	$scope.dtInstance = {};
};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/history-group/gridList",
    type:"POST",
    data: userObj,
    dataSrc: function(response){
     // console.log("history-group response:",response)
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
            $scope.selectedHistoryGroup = aData;
             $scope.historyGroup = aData;
          //  console.log("Selected Row data:",$scope.selectedHistoryGroup);
        });
    });
return nRow;
});
$scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("groupName", "Group Name").withOption('name', 'groupName'),
        DTColumnBuilder.newColumn("serial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'serial')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditHistoryGroup = function() {
  //console.log("HistoryGroup data:",$scope.historyGroup);
    var obj = {};

  if(!$scope.historyGroup.groupName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.groupName = $scope.historyGroup.groupName;
        obj.serial = $scope.historyGroup.serial;
        obj.isShowHeader = $scope.historyGroup.isShowHeader;
        obj.isEnable = $scope.historyGroup.isEnable;
        if($scope.historyGroup.id == undefined){
          apiService.createObject("history-group", obj, function(response){
             $scope.successMessage = "historyGroup Group added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.historyGroup = {};               
          });
        }else{
          obj.id = $scope.historyGroup.id;
          apiService.updateObject("history-group", obj, function(response){
           $scope.successMessage = "History Group Group Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.historyGroup = {};               
          });
        }
      }
};

$scope.deleteHistoryGroup = function() {
  var postData = {historyGroupId : $scope.selectedHistoryGroup.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("history-group", querystring, function(response){
      $scope.successMessage = "History Group delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};

$scope.resetHistoryGroup = function() {
  $scope.historyGroup = {};
};


  }]
});