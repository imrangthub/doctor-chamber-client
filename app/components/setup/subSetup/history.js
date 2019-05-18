app.component('historyComponent', {
    templateUrl : 'app/components/setup/subSetup/history.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.historyList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.history = {
    "historyGroup": {}
     };
    $scope.selectedHistory = {};
	  $scope.historyGroupList = [];
	  $scope.historyGroup = {};
    $scope.dtInstance = {};
 

    $("#initHistoryData").click(function(){
    	$scope.listOrHistoryGrupu(userObj);
    })
};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/history/gridList",
    type:"POST",
    data: userObj,
    dataSrc: function(response){
      console.log("history response:",response)
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
            $scope.selectedHistory = aData;
             $scope.history = aData;
           console.log("Selected Row data:",$scope.selectedHistory);
        });
    });
return nRow;
});
$scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("historyName", "History Name").withOption('name', 'historyName'),
        DTColumnBuilder.newColumn("historyPlaceHolder", "Place Holder").withOption('name', 'historyPlaceHolder'),
        DTColumnBuilder.newColumn("historySerial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'historySerial')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditHistory = function() {
  if(!$scope.history.historyName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        $scope.history.doctorNo = $scope.userNo;
        if($scope.history.id == undefined){
          apiService.createObject("history", $scope.history, function(response){
             $scope.successMessage = "History added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.history = {};               
          });
        }else{
          apiService.updateObject("history", $scope.history, function(response){
           $scope.successMessage = "Physical Exam Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.history = {};               
          });
        }
      }
};

$scope.deleteHistory = function() {
  var postData = {reqId : $scope.selectedHistory.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("history", querystring, function(response){
      $scope.successMessage = "History  delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};


$scope.resetHistory = function() {
  $scope.history = {};
};


$scope.listOrHistoryGrupu = function(userObj) {
  apiService.listObject("history-group", userObj, function(response) {
    $scope.historyGroupList = response.items;
  });
};


  }]
});