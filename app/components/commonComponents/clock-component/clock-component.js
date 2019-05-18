function clockController() {
	ctrl = this;
	ctrl.$onInit = function() {
		ctrl.myVar = setInterval(ctrl.myTimer, 1000);
	}

	ctrl.myTimer = function() {
      	ctrl.d = new Date();
      	if(document.getElementById("clock")){
        	document.getElementById("clock").innerHTML = ctrl.d.toLocaleTimeString();
      	}
  	}
}

app.component('clockComponent', {
    templateUrl : 'app/components/commonComponents/clock-component/clock-component.html',
    controller : clockController
});
