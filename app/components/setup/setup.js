app.component('setupController', {
  templateUrl: 'app/components/setup/setup.html',
  controllerAs: 'model',
  controller: ['$http', '$location', '$rootScope', '$scope', function($http, $location, $rootScope, $scope) {
  var model = this;
  
  $scope.reFreshChild = function(param){
    $scope.$broadcast(param); 
  }
  

  $.fn.extend ( {
    timeTarget: function(offSet) {},
  
    timeUser: function() {
        var userTime, 
        userDate;
        
        userTime = new Date();
        userDate = userTime.toDateString(); 
        userTime = userTime.toTimeString();
               
       this.html(userDate + ' ' + userTime.substring(0, 8)); 
    }        
  });
}]

});
