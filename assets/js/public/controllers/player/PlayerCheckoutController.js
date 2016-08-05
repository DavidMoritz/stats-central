angular.module('AppModule').controller('PlayerCheckoutController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){
	window.$s = $s;

	$s.parentScope = $scope;

	$s.player = $scope.currentPlayer;

	function bindSportItems() {
		if($scope.Users) {
			$s.sportId = $scope.currentSport.id || $scope.Users[0].currentSport.id;
			$s.schoolId = $scope.currentSchool.id || $scope.Users[0].currentSchool.id;

			if($s.sportId) {
				$http.post("/getSportItems", {
					school: $s.schoolId,
					sport: $s.sportId,
					player: $s.player.id
				})
				.then(function(sailsResponse) {
					$s.item_types = sailsResponse.data;
				});
			} else {
				$s.$state.go("sport");
			}
		} else {
			$s.$state.go("check");
		}
	}

	bindSportItems();

	if(!$s.player.id) {
		$s.$state.go("check");
	}

	$s.itemClicked = function(item) {
		$http.post("/playerRental", {
			player: $s.player.id,
			item_type: item.item_type.id,
			school: $s.schoolId,
			create: !item.checked
		})
		item.checked = !item.checked;
	}
}]);
