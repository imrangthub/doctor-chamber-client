app.component('autoCompleteComponent', {
    templateUrl : 'app/components/setup/subSetup/autoComplete.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
  $scope.userNo = $rootScope.logedUserInfo.userNo;
  $scope.autoComplete = {};
  $scope.selectedAutoComplete= {};
  $scope.dtInstance = {};
 // $scope.autoComplete.autoComType = 4;
}; 



//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/autoComplete/gridList",
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
            $scope.selectedAutoComplete = aData;
            $scope.autoComplete = aData;
            console.log("Selected Row data:",$scope.selectedAutoComplete);
        });
    });
return nRow;
});
$scope.dtColumns = [
        //here We will add .withOption('name','column_name') for send column name to the server 
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("autoKey", "Auto Complete Key")
        .withOption('name', 'autoKey')
        .withOption('width', '20%'),
        DTColumnBuilder.newColumn(null, "Auto Complete Type")
        .withOption('width', '20%')
        .renderWith(function (obj, type, full, meta) {
              if(obj.autoComType===1){
                    return '<span>Advice</span>';  
                  }else if(obj.autoComType ===2){
                    return '<span>Chief Complain</span>';  
                  }else if(obj.autoComType ===3){
                    return '<span>Diagnosis</span>';  
                  }else{
                    return '<span>History</span>';  
                  }                
        }),
        DTColumnBuilder.newColumn("autoComValEng", "Auto Complete Value in English")
        .withOption('width', '20%'),
        DTColumnBuilder.newColumn("autoComValLocal", "Auto Complete Value in Bangla")
        .withOption('width', '20%')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditAutoComplete = function() {
  console.log("addEditAutoComplete data:",$scope.autoComplete);
    var obj = {};
  if(!$scope.autoComplete.autoKey){
        $scope.alertMessage = "Please Enter Auto Complete Code  !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        obj.doctorNo = $scope.userNo;
        obj.autoKey = $scope.autoComplete.autoKey;
        obj.autoComType = $scope.autoComplete.autoComType;
        obj.autoComValEng = $scope.autoComplete.autoComValEng;
        obj.autoComValLocal = $scope.autoComplete.autoComValLocal;

        if($scope.autoComplete.id == undefined){
          apiService.createObject("autoComplete", obj, function(response){
             $scope.successMessage = "Auto Complete added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
            $scope.resetAutoComplete();             
          });
        }else{
          obj.id = $scope.autoComplete.id;
          apiService.updateObject("autoComplete", obj, function(response){
           $scope.successMessage = "Auto Complete  Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
           $scope.resetAutoComplete();             
          });
        }
      }
};

$scope.deleteAutoComplete = function() {
  console.log("deleteAutoComplete");
  var postData = {reqId : $scope.selectedAutoComplete.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("autoComplete", querystring, function(response){
      $scope.successMessage = "Auto Complete delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};

$scope.resetAutoComplete = function () {
  $scope.autoComplete = {autoComType:0};
  console.log("resetAutoComplete");
};


  }]
});