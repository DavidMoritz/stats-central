angular.module('AppModule').controller('SportController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.topics = {
		addLink: "sport.add",
		add: $sce.trustAsHtml("Add new sport")
	}

	function bindSports() {
		if($scope.Users) {
			if(typeof $scope.Users[0] == "object") {
				var school = $scope.currentSchool || $scope.Users[0].currentSchool;

				if(typeof school == "object") {
					var schoolName = $scope.schoolName || school.name;

					$s.topics.add = $sce.trustAsHtml("Add new sport for <span class='caps'>" + schoolName + "</span>");
					$sailsBind.bind("school/" + school.id + "/sports", $s, null, function() {
						$s.items = $s.sportss;
					});
				} else {
					$s.$state.go("school");
				}
			} else {
				$s.$state.go("login");
			}
		} else {
			$timeout(bindSports, 100);
		}
	}

	bindSports();

	$s.currentitem = function(sportId) {
		$http.post('/currentSport', {
			sport: sportId
		})
		.then(function onSuccess(sailsResponse) {
			$scope.currentSport = sailsResponse.data;
			$s.$state.go('check');
		})
	}; 
}]);
