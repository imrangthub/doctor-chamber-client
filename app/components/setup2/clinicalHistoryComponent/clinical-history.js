app.component('clinicalHistoryController', {
	templateUrl: 'app/components/setup2/clinicalHistoryComponent/clinical-history.html',
	controllerAs: 'model',
  	controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  	var model = this;
  	var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

    this.$onInit = function() {
	    $scope.userNo = $rootScope.logedUserInfo.userNo;
	    $scope.obj = {};
	    $scope.dtInstance = {};
	    $scope.gridUrl = "/api/clinical-history/gridList";
    }
    
	this.initGrid1 = function(){
		var refreshPaging = true;
		$scope.dtInstance.reloadData(callback, refreshPaging);
	    function callback() {
	        console.log('table reloaded');
	    }		 
	}

	$scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
	    'ajax', {
	    url: serverUrl + "/api/clinical-history/gridList",
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
		        $scope.obj = aData;
		    });
		});
		return nRow;
	});
	
	$scope.dtColumns = [
        //here We will add .withOption('name','column_name') for send column name to the server 
        DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('defaultContent', ' ').notSortable(),
        DTColumnBuilder.newColumn("clinicalHistory", "Clinical History")
        .withOption('name', 'clinicalHistory')
        .withOption('width', '80%')
    ];
	  
	$scope.reload = function () {
		var resetPaging = true;
		$scope.dtInstance.reloadData(undefined,resetPaging);
	}

	$scope.add = function() {
		if(!$scope.obj.clinicalHistory){
          	$scope.alertMessage = "Please Enter Clinical History!";
         	$('#alertMessage').show().delay(2000).fadeOut();
        } else {   
          	$scope.obj.doctorNo = $scope.userNo;
          	console.log($scope.obj);
          	if($scope.obj.id == undefined){
          		apiService.createObject("clinical-history", $scope.obj, function(response){
               		$scope.successMessage = "Clinical History Saved Successfully!"; 
               		$('#successMessage').show().delay(2000).fadeOut(); 
  	           		$scope.reset();              
               		$scope.reload();
		        });
          	} else {
          		apiService.updateObject("clinical-history", $scope.obj, function(response){
            		$scope.successMessage = "Clinical History Update Successfully!"; 
            		$('#successMessage').show().delay(2000).fadeOut(); 
  	           		$scope.reset();              
              		$scope.reload();
		        });
            }
        }
	}

	$scope.delete = function() {
	    var postData = {id : $scope.obj.id};
	    var querystring = $rootScope.encodeQueryData(postData);
	    apiService.deleteObjectWithQueryParams("clinical-history", querystring, function(response){
	        $scope.successMessage = "Clinical History Delete Successfully!"; 
	        $('#successMessage').show().delay(2000).fadeOut(); 
	        $scope.reload();
	    });
	}

	$scope.reset = function () {
	  	$scope.obj = {};
	}

  	}]
});
