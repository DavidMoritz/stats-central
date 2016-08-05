angular.module('AppModule').controller('SchoolAddPlayerController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){
	var freshman = new Date().getFullYear() + 4;

	function determineGender(input) {
		var input = input || "female";

		switch(input.toLowerCase()) {
			case "female":
			case "woman":
			case "girl":
			case "girls":
			case "w":
			case "f":
			case "women":
			case "gal":
			case "females":
				return 1
			default: 
				return 2
		}
	}

	function determineState() {
		var prev = $scope.previousState || 'check';

		if(prev.indexOf("in") !== -1) {
			return "player.checkin";
		} else if (prev.indexOf("out") !== -1) {
			return "player.checkout";
		} else {
			return prev;
		}
	}
	// set-up newForm loading state
	$s.newForm = {
		loading: false
	};
	$s.newFormFields = {};
	$s.topics = {
		name: "newForm",
		title: "Add New Player",
		submit: "Add Player",
		loadtext: "Player is being added..."
	}

	// Create attributes here:
	$s.formAttributes = [{
		label: "Name",
		name: "name",
		type: "text",
		placeholder: "Enter name...",
		required: true
	},{
		label: "Gender",
		name: "gender",
		type: "text",
		placeholder: "female"
	},{
		label: "Graduating Year",
		name: "year",
		type: "number",
		placeholder: freshman
	}];

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		$s.newFormFields.school = $scope.currentSchool.id;
		$s.newFormFields.gender = determineGender($s.newFormFields.gender);
		$s.newFormFields.year = $s.newFormFields.year || freshman;

		// Submit request to Sails.
		$http.post("/player/create", $s.newFormFields)
		.then(function onSuccess(sailsResponse){
			$scope.currentPlayer = sailsResponse.data;
			$s.$state.go(determineState());
		})
		.finally(function eitherWay(){
			$s.newForm.loading = false;
		})
	};
}]);
