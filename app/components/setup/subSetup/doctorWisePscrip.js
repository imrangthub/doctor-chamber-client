app.component('doctorWisePscripComponent', {
    templateUrl : 'app/components/setup/subSetup/doctorWisePscrip.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
  $scope.userNo = $rootScope.logedUserInfo.userNo;
  $scope.presTemplateList = [];
  $scope.presFormList = [];
  $scope.listOfPresTemplate();
  $scope.listOfPresFrom();

  $scope.doctorWisePscrip = {
    "presReportEntity":{},
    "presFormEntity":{}
  };
  $scope.selectedDoctorWisePscrip = {
    "presReportEntity":{},
    "presFormEntity":{}
  };
  $scope.dtInstance = {};
}; 


//====================== DataTable Configuration =====================================

    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
        'ajax', {
        url: serverUrl+"/api/doctorWisePscrip/gridList",
        type:"POST",
        dataSrc: function(response){
         response.draw = response.obj.draw;
         response.recordsTotal = response.obj.recordsTotal;
         response.recordsFiltered = response.obj.recordsFiltered;
         return response.obj.data;
        }
    })
    .withOption('lengthMenu', [10,20,50, 100, 150, 200])
    .withOption('processing', true) //for show progress bar
    .withOption('serverSide', true) // for server side processing
    .withPaginationType('full_numbers') // for get full pagination options // first / last / prev / next and page numbers
    .withDisplayLength(10) // Page size
    .withOption('aaSorting',[0,'asc']) // for default sorting column // here 0 means first column
    .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){ 
      $("td:first", nRow).html(iDisplayIndex +1); // for serial number      
        $('td', nRow).unbind('click');  // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', nRow).bind('click', function(){
            $scope.$apply(function() {
                $scope.selectedDoctorWisePscrip = aData;
              //  console.log("Selected Row Obj",$scope.selectedDoctorWisePscrip);
                 $scope.findDoctorWisePresByDoctorId();
            });
        });
    return nRow;
    });
    $scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
            DTColumnBuilder.newColumn("doctorId", "Doctor Id").withOption('name', 'doctorId'),
/*            DTColumnBuilder.newColumn("doctorNo", "Doctor No").withOption('name', 'doctorNo'),*/
            DTColumnBuilder.newColumn("doctorName", "Doctor Name").withOption('name', 'doctorName')
        ]
    //====================== DataTable Configuration =====================================


$scope.listOfPresTemplate = function() {
	apiService.listObject("presReport", {}, function(response){
	  $scope.presTemplateList = response.items;
	}); 
};

$scope.listOfPresFrom = function() {
	apiService.listObject("presForm", {}, function(response){
	  $scope.presFormList = response.items;
	}); 
};

$scope.updateDoctorWisePscrip = function() {
  var obj = {};
  if(!$scope.doctorWisePscrip.presReportEntity.id && !$scope.doctorWisePscrip.presFormEntity.id){
        $scope.alertMessage = "Please Select a Template !";
       $('#alertMessage').show().delay(2000).fadeOut();
        $scope.resetDoctorWisePscrip();
      }else{  
        apiService.updateObject("doctorWisePscrip", $scope.doctorWisePscrip, function(response){
           $scope.successMessage = "Template Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
           $scope.resetDoctorWisePscrip();    
         });

      }
};

$scope.findDoctorWisePresByDoctorId = function(){
var postData = {doctorId : $scope.selectedDoctorWisePscrip.doctorId};
var querystring = $rootScope.encodeQueryData(postData);
    apiService.findObjectWithQueryParams("doctorWisePscrip", querystring, function(response){
    $scope.doctorWisePscrip.doctorNo = $scope.selectedDoctorWisePscrip.doctorNo;
    $scope.doctorWisePscrip.doctorId = $scope.selectedDoctorWisePscrip.doctorId;
    $scope.doctorWisePscrip.doctorName = $scope.selectedDoctorWisePscrip.doctorName;
    $scope.doctorWisePscrip.isEnable = response.isEnable;

    if(response.presFormEntity != undefined ){
      $scope.doctorWisePscrip.presFormEntity.id = response.presFormEntity.id;
    }
    if(response.presReportEntity != undefined){
      $scope.doctorWisePscrip.presReportEntity.id = response.presReportEntity.id;
    }

 });
};


$scope.resetDoctorWisePscrip = function () {
   $scope.doctorWisePscrip = {
    "presReportEntity":{id:0},
    "presFormEntity":{id:0}
  };

$scope.selectedDoctorWisePscrip = {
    "presReportEntity":{id:0},
    "presFormEntity":{id:0}
  };
};


  }]
});