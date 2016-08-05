angular.module('AppModule').controller('SportAddController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	$sailsBind.bind("sport", $s, {}, function() {
		$s.items = $s.sports;
	});

	$s.topics = {
		name: "addSport",
		title: "Add a new sport",
		placeholder: "Search sports...",
		create: "Create new sport",
		createLink: "sport.create",
		editable: true
	}

	$s.createitem = function (){
		// Submit request to Sails.
		$http.post("/sport", {
			name: $s.topics.input
		})
		.then(function onSuccess(sailsResponse){
			$s.selectitem(sailsResponse.data.id, sailsResponse.data);
		})
	};

	$s.selectitem = function(sportId, sport) {
		sportId = typeof sportId == "object" ? sportId.id : sportId;

		$http.post('/sportToSchool', {
			sport: sportId,
			school: $scope.currentSchool.id
		})
		.then(function onSuccess(sailsResponse) {
			$scope.currentSport = sport;
			$s.$state.go('sport.manage');
		})
	}; 
}]);
