app.component('illnessHistory', {
    templateUrl : 'app/components/setup/subSetup/illnessHistory.html',
    bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', function($rootScope,$scope, apiService, $filter, DTOptionsBuilder, DTColumnBuilder) {
  var model = this;
  var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

  this.$onInit = function() {
    $scope.illnessHistoryList = [];
    $scope.userNo = $rootScope.logedUserInfo.userNo;
    $scope.illnessHistory = {};
    $scope.selectedIllnessHistory= {};
    $scope.dtInstance = {};
  };



  


  }]
});