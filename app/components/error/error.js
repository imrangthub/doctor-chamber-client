app.component('errorController', {
  templateUrl: 'app/components/error/error.html',
  controllerAs: 'model',
  controller: ['$http', '$location', '$rootScope', '$scope', function($http, $location, $rootScope, $scope) {
  var model = this;
  
 
 


$.fn.extend ( {
    timeTarget: function(offSet) {
         
      },
  
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
