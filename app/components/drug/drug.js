app.component('drugController', {
  templateUrl: 'app/components/drug/drug.html',
  controllerAs: 'model',
  controller: ['$http', '$location', '$rootScope', '$scope', "apiService", function($http, $location, $rootScope, $scope, apiService) {
  var model = this;


  this.$onInit = function() {
    $scope.userNo = $rootScope.logedUserInfo.userNo;

    $scope.manufacturerList = [];
    $scope.manufacturer = {};
    $scope.listOfManufacturer();

    $scope.drugGroupList = [];
    $scope.drugGroup = {};
    $scope.selectedDrugGroup = {};
    $scope.listOfDrugGroup();

    $scope.genericList = [];
    $scope.globalGenericList = [];
    $scope.generic = {};
    $scope.selectedGeneric = {};
    $scope.listOfGeneric();

    $scope.drugList = [];
    $scope.drug = {};
    $scope.selectedDrug = {};

  };

  $scope.selecteGenericGlobally = function($item, $model, $label) {
    if($item == undefined){
      $scope.alertMessage = "Please Type a Generic name !";
      $('#alertMessage').show().delay(2000).fadeOut(); 
      return;
    }
    $scope.drugList = [];  
    $scope.listOfDrugByGenericId({id:$item.id}); 
  };

  $scope.listOfManufacturer = function() {
    apiService.listObject("manufacturer", {}, function(response){
      console.log("Manufacturer List  response data:",response);
      $scope.manufacturerList = response.content;
    }); 
  };


  $scope.selectAccordDrugGroup = function(obj){
    $rootScope.currentDrugSetupData.generic = {};
    $scope.selectedGeneric = {};
    $scope.selectedDrugGroup = obj;
    console.log("selectAccordDrugGroup:",obj);  
  };

  $scope.addUpdateDrugGroup = function() {
    console.log("addNewDrugGroup data:",$scope.drugGroup);
    var obj = {};
    if(!$scope.drugGroup.groupName){
        $scope.alertMessage = "Please Enter Group name !";
        $('#alertMessage').show().delay(2000).fadeOut();
      } else{   
        obj.doctorNo = $scope.userNo;
        obj.groupName = $scope.drugGroup.groupName;
        if($scope.drugGroup.id == undefined){
          apiService.createObject("group", obj, function(response){
            $scope.successMessage = "Group added successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut();
            $scope.drugGroup = {};
            $scope.listOfDrugGroup();                
          });
        }else{
          obj.id = $scope.drugGroup.id;
          apiService.updateObject("group", obj, function(response){
            $scope.successMessage = "Group Update successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut();
            $scope.drugGroup = {};
            $scope.listOfDrugGroup();                
          });
        }
    }
  };

  $scope.listOfDrugGroup = function() {
    var obj = {};
    apiService.listObject("group", obj, function(response){
      console.log("Group List  response data:",response);
      $scope.drugGroupList = response.items;
    }); 
  };

  $scope.editDrugGroup = function(obj) {
    $scope.drugGroup = obj;
    console.log("editDrugGroup data:",$scope.drugGroup);
  };


  $scope.deleteDrugGroup = function() {
    console.log("deleteDrugGroup");
    var postData = {groupId : $scope.selectedDrugGroup.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("group", querystring, function(response){
        $scope.successMessage = "Drug group delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
       $scope.listOfDrugGroup();
     });
  };

  $scope.accordDrugGroupClick = function(obj, $event) {
    $rootScope.currentDrugSetupData.drugGroup = obj;
    $scope.listOfGenericByGroupId(obj);
    var acrdiv = angular.element( $event.target.closest(".accordion-container-for-drug-setup"));
    
    angular.forEach(acrdiv.find(".set > .accor_div"), function(value, key){
      var content = angular.element(value);
      if(content.hasClass('active')){
      //  content.removeClass("active");
        content.siblings('.content').slideUp(200);
        content.find("i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
      }

    });
    var accrdDrugGroup = angular.element( $event.target.closest(".set > .accor_div"));
      if(accrdDrugGroup.hasClass('active')){
        accrdDrugGroup.removeClass("active");
        accrdDrugGroup.siblings('.content').slideUp(200);
        accrdDrugGroup.find("i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
      }else{
        accrdDrugGroup.find("i").removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
        accrdDrugGroup.removeClass("active");
        accrdDrugGroup.addClass("active");
        accrdDrugGroup.slideUp(200);
        accrdDrugGroup.siblings('.content').slideDown(200);
      } 
  };
  


  $scope.resetDrugGroup = function() {
    $scope.drugGroup = {};
  };

  //=====================  Generic Operation  ============================

  $scope.listOfGeneric = function() {
    apiService.listObject("generic", {}, function(response){
      $scope.globalGenericList = response.items;
     // console.log("Globallly Generic data:", $scope.globalGenericList );
    }); 
  };


  $scope.listOfGenericByGroupId = function(obj) {
    var obj = {groupNo : obj.id};
    apiService.listObject("generic", obj, function(response){
      console.log("generic List  response data:",response);
      $scope.genericList = response.items;
    }); 
  };

  $scope.selectGeneric = function(obj){
    console.log("selectGeneric data:",obj);
    $scope.generic = obj;
    $rootScope.currentDrugSetupData.generic = obj;
    $scope.selectedGeneric = obj;
    $scope.listOfDrugByGenericId(obj);
  }


  $scope.addUpdateGeneric = function() {
    $scope.generic.groupNo = $rootScope.currentDrugSetupData.drugGroup.id;
    console.log("addUpdateGeneric data:",$scope.generic);
    var obj = {};
       if(!$scope.generic.genericName){
          $scope.alertMessage = "Please Enter Generic name !";
          $('#alertMessage').show().delay(2000).fadeOut();
        } else{   
          obj = $scope.generic;
          if($scope.generic.id == undefined){
            apiService.createObject("generic", obj, function(response){
              $scope.successMessage = "Generic added successfully !"; 
              $('#successMessage').show().delay(2000).fadeOut();
              $scope.generic = {};
             $scope.listOfGenericByGroupId({id:$rootScope.currentDrugSetupData.drugGroup.id});                
            });
          }else{
            obj = $scope.generic;
            apiService.updateObject("generic", obj, function(response){
              $scope.successMessage = "Generic Update successfully !"; 
              $('#successMessage').show().delay(2000).fadeOut();
              $scope.generic = {};
             $scope.listOfGenericByGroupId({id:$rootScope.currentDrugSetupData.drugGroup.id});              
            });
          }
      }
    $scope.generic = {};
  };

  $scope.editGeneric = function(obj) {
    $scope.generic = obj;
    console.log("editGeneric data:",$scope.generic);
  };

  $scope.deleteGeneric = function() {
    console.log("deleteGeneric");
    var postData = {genericId : $scope.generic.id};
    var querystring = $rootScope.encodeQueryData(postData);
       apiService.deleteObjectWithQueryParams("generic", querystring, function(response){
        $scope.successMessage = "Drug group delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.drugList = {}; 
        $scope.listOfGenericByGroupId({id:$rootScope.currentDrugSetupData.drugGroup.id}); 
     });

  };

  $scope.resetGeneric = function() {
    console.log("resetGeneric");
    $scope.generic = {};
  };


//=====================  Medicine Operation  ============================

  $scope.listOfDrugByGenericId = function(obj) {
    var obj = {genericNo : obj.id};
    apiService.listObject("medicine", obj, function(response){
      console.log("listOfDrugByGenericId response data:",response);
      $scope.drugList = response.items;
    }); 
  };

  $scope.selectDrug = function(obj){
    console.log("selectDrug data:", obj);
     $scope.selectedDrug = obj;
    selectedDrug = {};
  }

  $scope.addUpdateDrug = function() {
    var obj={};
        console.log("addDrug Fist data:", $scope.drug);
    if($rootScope.currentDrugSetupData.generic == undefined){
         $scope.alertMessage = "Please Select a Generic For adding Brand !";
        $('#alertMessage').show().delay(2000).fadeOut();
        return;
    }
    if(!$scope.drug.brandName){
        $scope.alertMessage = "Please Enter Brand name !";
        $('#alertMessage').show().delay(2000).fadeOut();
      }else{ 
        if($scope.drug.id == undefined){
          obj = $scope.drug;
          obj.genericNo =  $rootScope.currentDrugSetupData.generic.id;
          obj.preferred = 0;
          console.log("before Save addDrug data:", obj);
          apiService.createObject("medicine", obj, function(response){
            $scope.successMessage = "Brand added successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut();
             $scope.listOfDrugByGenericId({id:$rootScope.currentDrugSetupData.generic.id});
             $scope.drug = {};            
          });
        }else{
          obj = $scope.drug;
          obj.genericNo =  $rootScope.currentDrugSetupData.generic.id;
          obj.preferred = 0;
          console.log("before Update addDrug data:", obj);
          apiService.updateObject("medicine", obj, function(response){
            $scope.successMessage = "Brand Update successfully !"; 
            $('#successMessage').show().delay(2000).fadeOut();
            $scope.listOfDrugByGenericId({id:$rootScope.currentDrugSetupData.generic.id});
            $scope.drug = {};              
          });
        }
    }
  };

  $scope.editDrug = function(obj) {
    console.log("editDrug",obj);
    $scope.drug = obj;
  };

  $scope.deleteDrug = function() {
    console.log("deleteDrug");
    var postData = {medicationId : $scope.selectedDrug.id};
    var querystring = $rootScope.encodeQueryData(postData);
      apiService.deleteObjectWithQueryParams("medicine", querystring, function(response){
        $scope.successMessage = "Drug  delete successfully !"; 
        $('#successMessage').show().delay(2000).fadeOut(); 
        $scope.listOfDrugByGenericId({id:$rootScope.currentDrugSetupData.generic.id});
     });

  };

  $scope.resetDrug = function() {
    $scope.drug = {};
  };

//=====================clock script============================
  var myVar = setInterval(myTimer, 1000);

  function myTimer() {
      var d = new Date();
      if(document.getElementById("clock")){
        document.getElementById("clock").innerHTML = d.toLocaleTimeString();
      }
  }

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

//accordion
// $(document).ready(function(){
//   $(".set > .accor_div").on("click", function(){
//     if($(this).hasClass('active')){
//       $(this).removeClass("active");
//       $(this).siblings('.content').slideUp(200);
//       $(".set > .accor_div i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
//     }else{
//       $(".set > .accor_div i").removeClass("fa-minus-square-o").addClass("fa-plus-square-o");
//     $(this).find("i").removeClass("fa-plus-square-o").addClass("fa-minus-square-o");
//     $(".set > .accor_div").removeClass("active");
//     $(this).addClass("active");
//     $('.content').slideUp(200);
//     $(this).siblings('.content').slideDown(200);
//     }
    
//   });
  
// });
//end accordion

// http://plnkr.co/edit/5XmPfQ78vRjSrxE0Tt3B?p=preview

}]

});
