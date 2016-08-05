angular.module('AppModule').controller('SchoolRentedItemsController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.items = {};

	function bindSchoolItems() {
		if($scope.Users) {
			var school = $scope.currentSchool || $scope.Users[0].currentSchool;

			if(school) {
				$http.post("/getRentedItems/", {
					school: school.id,
					item_make: $s.$stateParams.item,
					condition: $s.$stateParams.condition
				})
				.then(function(sailsResponse) {
					$s.items = sailsResponse.data;
				})
			} else {
				$s.$state.go("/school");
			}
		} else {
			$timeout(bindSchoolItems, 100);
		}
	}

	bindSchoolItems();
}]);
