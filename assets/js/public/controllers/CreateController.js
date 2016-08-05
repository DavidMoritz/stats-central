angular.module('AppModule').controller('CreateController', ['$s', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	// set-up newForm loading state
	$s.newForm = {
		loading: false,
		name: "newForm",
		title: "Create New Thing",
		submit: "Create Thing",
		loadtext: "Thing is being created..."
	}

	// Create attributes here:
	$s.formAttributes = [{
		label: "Name",
		name: "name",
		type: "text",
		placeholder: "Enter name...",
		required: false,
		maxlength: 50
	}];

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		// Submit request to Sails.
		$http.post(serverData.postLocation, $s.newFormFields)
		.then(function onSuccess(sailsResponse){
			window.location = serverData.postFinish;
		})
		.finally(function eitherWay(){
			$s.newForm.loading = false;
		})
	};
}]);
