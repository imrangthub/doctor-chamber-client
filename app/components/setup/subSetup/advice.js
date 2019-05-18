app.component('adviceComponent', {
    templateUrl : 'app/components/setup/subSetup/advice.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
  $scope.userNo = $rootScope.logedUserInfo.userNo;
  $scope.advice = {};
  $scope.selectedAdvice = {};
  $scope.adviceList = [];
  $scope.dtInstance = {};
}; 



//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/advice/gridList",
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
            $scope.selectedAdvice = aData;
            $scope.advice = aData;
            console.log("Selected Row data:",$scope.selectedAdvice);
        });
    });
return nRow;
});
$scope.dtColumns = [
        //here We will add .withOption('name','column_name') for send column name to the server 
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("shortCode", "Short Code")
        .withOption('name', 'shortCode')
        .withOption('width', '10%'),
        DTColumnBuilder.newColumn("adviceEng", "Advice in English")
        .withOption('width', '20%'),
        DTColumnBuilder.newColumn("adviceLocal", "Advice in Bangla")
        .withOption('width', '20%')
    ];
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
//====================== End DataTable Configuration =====================================

$scope.addEditAdvice = function() {
  console.log("addEditAdvice data:",$scope.advice);
    var obj = {};
  if(!$scope.advice.shortCode){
        $scope.alertMessage = "Please Enter short Code  !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.shortCode = $scope.advice.shortCode;
        obj.adviceEng = $scope.advice.adviceEng;
        obj.adviceLocal = $scope.advice.adviceLocal;

        if($scope.advice.id == undefined){
          apiService.createObject("advice", obj, function(response){
             $scope.successMessage = "Advice added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
            $scope.resetAdvice();             
          });
        }else{
          obj.id = $scope.advice.id;
          apiService.updateObject("advice", obj, function(response){
           $scope.successMessage = "Advice Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
           $scope.resetAdvice();             
          });
        }
      }
};

$scope.deleteAdvice = function() {
  console.log("deleteAutoComplete");
  var postData = {reqId : $scope.selectedAdvice.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("advice", querystring, function(response){
      $scope.successMessage = "Advice delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.resetAdvice(); 
      $scope.reloadData();
   });
};

$scope.resetAdvice = function () {
  $scope.advice = {};
};


  }]
});