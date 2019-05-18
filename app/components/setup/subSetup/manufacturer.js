app.component('manufacturer', {
    templateUrl : 'app/components/setup/subSetup/manufacturer.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.manufacturerList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.manufacturer = {};
	$scope.selectedManufacturer = {};
	$scope.dtInstance = {};
  $("#initManufactureGtid").click(function(){
      model.initGrid();
  })
 };
this.initGrid = function(){
    var refreshPaging = true;
    $scope.dtInstance.reloadData(callback, refreshPaging);
      function callback() {
          console.log('table reloaded');
      }
  }


  //====================== DataTable Configuration =====================================
  $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
      'ajax', {
      url: serverUrl+"/api/manufacturer/gridList",
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
  .withOption("deferLoading", 0) // for server side processing
  .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
  .withDisplayLength(10) // Page size
  .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
   .withOption('autoWidth', false)
  .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){ 
    $("td:first", nRow).html(iDisplayIndex +1); // for serial number      
      $('td', nRow).unbind('click');  // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
      $('td', nRow).bind('click', function(){
          $scope.$apply(function() {
              $scope.selectedManufacturer = aData;
               $scope.manufacturer = aData;
              console.log("Selected Row data:",$scope.selectedManufacturer);
          });
      });
  return nRow;
  });
  $scope.dtColumns = [
          //here We will add .withOption('name','column_name') for send column name to the server 
          DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
          DTColumnBuilder.newColumn("manufactName", "Name")
          .withOption('name', 'manufactName')
          .withOption('width', '80%')
      ];
  
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
  
  //====================== End DataTable Configuration =====================================

$scope.addEditManufacturer = function() {
    console.log("addEditManufacturer data:",$scope.manufacturer);
	var obj = {};
	if(!$scope.manufacturer.manufactName){
      $scope.alertMessage = "Please Enter Manufacturer name !";
     $('#alertMessage').show().delay(2000).fadeOut();
    }else{   
      obj.manufactName = $scope.manufacturer.manufactName;
      obj.description = $scope.manufacturer.description;
      if($scope.manufacturer.id == undefined){
      	apiService.createObject("manufacturer", obj, function(response){
      	   $scope.manufacturer = {};  
           $scope.successMessage = "Manufacturer  added successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
           $scope.reloadData();             
	    });
      }else{
      	obj.id = $scope.manufacturer.id;
      	apiService.updateObject("manufacturer", obj, function(response){
      	   $scope.manufacturer = {};  
           $scope.successMessage = "Manufacturer Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
           $scope.reloadData();             
	    });
      }
    }
};


$scope.deleteManufacturer = function () {
   	console.log("deleteManufacturer");
   	var requestData = {manufacturerId : $scope.selectedManufacturer.id};
    var querystring = $rootScope.encodeQueryData(requestData);
       apiService.deleteObjectWithQueryParams("manufacturer", querystring, function(response){
       	$scope.selectedManufacturer = {};
        $scope.successMessage = "Chief complain delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.reloadData();
    });
};

$scope.resetManufacturer = function () {
   	$scope.manufacturer = {};
   	console.log("resetManufacturer");
};

  }]
});