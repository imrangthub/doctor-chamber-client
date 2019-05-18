app.component('physicalExamComponent', {
    templateUrl : 'app/components/setup/subSetup/physicalExam.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

this.$onInit = function() {
	$scope.physicalExamList = [];
	$scope.userNo = $rootScope.logedUserInfo.userNo;
	$scope.physicalExam = {
    "examGroup": {}
  };
	$scope.selectedPhysicalExam = {};
  $scope.physicalExamGroupList = [];
  $scope.physicalExamGroup = {};
	$scope.dtInstance = {};


  $("#initPhysicalExamData").click(function(){
     $scope.listOfPhysicalExamGroup(userObj); 
  })

};

//====================== DataTable Configuration =====================================
$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
    url: serverUrl+"/api/physical-exam/gridList",
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
            $scope.selectedPhysicalExam = aData;
             $scope.physicalExam = aData;
           // console.log("Selected Row data:",$scope.selectedPhysicalExam);
        });
    });
return nRow;
});
$scope.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("examName", "Exam Name").withOption('name', 'examName'),
        DTColumnBuilder.newColumn("examUnit", "Exam Unit").withOption('name', 'examUnit'),
        DTColumnBuilder.newColumn("examSerial", "Sl In Pres.").withOption('width', '20%').withOption('name', 'examSerial')
    ];
$scope.reloadData = function () {
  var resetPaging = true;
  $scope.dtInstance.reloadData(undefined,resetPaging);
}
//====================== End DataTable Configuration =====================================

$scope.addEditPhysicalExam = function() {
  if(!$scope.physicalExam.examName){
        $scope.alertMessage = "Please Enter name !";
       $('#alertMessage').show().delay(2000).fadeOut();
      }else{   
        $scope.physicalExam.doctorNo = $scope.userNo;
        if($scope.physicalExam.id == undefined){
          apiService.createObject("physical-exam", $scope.physicalExam, function(response){
             $scope.successMessage = "Physical Exam added successfully !"; 
             $('#successMessage').show().delay(2000).fadeOut(); 
             $scope.reloadData();
             $scope.physicalExam = {};               
          });
        }else{
          apiService.updateObject("physical-exam", $scope.physicalExam, function(response){
           $scope.successMessage = "Physical Exam Update successfully !"; 
           $('#successMessage').show().delay(2000).fadeOut(); 
            $scope.reloadData();
            $scope.physicalExam = {};               
          });
        }
      }
};

$scope.listOfPhysicalExamGroup = function (userObj) {
  apiService.listObject("physical-exam-group", userObj, function(response) {
    $scope.physicalExamGroupList = response.items;
  });
}

$scope.deletePhysicalExam= function() {
  var postData = {examId : $scope.selectedPhysicalExam.id};
  var querystring = $rootScope.encodeQueryData(postData);
     apiService.deleteObjectWithQueryParams("physical-exam", querystring, function(response){
      $scope.successMessage = "Physical Exam  delete successfully !"; 
      $('#successMessage').show().delay(2000).fadeOut(); 
      $scope.reloadData();
   });
};


$scope.resetPhysicalExam = function() {
  $scope.physicalExam = {};
};


  }]
});