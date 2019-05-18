function opdMedicineController() {
	var ctrl = this;
	ctrl.$onInit = function() {
		ctrl.search_term = '';
		ctrl.dataFound = false;
		ctrl.keys = {
				leftArrow: 37,
				upArrow: 38,
				rightArrow: 39,
				downArrow: 40,
				enter: 13,
				escape: 27
			};
		ctrl.matchingOptions = [];
		ctrl.formStrengthList = []
		ctrl.highlightedOption = {};
		ctrl.highlightedStrength = {};

	};

	ctrl.processSearch = function(flag, term){
		ctrl.matchingOptions = [];
		if(term.length == 0 || ctrl.data == undefined) {
			ctrl.dataFound = false;
			return;
		}
		if(flag){
			//console.log("In considerGeneric.")
			angular.forEach(ctrl.data, function(item) {
			    term = term.toUpperCase();
			    if(item[ctrl.displayProperty].toUpperCase().indexOf(term) === 0 ){
			        ctrl.matchingOptions.push(item);
			    }
			});
			if(ctrl.matchingOptions.length > 0){
				ctrl.highlightedOption = ctrl.matchingOptions[0];
				ctrl.drugFormAndStrength(ctrl.highlightedOption);

				ctrl.dataFound = true;
			} else {
				ctrl.closeAndClear();
			}

		} else {
			console.log("In not considerGeneric.")
		}

	}

	ctrl.drugFormAndStrength = function(obj){
		if(obj == undefined){
			ctrl.highlightedStrength = undefined;
			return;
		}
	    ctrl.formStrengthList = [];
	    ctrl.formList = obj.form.split(",");
		
		if(obj.strength) {
			ctrl.strengthList = obj.strength.split(",");

	        for(var i=0; i< ctrl.strengthList.length; i++){
		        ctrl.formStrength = {};
		        ctrl.formStrength.brandName = obj.brandName; 
	            ctrl.formStrength.form = ctrl.formList[i]!=undefined? ctrl.formList[i]:"N/A";            
	            ctrl.formStrength.strength = ctrl.strengthList[i];
	            ctrl.formStrength.dosage = '';
	            ctrl.formStrength.relationWithMeal = '';
	            ctrl.formStrength.duration = '';
	            ctrl.formStrength[ctrl.bindTypeProperty] = ctrl.bindType;
	            ctrl.formStrength[ctrl.bindItemNoProperty] = (obj[ctrl.itemNoProperty] == undefined ? "": obj[ctrl.itemNoProperty]);

	            ctrl.formStrengthList.push(ctrl.formStrength);
	        }
	        ctrl.highlightedStrength = ctrl.formStrengthList[0];
		}
	}

	ctrl.isBrandSelected = function(obj) {	
		return obj === ctrl.highlightedOption;
	};

	ctrl.isStrengthSelected = function(obj) {		
		return obj === ctrl.highlightedStrength;
	};


	ctrl.selectBrand = function(obj) {
		ctrl.highlightedOption = obj;
		ctrl.drugFormAndStrength(obj);
	};

	ctrl.onSelectClose =function(){
		ctrl.dataFound = false;
		ctrl.search_term = '';
	}

	ctrl.closeAndClear = function() {
		ctrl.highlightedStrength = undefined;
		ctrl.dataFound = false;
	};

	ctrl.search_start = function() {
		ctrl.processSearch(ctrl.considerGeneric, this.search_term);
	};

	ctrl.selectData = function(obj) {
		if(ctrl.highlightedStrength == undefined) {
			ctrl.onSelect({obj : obj, listName : 'medicineList'});
		} else {
			ctrl.onSelect({obj : ctrl.highlightedStrength, listName : 'medicineList'});
			ctrl.onSelectClose();
		}
		ctrl.closeAndClear();
		ctrl.search_term = '';
	}

	ctrl.selectNext = function(listName, objName, action) {
		if (!ctrl[objName]) {
			ctrl[objName] = ctrl[listName][0];
		} else {
			var currentIndex = ctrl[listName].indexOf(ctrl[objName]);
			if(action == 'previous'){
				let nextIndex = currentIndex - 1 == ctrl[listName].length ? 0 : currentIndex - 1;
				ctrl[objName] = ctrl[listName][nextIndex];
			} else if (action == 'next') {
				let nextIndex = currentIndex + 1 == ctrl[listName].length ? 0 : currentIndex + 1;
				ctrl[objName] = ctrl[listName][nextIndex];				
			}
		}
	};

	ctrl.traverseData = function(key) {
		//console.log(key);
		if(ctrl.keys.upArrow == key) {
			ctrl.selectNext('formStrengthList', 'highlightedStrength', 'previous');
		} else if(ctrl.keys.downArrow == key) {
			ctrl.selectNext('formStrengthList', 'highlightedStrength', 'next');
		} else if(ctrl.keys.enter == key) {
			let obj = {};
			obj[ctrl.bindItemNoProperty] = (ctrl.itemNoProperty == undefined ? "" : ctrl.itemNoProperty);
			obj[ctrl.bindTypeProperty] = ctrl.bindType;
			obj.brandName = ctrl.search_term;
			ctrl.selectData(obj);
		}
	};

	ctrl.autoCompleteKey = function(){
		
	}

    ctrl.keyDown = function(e) {
	    switch(e.which) {
	      case ctrl.keys.upArrow:
	        e.preventDefault();
	        ctrl.traverseData(ctrl.keys.upArrow)
	        break;
	      case ctrl.keys.downArrow:
	        e.preventDefault();
	        ctrl.traverseData(ctrl.keys.downArrow)
	        break;
	      case ctrl.keys.enter:
	        e.preventDefault();
	        ctrl.traverseData(ctrl.keys.enter)
	        break;
	      case ctrl.keys.escape:
	        ctrl.closeAndClear();
	        break;
	      case 32:
	        ctrl.autoCompleteKey();
	        break;
	    }
  	};

}

app.component('opdMedicineComponent', {
    templateUrl : 'app/components/commonComponents/opd-medicine-component/opd-medicine-component.html',
    controller : opdMedicineController,
    bindings : {
      	data: '=',
      	place: '@',
		onSelect: '&',
		considerGeneric: '=',
		displayProperty: '=',
        bindType: '=',
        bindTypeProperty: '@',
        itemNoProperty: '@',
        bindItemNoProperty: '@',        
    }
});
