app.service('apiService', function($httpParamSerializerJQLike, $timeout, $http, $rootScope) {
   
    // for server side filtering
    this.searchWorklist = function(className, param, callback) {
        $http({
          method: "GET",
          url: serverUrl + "/api/" + className + "/search-consulation?" + param,
          data: param,
          headers: {
            "content-type": "application/json"
          }
        }).success(function(response) {
          callback(response);
        });
    };

    this.searchDoctorlist = function(className, param, callback) {
        $http({
          method: "GET",
          url: serverUrl + "/api/" + className + "/findListByDoctorNo?" + param,
          data: param,
          headers: {
            "content-type": "application/json"
          }
        }).success(function(response) {
          callback(response);
        });
    };

    this.listObjectWithQueryParams = function(className, param, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className + "/list?"+ param,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }

    this.findObject = function(className, obj, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className,
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }

    this.getObjectWithParams = function(className, params, callback){
        $http({
            method: "GET",
            url: serverUrl + "/api/" + className + "?"+ params,
            data: params,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }

    this.findObjectWithParams = function(className, params, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className + "?"+ params,
            data: params,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }
    
    this.findObjectWithQueryParams = function(className, params, callback){
        $http({
            method: "GET",
            url: serverUrl + "/api/" + className + "/find?"+ params,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }
    
    this.listObject = function(className, obj, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className + "/list",
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }

    this.listObjectWithCompleteUrl = function(url, obj, callback){
        $http({
            method: "POST",
            url: serverUrl + "/"+url,
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }
    
    this.createObject = function(className, obj, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className + "/create",
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }

    
    this.updateObject = function(className, obj, callback){
        $http({
            method: "PUT",
            url: serverUrl + "/api/" + className + "/update",
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        }).error(function (response){
            console.log("Update Response Error:",response);
            callback(response);
        });        
    }
    
    this.saveOrupdateObject = function(className, obj, callback){
        $http({
            method: "PUT",
            url: serverUrl + "/api/" + className + "/saveOrupdate",
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        }).error(function (response){
            console.log("Update Response Error:",response);
            callback(response);
        });        
    }
    
    

    this.deleteObjectWithQueryParams = function(className, params, callback){
        $http({
            method: "DELETE",
            url: serverUrl + "/api/" + className + "/delete?"+ params,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        }).error(function (response){
            console.log("Delete Response Error:",response);
            callback(response);
        });       
    }
    
    this.deleteObject = function(className, obj, callback){
        $http({
            method: "POST",
            url: serverUrl + "/api/" + className + "/delete",
            data: obj,
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            }
        }).success(function(response) {
            callback(response);
        });        
    }
    
    
});
