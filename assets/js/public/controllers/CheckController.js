angular.module('AppModule').controller('CheckController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', function($s, $http, toastr, $sailsBind, $timeout){

	function determineState() {
		switch($s.$state.current.name) {
			case "check.in":
				return "player.checkin";
			case "check.out":
				return "player.checkout";
			default:
				return "check";
		}
	}

	function bindPlayers() {
		if($scope.Users) {
			if(typeof $scope.Users[0] == "object") {
				var school = $scope.currentSchool || $scope.Users[0].currentSchool;

				if(typeof school == "object") {
					var sport = $scope.currentSport || $scope.Users[0].currentSport;

					if(typeof sport == "object") {
						$sailsBind.bind("school/" + school.id + "/players", $s, null, function() {
							$s.items = $s.playerss;
						});
					} else {
						$s.$state.go("sport");
					}
				} else {
					$s.$state.go("school");
				}
			} else {
				$s.$state.go("login");
			}
		} else {
			$timeout(bindPlayers, 100);
		}
	}

	bindPlayers();

	$scope.currentPlayer = null;

	$s.topics = {
		name: "player",
		title: "",
		placeholder: "Search players...",
		create: "Add new Player",
		createLink: "school.add.player",
		editable: false
	}

	$s.selectitem = function($i, $m, $l) {
		$scope.currentPlayer = $m;
		$s.$state.go(determineState());
	}
}]);
