angular.module('AppModule').controller('SchoolManageItemsController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.uniqueItems = [];

	function bindSchoolItems() {

		if($scope.Users) {
			var school = $scope.currentSchool || $scope.Users[0].currentSchool;

			if(school) {
				$http.post("/getItems/", {
					school: school.id
				})
				.then(function(sailsResponse) {
					$s.uniqueItems = sailsResponse.data;
				})
			} else {
				$s.$state.go("/school");
			}
		} else {
			$timeout(bindSchoolItems, 100);
		}
	}

	bindSchoolItems();

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
