function searchController() {
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
		ctrl.matchingData = [];
		ctrl.highlightedData = {};
	};

	ctrl.processSearch = function(term){
		ctrl.matchingData = [];
		if(term.length == 0 || ctrl.data == undefined) {
			ctrl.dataFound = false;
			return;
		}
		angular.forEach(ctrl.data, function(item) {
		    term = term.toUpperCase();
		    if(item[ctrl.displayProperty].toUpperCase().indexOf(term) != -1 ){
		    	let obj = {}
		    	obj[ctrl.bindItemNoProperty] = (item[ctrl.itemNoProperty] == undefined ? "" : item[ctrl.itemNoProperty])
		    	obj[ctrl.bindProperty] = item[ctrl.displayProperty];
		    	obj[ctrl.bindTypeProperty] = ctrl.bindType;
		        ctrl.matchingData.push(obj);
		    }
		});
		if(ctrl.matchingData.length > 0){
			ctrl.highlightedData = ctrl.matchingData[0];
			ctrl.dataFound = true;
		} else {
			ctrl.closeAndClear();
		}
	}

	ctrl.isSelected = function(obj) {		
		return obj === ctrl.highlightedData;
	};

	ctrl.onSelectClose =function(){
		ctrl.closeAndClear();
		ctrl.search_term = '';
	}

	ctrl.closeAndClear = function() {
		ctrl.highlightedData = undefined;
		ctrl.dataFound = false;
	};

	ctrl.search_start = function() {
		ctrl.processSearch(this.search_term);
	};

	ctrl.selectData = function(obj) {
		if(obj.prescritionData == "") return;
		if(ctrl.highlightedData == undefined) {
			obj.new = 1;
			ctrl.onSelect({obj : obj, listName : ctrl.listName});
		} else {
			ctrl.onSelect({obj : ctrl.highlightedData, listName : ctrl.listName});
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
		if(ctrl.keys.upArrow == key) {
			ctrl.selectNext('matchingData', 'highlightedData', 'previous');
		} else if(ctrl.keys.downArrow == key) {
			ctrl.selectNext('matchingData', 'highlightedData', 'next');
		} else if(ctrl.keys.enter == key) {
			let obj = {};
			obj[ctrl.bindItemNoProperty] = (ctrl.itemNoProperty == undefined ? "": ctrl.itemNoProperty);
			obj[ctrl.bindTypeProperty] = ctrl.bindType;
			obj[ctrl.bindProperty] = ctrl.search_term;
			ctrl.selectData(obj);
		}
	};

    ctrl.keyDown = function(e) {
	    switch(e.which) {
	      case this.keys.upArrow:
	        e.preventDefault();
	        ctrl.traverseData(this.keys.upArrow)
	        console.log("Up Arrow Pressed")
	        break;
	      case this.keys.downArrow:
	        e.preventDefault();
	        ctrl.traverseData(this.keys.downArrow)
	        console.log("Down Arrow Pressed")
	        break;
	      case this.keys.enter:
	        e.preventDefault();
	        ctrl.traverseData(ctrl.keys.enter)
	        break;
	      case this.keys.escape:
	        ctrl.closeAndClear();
	        break;
	      // case 32:
	      //   ctrl.autoCompleteKey();
	      //   break;
	    }
  	};

}

app.component('searchComponent', {
    templateUrl : 'app/components/commonComponents/generic-search-component/genericSearch.html',
    controller : searchController,
    bindings : {
      	data: '=',
      	place: '@',
		onSelect: '&',
		listName: '@',
		bindType: '=',
		bindProperty: '@',
		bindTypeProperty: '@',
		displayProperty: '@',
		bindItemNoProperty: '@',
		itemNoProperty: '@'
	}
});



