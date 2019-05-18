app.component('clinicalHistoryComponent', {
    templateUrl : 'app/components/setup/subSetup/clinicalHistory.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

  this.$onInit = function() {
  	$scope.clinicalHistoryList = [];
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.clinicalHistory = {};
    $scope.selectedClinicalHistory = {};
    $scope.dtInstance = {};
    $("#initGtidClinicalHistory").click(function(){
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
      url: serverUrl+"/api/clinical-history/gridList",
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
  //.withOption("deferLoading", 0) // for server side processing
  .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
  .withDisplayLength(10) // Page size
  .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
   .withOption('autoWidth', false)
  .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){ 
    $("td:first", nRow).html(iDisplayIndex +1); // for serial number      
      $('td', nRow).unbind('click');  // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
      $('td', nRow).bind('click', function(){
          $scope.$apply(function() {
              $scope.selectedClinicalHistory = aData;
               $scope.clinicalHistory = aData;
              console.log("Selected Row data:",$scope.selectedClinicalHistory);
          });
      });
  return nRow;
  });
  $scope.dtColumns = [
          //here We will add .withOption('name','column_name') for send column name to the server 
          DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
          DTColumnBuilder.newColumn("clinicalHistory", "Clinical History Name")
          .withOption('name', 'clinicalHistory')
          .withOption('width', '80%')
      ];
  
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
  
  //====================== End DataTable Configuration =====================================

  $scope.addClinicalHistory = function() {
    console.log("addClinicalHistory data:",$scope.clinicalHistory);
    	var obj = {};
		if(!$scope.clinicalHistory.clinicalHistoryName){
          $scope.alertMessage = "Please Enter chief complain  name !";
         $('#alertMessage').show().delay(2000).fadeOut();
        }else{   
          obj.doctorNo = $scope.userNo;
          obj.clinicalHistory = $scope.clinicalHistory.clinicalHistoryName;
          if($scope.clinicalHistory.id == undefined){
          	apiService.createObject("clinical-history", obj, function(response){
               $scope.successMessage = "Clinical History  added successfully !"; 
               $('#successMessage').show().delay(2000).fadeOut(); 
               $scope.reloadData();
  	           $scope.clinicalHistory = {};               
		        });
          }else{
          	obj.id = $scope.clinicalHistory.id;
          	apiService.updateObject("chiefcomplain", obj, function(response){
             $scope.successMessage = "Clinical History  Update successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
              $scope.reloadData();
	            $scope.clinicalHistory = {};               
		        });
          }
        }
  }

$scope.deleteClinicalHistory = function() {
    console.log("deleteClinicalHistory");
    var postData = {id : $scope.selectedClinicalHistory.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("clinical-history", querystring, function(response){
        $scope.successMessage = "Clinical History delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.reloadData();
     });
  }

$scope.resetClinicalHistory = function () {
  console.log("ResetclinicalHistory");
  $scope.clinicalHistory = {};
}

  }]
});