angular.module('AppModule').controller('PlayerCheckinController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.player = $scope.currentPlayer;
	$s.conditions = [{
		field: "good",
		label: "Good"
	}, {
		field: "repair",
		label: "Needs Repair"
	}, {
		field: "discard",
		label: "Discard"
	}]

	if(!$s.player.id) {
		$s.$state.go("check");
	} else {
		$s.player.genderDisplay = $s.player.gender == 2 ? "Male" : "Female";

		$http.post("/getRentals", {
			player: $s.player.id,
		})
		.then(function(sailsResponse) {
			$s.rentals = sailsResponse.data;
		});
	}

	$s.checkin = function(rentalId, condition) {
		$http.post("/checkinItem", {
			condition: condition,
			rentalId: rentalId
		});
	}
}]);
