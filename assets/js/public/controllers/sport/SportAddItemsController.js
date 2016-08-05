angular.module('AppModule').controller('SportManageController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', function($s, $http, toastr, $sailsBind, $timeout){

	// set-up newForm loading state
	$s.newForm = {
		loading: false
	};
	$s.storedNames = {};

	$s.parentScope = $scope;
	$sailsBind.bind("item_type", $s);

	function bindSportItems() {
		if($scope.Users) {
			if(typeof $scope.Users[0] == "object") {
				var school = $scope.currentSchool || $scope.Users[0].currentSchool;

				if(typeof school == "object") {
					var sport = $scope.currentSport || $scope.Users[0].currentSport;

					if(typeof sport == "object") {
						$sailsBind.bind("school_sport_item_type", $s, {
							school: $scope.currentSchool.id,
							sport: $scope.currentSport.id
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
			$timeout(bindSportItems, 100);
		}
	}

	bindSportItems();

	$s.removeitem = function(itemId) {
		$http.delete('/school_sport_item_type/' + itemId)
		.then(function onSuccess(sailsResponse) {
			//$s.items.splice($s.items.indexOf)
		})
	};

	$s.createNewItem = function() {
		$http.post('/item_type', {
			name: $s.item.input
		})
		.then(function onSuccess(sailsResponse) {
			$s.selectitem(sailsResponse.data.id);
		})
	};

	$s.selectitem = function(itemId, item, name) {
		$http.post('/school_sport_item_type', {
			school: $scope.currentSchool.id,
			sport: $scope.currentSport.id,
			item_type: itemId
		})
		.then(function onSuccess(sailsResponse) {
			$s.storedNames[sailsResponse.data.id] = name || $s.item.input;
			$s.item.input = "";
			$("#new-item-input").focus();
		})
	};

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		// Submit request to Sails.
		$http.post("/sport/create", $s.newFormFields)
		.then(function onSuccess(sailsResponse){
			$scope.currentSport = sailsResponse.data;
			$s.addSport(sailsResponse.data.id);
		})
		.finally(function eitherWay(){
			$s.newForm.loading = false;
		})
	};
}]);
