angular.module('AppModule').controller('SportCreateController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	// set-up newForm loading state
	$s.newForm = {
		loading: false
	};
	$s.newFormFields = {};
	$s.topics = {
		name: "newForm",
		title: "Create New Sport",
		submit: "Create Sport",
		loadtext: "Sport is being created..."
	}

	// Create attributes here:
	$s.formAttributes = [{
		label: "Name",
		name: "name",
		type: "text",
		placeholder: "Enter name...",
		required: true
	},{
		label: "Season",
		name: "season",
		type: "text",
		placeholder: "Enter season..."
	}];

	$s.addSport = function(sportId) {
		$http.post('/sportToSchool', {
			sport: sportId,
			school: $scope.currentSchool.id
		})
		.then(function onSuccess(sailsResponse) {
			$s.$state.go('sport.manage');
		})
	};

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		// Submit request to Sails.
		$http.post("/sport/create", $s.newFormFields)
		.then(function onSuccess(sailsResponse){
			$scope.currentSport = sailsResponse.data;
			$s.addSport(sailsResponse.data.id);
		})
		.finally(function eitherWay(){
			$s.newForm.loading = false;
		})
	};
}]);
