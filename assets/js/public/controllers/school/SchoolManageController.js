angular.module('AppModule').controller('SchoolManageController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.topics = {
		addLink: "school.add",
		add: $sce.trustAsHtml("Add new school")
	}

	function bindSchools() {
		if($scope.Users) {
			if(typeof $scope.Users[0] == "object") {
				$s.user = $scope.Users[0];
				$s.topics.add = $sce.trustAsHtml("Add new school for <span class='caps'>" + $s.user.name + "</span>");
				$sailsBind.bind("user/" + $scope.Users[0].id + "/schools", $s, {}, function() {
					$s.items = $s.schoolss;
				});
			} else {
				$s.$state.go("login")
			}
		} else {
			$timeout(bindSchools, 100);
		}
	}

	bindSchools();

	$s.currentitem = function(schoolId) {
		$http.post('/userToSchool', {
			school: schoolId
		})
		.then(function onSuccess(sailsResponse) {
			$scope.currentSchool = sailsResponse.data;
			$s.$state.go('sport');
		})
	};
}]);
