app.component('patientComponent', {
  templateUrl : 'app/components/setup/subSetup/patient.html',
  bindings: {
    data: "=",
    page: "="
  },
  controllerAs:'model',
  controller: ['$rootScope','$scope',"apiService", '$filter',  'DTOptionsBuilder', 'DTColumnBuilder', function GreetUserController($rootScope, $scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder ) {
  var model = this;

	this.$onInit = function() {
	    $scope.userNo = $rootScope.logedUserInfo.userNo;
	    $scope.patientList = [[]];
	    $scope.patient = {};
	    $scope.selectedPatient = {};
	};

  model.initClick = function(){
    console.log("Click in Patient.");
  }

  $scope.selectPatient = function(obj){
    $scope.selectedPatient = obj;
    console.log("selectPatient :",obj);  
  };

  $scope.deletePatient = function(){
    console.log("deletePatient :",$scope.selectedPatient);  
  };
  
  $("tr").click(function(){
	    $(this).addClass("activetable").siblings().removeClass("activetable");
	});

//====================== DataTable Configuration =====================================
    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
       	'ajax', {
        url: serverUrl+"/api/consulation/gridList",
        type:"POST",
        dataSrc: function(response){
    	 console.log(response);
         // return response.obj.data;
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
    .withOption('fnRowCallback',function(nRow, aData, iDisplayIndex){ 
    	$("td:first", nRow).html(iDisplayIndex +1); // for serial number   	  
        $('td', nRow).unbind('click');  // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', nRow).bind('click', function(){
            $scope.$apply(function() {
                $scope.selectedPatient = aData;
                console.log("Selected Row Obj",$scope.selectedPatient);
            });
        });
    return nRow;
    });
    $scope.dtColumns = [
            //here We will add .withOption('name','column_name') for send column name to the server 
            DTColumnBuilder.newColumn(null).withTitle('SL #').withOption('width', '10%').withOption('defaultContent', ' ').notSortable(),
            DTColumnBuilder.newColumn("hospitalNo", "Hp No").withOption('name', 'hospital_number'),
            DTColumnBuilder.newColumn("patientName", "Patient Name").withOption('name', 'full_name'),
            DTColumnBuilder.newColumn("age", "Age").withOption('name', 'age'),
            DTColumnBuilder.newColumn("gender", "Gender ").withOption('name', 'sex'),
            DTColumnBuilder.newColumn("consultationId", "Consultation Id"),
            DTColumnBuilder.newColumn("phoneNo", "Phone No").withOption('name', 'mobile')
        ]
    //====================== DataTable Configuration =====================================

  }]
});