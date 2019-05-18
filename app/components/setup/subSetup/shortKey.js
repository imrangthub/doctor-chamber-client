app.component('shortKeyComponent', {
    templateUrl : 'app/components/setup/subSetup/shortKey.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.shortKeyList = [];
  $scope.userNo = $rootScope.logedUserInfo.userNo;
  $scope.shortKey = {};
  $scope.selectedShortKey= {};
  $scope.dtInstance = {};
}; 



//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/shortKey/gridList",
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
            $scope.selectedShortKey = aData;
             $scope.shortKey = aData;
            console.log("Selected Row data:",$scope.selectedShortKey);
        });
    });
return nRow;
});
$scope.dtColumns = [
        //here We will add .withOption('name','column_name') for send column name to the server 
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("shortCode", "Short Key")
        .withOption('name', 'shortCode')
        .withOption('width', '20%'),
        DTColumnBuilder.newColumn("shortValEng", "Short Value in English")
        .withOption('width', '30%'),
        DTColumnBuilder.newColumn("shortValLocal", "Short Value in Bangla")
        .withOption('width', '30%')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditShortkey = function() {
  console.log("addChiefComplain data:",$scope.shortKey);
    var obj = {};
  if(!$scope.shortKey.shortCode){
        $scope.alertMessage = "Please Enter Short Code  !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.shortCode = $scope.shortKey.shortCode;
        obj.shortValEng = $scope.shortKey.shortValEng;
        obj.shortValLocal = $scope.shortKey.shortValLocal;

        if($scope.shortKey.id == undefined){
          apiService.createObject("shortKey", obj, function(response){
             $scope.successMessage = "Short key  added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.shortKey = {};               
          });
        }else{
          obj.id = $scope.shortKey.id;
          apiService.updateObject("shortKey", obj, function(response){
           $scope.successMessage = "Short key  Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.shortKey = {};               
          });
        }
      }
};

$scope.deleteShortkey = function() {
  console.log("deleteShortkey");
  var postData = {reqId : $scope.selectedShortKey.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("shortKey", querystring, function(response){
      $scope.successMessage = "Short key delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};

$scope.resetShortkey = function () {
  $scope.shortKey = {};
  console.log("resetShortkey");
};


  }]
});