function consultationHistoryController(apiService, $rootScope, $stateParams) {
	var ctrl = this;
	ctrl.$onInit = function() {
		ctrl.userNo = $rootScope.logedUserInfo.userNo;
	    if(ctrl.hnNumber != undefined) {
		    let obj = { "hospitalId" : ctrl.hnNumber };
	        apiService.findObject("prescription/findOpdConsHistory", obj, function(response) {
		        ctrl.consHistoryList = response.items;
		    });
	    }
	};

	$(document).ready(function(){
		$('.openModal').click(function(){
			console.log("click1")
		    modalOpen('clinicalRecord')
		});

		$('.openModal2').click(function(){
		    modalOpen('patientHistory')
		});

		$('.openModal3').click(function(){
		    modalOpen('medicineSetup')
		});
	});

}

app.component('consHisCom', {
    templateUrl : 'app/components/commonComponents/cons-his-com/cons-his-com.html',
    controller : consultationHistoryController,
    bindings : {
		hnNumber : '=',
		presNumber : '=',
		onSelect: '&',
		loadOldPres: '&',
		printOldPres: '&'
	}
});
