angular.module('AppModule').controller('SchoolManageItemTypeController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.items = {};
	$s.itemGroup = {};

	function bindSchoolItems() {
		if($scope.Users) {
			var school = $scope.currentSchool || $scope.Users[0].currentSchool;

			if(school) {
				$http.post("/getItemType/", {
					school: school.id,
					item_type: $s.$stateParams.id
				})
				.then(function(sailsResponse) {
					$s.names = _.groupBy(sailsResponse.data, function(item) {
						return item.item_make.description;
					});
					_.each($s.names, function(items, name) {
						$s.itemGroup[name] = {};
						$s.items[name] = _.groupBy(items, function(item) {
							$s.itemGroup[name][item.condition] = $s.itemGroup[name][item.condition] || {
								checkedOut: 0,
								available: 0,
								id: item.item_make.id
							};
							if(item.isCheckedOut) {
								$s.itemGroup[name][item.condition].checkedOut++;
							} else {
								$s.itemGroup[name][item.condition].available++;
							}
							return item.condition;
						});
					});
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
