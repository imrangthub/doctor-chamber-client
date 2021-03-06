app.controller('loginCtroller', function($scope, $http, $location, $httpParamSerializerJQLike, apiService, $rootScope) {
    this.$onInit = function() {
        $scope.user = {};
        $scope.userPreferenceData = [];
    }     

    $scope.pressEnterInUsernameField = function(){
       // console.log("pressEnterInUsernameField");
        var inputPassword = document.getElementById("inputPassword");
        angular.element(inputPassword).focus();
       // document.getElementById("inputCompany").focus();
    }
    
    $scope.companyToLoginFucos = function(){
         var myEl = document.getElementById("inputCompany");
        angular.element(myEl).focus();
       // document.getElementById("inputCompany").focus();
    }

    $scope.getUserPreference = function(userNo) {
        var postData = {id : userNo};
        var querystring = $rootScope.encodeQueryData(postData);
            apiService.listObjectWithQueryParams("user-preferences", querystring, function(response){
            $scope.userPreferenceData = response.items;
            console.log("$scope.userPreferenceData ",$scope.userPreferenceData );

        });
    }
	
    $scope.data ={};

    $scope.AccessUser = function() {                    // Using Promise 
        $scope.allCompanyInfo = [];
        $http({
            method: "POST",
            url: serverUrl + "/api/auth/login",
            data: JSON.stringify($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data) {	
     
        	if(!data.success){
        		 $scope.loginMessage = data.message; 
                 $('#loginMessage').show().delay(2000).fadeOut(); 
        	}
        	
            if(data.success){
                $scope.data = data.model;
                console.log("loged success Info:", data.model);
                $scope.secondStep();
            } else {
                localStorage.removeItem("loginInfo");                                           
            }
        })

    };
    $scope.secondStep = function secondStep(){
        var p1 = new Promise(function(resolve,reject){
            var postData = {id : $scope.data.userNo};
            var querystring = $rootScope.encodeQueryData(postData);
                apiService.listObjectWithQueryParams("user-preferences", querystring, function(response){
                $scope.userPreferenceData = response.items;
                console.log("$scope.userPreferenceData ",$scope.userPreferenceData );
                
                resolve();              
            });  
        });
    
        p1.then(function(){
            console.log("From then function");
            $scope.goToWorkListWithUserPreference();
        }).catch(function(){
            console.log("Got Error from Promise P1");
        });
    }
    


    $scope.goToWorkListWithUserPreference = function(){
        var logedUserInfo = {
            empName        : $scope.data.empName,
            userName       : $scope.data.userName,
            userNo         : $scope.data.userNo,
            isDoctor       : $scope.data.isDoctor,
            formLink       : $scope.data.formLink,
            reportLink     : $scope.data.reportLink,
            companyInfo    : $scope.companyInfo,
            preferenceInfo : $scope.userPreferenceData
        }
        console.log("Log UserInfo:",logedUserInfo);
        localStorage.setItem("accessToken", JSON.stringify($scope.data.userNo));
        localStorage.setItem("loginInfo",JSON.stringify(logedUserInfo));
        $location.path('/worklist');

    }
 

    // $scope.AccessUser = function() {
    //     $scope.allCompanyInfo = [];
    //     $http({
    //         method: "POST",
    //         url: serverUrl + "/api/auth/login",
    //         data: JSON.stringify($scope.user),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).success(function(data) {	
     
    //     	if(!data.success){
    //     		 $scope.loginMessage = data.message; 
    //              $('#loginMessage').show().delay(2000).fadeOut(); 
    //     	}
        	
    //         if(data.success){
    //             $scope.data = data.model;
    //            console.log("loged success Info:", data.model);
    //            $scope.getUserPreference(data.model.userNo);


    //             setTimeout(function() {
    //                 var logedUserInfo = {
    //                     empName        : $scope.data.empName,
    //                     userName       : $scope.data.userName,
    //                     userNo         : $scope.data.userNo,
    //                     isDoctor       : $scope.data.isDoctor,
    //                     formLink       : $scope.data.formLink,
    //                     reportLink     : $scope.data.reportLink,
    //                     companyInfo    : $scope.companyInfo,
    //                     preferenceInfo : $scope.userPreferenceData
    //                 }
    //                 console.log("Log UserInfo:",logedUserInfo);
    //                 localStorage.setItem("accessToken", JSON.stringify($scope.data.userNo));
    //                 localStorage.setItem("loginInfo",JSON.stringify(logedUserInfo));
    //                 $location.path('/worklist');

    //             }, 1000);

       


    //         } else {
    //             localStorage.removeItem("loginInfo");                                           
    //         }
    //     })

    // };



    // $scope.AccessUser = function() {
    //     $scope.allCompanyInfo = [];
    //     $http({
    //         method: "POST",
    //         url: serverUrl + "/api/auth/login",
    //         data: JSON.stringify($scope.user),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).success(function(data) {	
     
    //     	if(!data.success){
    //     		 $scope.loginMessage = data.message; 
    //              $('#loginMessage').show().delay(2000).fadeOut(); 
    //     	}
        	
    //         if(data.success){
    //             $scope.data = data.model;
    //            console.log("loged success Info:", data.model);
    //             $scope.allCompanyInfo = data.model.companyList;  
    //             $scope.companyInfo = data.model.companyList[0].COMPANY_NAME;
    //             $scope.getUserPreference(data.model.userNo);
    //             var inputCompanySubmit = document.getElementById("inputCompanySubmit");
    //             angular.element(inputCompanySubmit).focus();

    //         } else {
    //             localStorage.removeItem("loginInfo");                                           
    //         }
    //     })

    // };


    $scope.finialLogin = function(){
        // if($scope.companyInfo == undefined){
        //     alert("Please Select Company.!");
        //     return;
        // }
        var logedUserInfo = {
            empName        : $scope.data.empName,
            userName       : $scope.data.userName,
            userNo         : $scope.data.userNo,
            isDoctor       : $scope.data.isDoctor,
            formLink       : $scope.data.formLink,
            reportLink     : $scope.data.reportLink,
            companyInfo    : $scope.companyInfo,
            preferenceInfo : $scope.userPreferenceData
        }
        console.log("Log UserInfo:",logedUserInfo);
        localStorage.setItem("accessToken", JSON.stringify($scope.data.userNo));
        localStorage.setItem("loginInfo",JSON.stringify(logedUserInfo));
        if($scope.data.isDoctor==1){
            $location.path('/worklist');
        }else{
            $location.path('/worklistnurse'); 
        }

    }	
	
});