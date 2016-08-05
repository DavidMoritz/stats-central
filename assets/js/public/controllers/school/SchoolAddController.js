angular.module('AppModule').controller('SchoolAddController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', function($s, $http, toastr, $sailsBind, $timeout){

	$sailsBind.bind("school", $s, {}, function() {
		$s.items = $s.schools;
	});

	$s.topics = {
		name: "addSchool",
		title: "Add a new school",
		placeholder: "Search schools...",
		create: "Create new school",
		createLink: "school.create"
	}

	$s.selectitem = function(selectedSchool) {
		$http.post('/userToSchool', {
			school: selectedSchool.id
		})
		.then(function onSuccess(sailsResponse) {
			$scope.currentSchool = sailsResponse.data;
			$s.$state.go('sport');
		})
	};
}]);
