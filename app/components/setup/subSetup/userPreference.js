app.component('userPreference', {
  templateUrl : 'app/components/setup/subSetup/userPreference.html',
  bindings: {
    data: "=",
    page: "="
  },
  controller: ['$rootScope','$scope',"apiService", '$filter', function($rootScope,$scope, apiService, $filter) {
    var model = this;
    var userObj = {doctorNo : $rootScope.logedUserInfo.userNo};

    this.$onInit = function() {
      $scope.userNo = $rootScope.logedUserInfo.userNo;

      $scope.userPreferenceList = [];
      $scope.userPreference = {};
      $scope.newPrescriptionPreferenceList = [];
      $scope.selectedUserPreference = {};

      $scope.prescriptionPreferenceList = [];
      $scope.prescriptionPreference = {};
      $scope.selectedPrescriptionPreference = {};
      $scope.prescriptionPreferenceObj = {};
      $scope.adviceList = [];
      $scope.getUserPrererenceListFromApi();

      $scope.adviceSetupData(userObj);
      
    };

    $scope.adviceSetupData = function(obj){
      apiService.listObject("advice", obj, function(response){
        $scope.adviceList = response.items;
      });  
    } 

    $scope.$on("userPreferenceOn",function(){
     $scope.getUserPrererenceListFromApi();
    });

    $scope.getUserPrererenceListFromApi = function(){
      let obj = {userNo : $scope.userNo};
      apiService.listObject("preferences", obj, function(response) {
        console.log('preferences response',response);
        $scope.prescriptionPreferenceList = response.items;
        for(var i = 0;i<$scope.prescriptionPreferenceList.length;i++){        	
        	if($scope.prescriptionPreferenceList[i].preferencesDataType == 1 ) {
        		 $scope.prescriptionPreferenceList[i].preferencesValue = ($scope.prescriptionPreferenceList[i].preferencesValue == null)? 0: Number($scope.prescriptionPreferenceList[i].preferencesValue);
        	} else {
        		 $scope.prescriptionPreferenceList[i].preferencesValue = $scope.prescriptionPreferenceList[i].preferencesValue;        	
        	}         
        }        
        console.log("prescriptionPreferenceList", $scope.prescriptionPreferenceList);
      });
    }

    $scope.getUserPrererenceList = function() {
      var postData = {id : userObj.doctorNo};
      var querystring = $rootScope.encodeQueryData(postData);
         apiService.listObjectWithQueryParams("user-preferences", querystring, function(response){
          $scope.userPreferenceList = response.items;
          console.log("userPreferenceList", $scope.userPreferenceList);
         });
    };

    $scope.saveUserPreference = function() {
      $scope.newPrescriptionPreferenceList = [];
      angular.forEach($scope.prescriptionPreferenceList, function(item) {
        let obj = {};
        obj.userPreferencesKey =  item.preferencesKey;
        obj.userPreferencesType =  item.preferencesType;
        obj.preferencesShowInReport =  item.preferencesShowInReport;
        obj.title =  item.title;
         
        if(item.preferencesDataType == 1){
        	obj.userPreferencesValue =  (item.preferencesValue == null)?0:Number(item.preferencesValue); 
        }else{
        	obj.userPreferencesValue =  item.preferencesValue;
        }
        
        obj.preferencesDataType = item.preferencesDataType;
        obj.preferencesSerial = item.preferencesSerial;
        obj.userNo =  item.userNo;
        $scope.newPrescriptionPreferenceList.push(obj);
      });

      $scope.prescriptionPreferenceObj.userPrefList = $scope.newPrescriptionPreferenceList;
  //    console.log("List  prescriptionPreferenceList:",$scope.prescriptionPreferenceObj);

      apiService.createObject("user-preferences", $scope.prescriptionPreferenceObj, function(response){
        $scope.successMessage = "User Preferences added successfully !"; 
        $('#preferncecSuccessMessage').show().delay(2000).fadeOut();             
      });

    };


$scope.getSelectObj = function(obj, $index){
   console.log('getSelectObj',obj, $index);
}
  
  // Preferences Dragable 
  $scope.sortableOptions = {
      stop: function (e, ui) {
      for (var i in $scope.prescriptionPreferenceList) {
        $scope.prescriptionPreferenceList[i].preferencesSerial = Number(i) + 1;
      }
    }
  }

  //   $scope.sortableOptions = {
  //     activate: function() {
  //         console.log("activate");
  //     },
  //     beforeStop: function() {
  //         console.log("beforeStop");
  //     },
  //     change: function() {
  //         console.log("change");
  //     },
  //     create: function() {
  //         console.log("create");
  //     },
  //     deactivate: function() {
  //         console.log("deactivate");
  //     },
  //     out: function() {
  //         console.log("out");
  //     },
  //     over: function() {
  //         console.log("over");
  //     },
  //     receive: function() {
  //         console.log("receive");
  //     },
  //     remove: function() {
  //         console.log("remove");
  //     },
  //     sort: function() {
  //         console.log("sort");
  //     },
  //     start: function() {
  //         console.log("start");
  //     },
  //     update: function(e, ui) {
  //       console.log(ui, "+++update");
  //       console.log($scope.prescriptionPreferenceList)
  //     },
  //   stop: function (e, ui) {
  //     for (var index in $scope.prescriptionPreferenceList) {
  //       $scope.prescriptionPreferenceList[index].preferencesSerial = Number(index) + 1;
  //     }
  //   }
  // };
  }]
});