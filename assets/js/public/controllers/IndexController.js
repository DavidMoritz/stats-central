angular.module('AppModule').controller('IndexController', function($scope, $http, toastr, $sailsBind){

	// set-up newForm loading state
	$scope.newForm = {
		loading: false
	}

	window.$scope = $scope;

	$scope.pageTitle = "Stats Central";
	$scope.previousState;

	$scope.syntex = {
		several: "yes",
		title: "again"
	};

	$scope.currentSport = {};
	$scope.currentSchool = {};
	$scope.currentPlayer = {};

	$scope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
		$scope.previousState = from.name;
	});

	if(UserId) {
		$sailsBind.bind("User", $scope, {id: UserId}, function() {
			var user = $scope.Users[0];

			if(typeof user == "object") {
				if(user.currentSchool) {
					$scope.currentSchool = user.currentSchool;
				}

				if(user.currentSport) {
					$scope.currentSport = user.currentSport;
				}
				
				if(user.currentPlayer) {
					$scope.currentPlayer = user.currentPlayer;
				}
			} else {
				$scope.$state.go("login");
			}
		});
	} else {
		$scope.$state.go("home");
		$scope.Users = [];
	}
});
