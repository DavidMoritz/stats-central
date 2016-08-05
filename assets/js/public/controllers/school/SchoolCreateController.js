angular.module('AppModule').controller('SchoolCreateController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	// set-up newForm loading state
	$s.newForm = {
		loading: false
	};
	$s.newFormFields = {};
	$s.topics = {
		name: "newForm",
		title: "Create New School",
		submit: "Create School",
		loadtext: "School is being created..."
	}

	// Create attributes here:
	$s.formAttributes = [{
		label: "Name",
		name: "name",
		type: "text",
		placeholder: "Enter name...",
		required: true
	},{
		label: "City",
		name: "city",
		type: "text",
		placeholder: "Enter city..."
	}];

	$s.addSchool = function(schoolId) {
		$http.post('/userToSchool', {
			school: schoolId
		})
		.then(function onSuccess(sailsResponse) {
			$scope.currentSchool = sailsResponse.data;
			$s.$state.go('sport');
		})
	};

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		// Submit request to Sails.
		$http.post("/school/create", $s.newFormFields)
		.then(function onSuccess(sailsResponse){
			$s.addSchool(sailsResponse.data.id);
		})
		.finally(function eitherWay(){
			$s.newForm.loading = false;
		})
	};
}]);
