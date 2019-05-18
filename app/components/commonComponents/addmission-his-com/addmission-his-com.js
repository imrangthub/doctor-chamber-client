app.component('addmissionHisCom', {
  templateUrl: 'app/components/homeFour/addmission-his-com/addmission-his-com.html',
  controllerAs: 'model',
    controller: ['$rootScope','$scope',"apiService", '$filter', function($rootScope,$scope, apiService, $filter) {
      var model = this;

      this.$onInit = function() {
        $scope.addHistoryList = [
          {"addDate" : "12-12-2017", "addNo" : "C11810100122", "consultant" : "Dr. Pratik Dewan (Endocrinology & Internal Medical)"},
          {"addDate" : "12-12-2017", "addNo" : "C11810100122", "consultant" : "Dr. Pratik Dewan (Endocrinology & Internal Medical)"},
          {"addDate" : "12-12-2017", "addNo" : "C11810100122", "consultant" : "Dr. Pratik Dewan (Endocrinology & Internal Medical)"},
          {"addDate" : "12-12-2017", "addNo" : "C11810100122", "consultant" : "Dr. Pratik Dewan (Endocrinology & Internal Medical)"},
          {"addDate" : "12-12-2017", "addNo" : "C11810100122", "consultant" : "Dr. Pratik Dewan (Endocrinology & Internal Medical)"},
        ];    
      }    
    }]
});
