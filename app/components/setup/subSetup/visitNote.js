app.component('visitnoteComponent', {
	templateUrl : 'app/components/setup/subSetup/visitNote.html',
  bindings: {data: "=", page: "="},
	controller: ['$rootScope','$scope',"apiService", '$filter','DTOptionsBuilder', 'DTColumnBuilder', function($rootScope, $scope, apiService, $filter,  DTOptionsBuilder, DTColumnBuilder) {
	var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

 this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.visitNoteList = [[]];
    $scope.visitNote = {};
    $scope.selectedVisitNote = {};
    $scope.dtInstance = {};
  };

  $scope.selectVisitNote = function(obj){
	$scope.selectedVisitNote = obj; 
  };

  //====================== DataTable Configuration =====================================
  $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
    'ajax', {
        url: serverUrl+"/api/note/gridList",
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
              $scope.selectedVisitNote = aData;
               $scope.visitNote = aData;
            //  console.log("Selected Row data:",$scope.selectedVisitNote);
          });
      });
  return nRow;
  });
  $scope.dtColumns = [
          //here We will add .withOption('name','column_name') for send column name to the server 
          DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
          DTColumnBuilder.newColumn("noteName", "Note")
          .withOption('name', 'noteName')
          .withOption('width', '80%')
      ];
  $scope.reloadData = function () {
    var resetPaging = true;
    $scope.dtInstance.reloadData(undefined,resetPaging);
  }
  //====================== End DataTable Configuration =====================================

  $scope.saveOrUpdateVisitNote = function() {
  	var editorText = CKEDITOR.instances['editor'].getData();
  	$scope.visitNote.noteDescription = editorText;
    var obj = {};
    if(!$scope.visitNote.noteName){
        $scope.alertMessage = "Please Enter Visit note name !";
        $('#alertMessage').show().delay(2000).fadeOut();
    }else{   
        obj.doctorNo = $scope.userNo;
        obj.noteName = $scope.visitNote.noteName;
        obj.noteDescription = $scope.visitNote.noteDescription;
        if($scope.visitNote.id == undefined){
           apiService.createObject("note", obj, function(response){
		        $scope.successMessage = "Visit note added successfully !"; 
		        $('#successMessage').show().delay(2000).fadeOut();  
		        $scope.visitNote = {};
		        CKEDITOR.instances['editor'].setData("");
	          $scope.reloadData();             
	        });
        }else{
        	obj = $scope.visitNote; 
            apiService.updateObject("note", obj, function(response){
		        $scope.successMessage = "Visit note Update successfully !"; 
		        $('#successMessage').show().delay(2000).fadeOut();   
		        $scope.visitNote = {};
		        CKEDITOR.instances['editor'].setData("");
	          $scope.reloadData();           
	        });
        }
    }
  };

  $scope.listOfVisitNote = function() {
    var obj = {doctorNo : $scope.userNo};
    apiService.listObject("note", obj, function(response){
     // console.log("Note List  response data:",response);
      $scope.visitNoteList = response.items;
    }); 
  };

  $scope.editVistiNote = function(obj) {
  	CKEDITOR.instances['editor'].setData(obj.noteDescription);
  	$scope.visitNote = obj; 
   // console.log("editVistiNote data:",$scope.visitNote);
     
  };

  $scope.deleteVistiNote = function() {
    var postData = {noteId : $scope.selectedVisitNote.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("note", querystring, function(response){
        $scope.successMessage = "Visit Note delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.reloadData(); 
     });
  };

//for ckeditor=================
  initSample();
//end for ckeditor================

	
  }]
});

