app.component('chiefComponent', {
    templateUrl : 'app/components/setup/subSetup/chiefComplain.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

  this.$onInit = function() {
  	$scope.chiefComplainList = [];
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.chiefComplain = {};
    $scope.selectedChiefComplain = {};
    $scope.dtInstance = {};
    $("#initGtid").click(function(){
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
      url: serverUrl+"/api/chiefcomplain/gridList",
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
              $scope.selectedChiefComplain = aData;
               $scope.chiefComplain = aData;
              console.log("Selected Row data:",$scope.selectedChiefComplain);
          });
      });
  return nRow;
  });
  $scope.dtColumns = [
          //here We will add .withOption('name','column_name') for send column name to the server 
          DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
          DTColumnBuilder.newColumn("chiefComName", "Complain Name")
          .withOption('name', 'chiefComName')
          .withOption('width', '80%')
      ];
  
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
  
  //====================== End DataTable Configuration =====================================

  $scope.addChiefComplain = function() {
    console.log("addChiefComplain data:",$scope.chiefComplain);
    	var obj = {};
		if(!$scope.chiefComplain.chiefComName){
          $scope.alertMessage = "Please Enter chief complain  name !";
         $('#alertMessage').show().delay(2000).fadeOut();
        }else{   
          obj.doctorNo = $scope.userNo;
          obj.chiefComName = $scope.chiefComplain.chiefComName;
          if($scope.chiefComplain.id == undefined){
          	apiService.createObject("chiefcomplain", obj, function(response){
               $scope.successMessage = "Chief complain  added successfully !"; 
               $('#successMessage').show().delay(2000).fadeOut(); 
               $scope.reloadData();
  	           $scope.chiefComplain = {};               
		        });
          }else{
          	obj.id = $scope.chiefComplain.id;
          	apiService.updateObject("chiefcomplain", obj, function(response){
             $scope.successMessage = "Chief complain  Update successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
              $scope.reloadData();
	            $scope.chiefComplain = {};               
		        });
          }
        }
  }

$scope.deleteChiefComplain = function() {
    console.log("deleteChiefComplain");
    var postData = {chiefComId : $scope.selectedChiefComplain.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("chiefcomplain", querystring, function(response){
        $scope.successMessage = "Chief complain delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.reloadData();
     });
  }

$scope.resetChiefComplain = function () {
  console.log("resetChiefComplain");
  $scope.chiefComplain = {};
}

  }]
});