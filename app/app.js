'use strict';
var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'datatables','ui.sortable','ui.bootstrap']);

app.run(function ($rootScope, $location, $state) {	 
    $rootScope.getCurrentDateWithFormate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
            if (dd < 10) {
            dd = '0' + dd;
            } 
            if (mm < 10) {
            mm = '0' + mm;
            } 
        var today = dd + '-' + mm + '-' + yyyy;
        return today;
    };

    $rootScope.currentDrugSetupData = {};
    $rootScope.consultationStatus = "all";
    
    $rootScope.worklistSearchDoctorNo = 0;
    $rootScope.worklistSearchDoctorName = "";
    $rootScope.worklistSearchShiftdtlNo = 0;

    $rootScope.worklistSearchToDate = moment().format('DD-MM-YYYY');
    $rootScope.worklistSearchFromDate = moment().format('DD-MM-YYYY');

    $rootScope.dashboardClick = function ($event) {
        $location.path('/worklist');
    };

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
    		//console.log("***"+toState.name+"***");
    	$rootScope.state = toState.name;
            if (localStorage.getItem('accessToken')) {
                if ("root" === toState.name) {
                    event.preventDefault();
                    $state.transitionTo('worklist');
                }
                $rootScope.logedUserInfo = JSON.parse(localStorage.getItem("loginInfo"));
                //$rootScope.medicineData = JSON.parse(localStorage.getItem("medicineData"));
                //$rootScope.pathInvestigationData = localStorage.getItem("pathInvestigationData");    
                //$rootScope.radioInvestigationData = localStorage.getItem("radioInvestigationData");    
            }
            else if ("login" === toState.name) {
              //console.log("Please log in.");
            }
            else {
                event.preventDefault();
                $state.transitionTo('login');
            }
            $rootScope.varYear = new Date().getFullYear();
        });

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // console.log('success');
        });

      $rootScope.deleteDiagnosis = function(){    
           alert("Diagnosis deleted successfully!", "success");
      };



$rootScope.encodeQueryData = function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  };
		

});


// directive  for Ctr+Q key press detecated, Key code will be 81
app.directive("prescriptNavtoTabkeyDetector", function() {  
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            document.onkeydown = function(e){
                if(e.keyCode === 81 && e.ctrlKey){
                    console.log(" Ctr+z you pareasa a key...........!");
                }
            }
        }
    }
})

//===================date_piker=====================
app.directive('datepicker', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      compile: function () {
        return {
          pre: function (scope, element, attrs, ngModelCtrl) {
            var format, dateObj;
            format = (!attrs.dpFormat) ? 'DD-MM-YYYY' : attrs.dpFormat;
            if (!attrs.initDate && !attrs.dpFormat) {
              // If there is no initDate attribute than we will get todays date as the default
              dateObj = new Date();
              scope[attrs.ngModel] = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
            } else if (!attrs.initDate) {
              // Otherwise set as the init date
              scope[attrs.ngModel] = attrs.initDate;
            }
            // Initialize the date-picker
            $(element).datepicker({ format: format, autoclose: true, todayHighlight: true, })
              .on('changeDate', function (ev) {
                // To me this looks cleaner than adding $apply(); after everything.
                scope.$apply(function () {
                  ngModelCtrl.$setViewValue(ev.format(format));
                });
  
              }).datepicker('update', attrs.initDate);
          }
        }
      }
    }
  });

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('convertToNumber', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function(val) {
          return parseInt(val, 10);
        });
        ngModel.$formatters.push(function(val) {
          return '' + val;
        });
      }
    };
});

app.directive('ckEditor', function() {
  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);

      if (!ngModel) return;

      ck.on('instanceReady', function () {
          ck.setData(ngModel.$viewValue);
      });
      
      ck.on('pasteState', function() {
        scope.$apply(function() {
          ngModel.$setViewValue(ck.getData());
        });
      });

      ngModel.$render = function(value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});


//directive for a single list
app.directive('dndList', function($parse) {

  return function(scope, element, attrs) {

      // variables used for dnd
      var toUpdate;
      var startIndex = -1;

      // watch the model, so we always know what element
      // is at a specific position
      scope.$watch(attrs.dndList, function(value) {
          toUpdate = value;
      },true);

      // use jquery to make the element sortable (dnd). This is called
      // when the element is rendered
      $(element[0]).sortable({
          items:'li',
          start:function (event, ui) {
              // on start we define where the item is dragged from
              startIndex = ($(ui.item).index());
          },
          stop:function (event, ui) {
              // on stop we determine the new index of the
              // item and store it there
              var newIndex = ($(ui.item).index());
              var toMove = toUpdate[startIndex];
              toUpdate.splice(startIndex,1);
              toUpdate.splice(newIndex,0,toMove);

              // we move items in the array, if we want
              // to trigger an update in angular use $apply()
              // since we're outside angulars lifecycle
              scope.$apply(attrs.dndList);
          },
          axis:'y'
      })
  }
});




