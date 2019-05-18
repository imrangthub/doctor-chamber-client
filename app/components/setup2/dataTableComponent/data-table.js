app.component('dataTableComponent', {
	templateUrl: 'app/components/setup2/dataTableComponent/data-table.html',
	controllerAs: 'model',
  bindings : {
    url: '<'
  },

  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  	var ctrl = this;

    this.$onInit = function() {
      console.log(ctrl.url);
      $scope.userNo = $rootScope.logedUserInfo.userNo;
      $scope.obj = {};
      $scope.dtInstance = {};
    }

    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption(
      'ajax', {
      url: serverUrl + ctrl.url,
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

  }]
});
