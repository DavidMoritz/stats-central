angular.module('AppModule').controller('SchoolAddItemController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', function($s, $http, toastr, $sailsBind, $timeout){

	function changeFocus(name) {
		$timeout(function() {
			$("[name=" + name + "]").focus();
		}, 5);
	}

	function postCreate(item, condition, school) {
		var item_type = item.item_type;

		itemTypeId = typeof item_type == "object" ? item_type.id : item_type;

		$http.post("/item", {
			item_type: itemTypeId,
			item_make: item.id,
			condition: condition,
			isCheckedOut: false,
			school: school,
			created_by: $scope.Users[0].id
		})
	}

	function createItems(item) {
		var school = $scope.currentSchool.id || $scope.Users[0].currentSchool.id,
			count = 1;

		_.forEach($s.conditions, function(cond) {
			for(var i = 0; i < $s.newFormFields['quantity' + cond.field]; i++) {
				postCreate(item, cond.field.toLowerCase(), school);
				count++;
			}
		});
		$timeout(function() {
			$s.newForm.loading = false;
			$s.$state.go("school.manage.items");
		}, count * 10);
	} 
	// set-up newForm loading state
	$s.newForm = {
		loading: false
	};
	$s.conditions = [{
		field: "New",
		label: "New",
		text: "new items"
	},{
		field: "Good",
		label: "Good",
		text: "good items"
	},{
		field: "Repair",
		label: "Needs Repair",
		text: "items that need repair"
	}];
	$s.currentItem = false;
	$s.parentScope = $scope;
	$s.newFormFields = { conditionNew: true};

	$sailsBind.bind("item_type", $s);
	//$sailsBind.bind("manufacturer", $s);

	$s.scan = function() {
		if($s.newFormFields.sku.toString().length >= 12) {
			$http.get("/info/" + $s.newFormFields.sku)
			.then(function(sailsResponse) {
				if(typeof sailsResponse.data == "object") {
					if(sailsResponse.data.id) {
						$s.currentItem = sailsResponse.data;
						if($s.currentItem.item_type) {
							$s.hideType = true;
						}
					}
				} else {
					$s.noResults = true;
				}
			});
		}
	};

	$s.blurType = function() {
		if(typeof $s.newFormFields.item_type == "string") {
			if(!$s.currentItem && !$s.newFormFields.description) {
				$s.showDescription = true;
				changeFocus('description');
			}
		}
	};

	$s.selectitemtype = function($i, $m, $l) {
		if(typeof $i == "object") { 
			$sailsBind.bind("item_type/" + $i.id + "/item_makes", $s, null, function() {
				if($s.item_makess.length > 0) {
					$s.showMake = true;
					$s.showDescription = false;
					changeFocus('item_make');
				} else if(!$s.currentItem) {
					$s.showDescription = true;
					changeFocus('description');
				}
			});
		} else {
			$s.customMake = true;
		}
	}

	$s.submitNewForm = function (){
		// Set the loading state (i.e. show loading spinner)
		$s.newForm.loading = true;

		if($s.currentItem) {
			if(typeof $s.currentItem.item_type == "object") {
				createItems($s.currentItem);
				return true;
			}
		} else if(typeof $s.newFormFields.item_make == "object") {
			createItems($s.newFormFields.item_make);
			return true;
		}
		// create item_make
		if(typeof $s.newFormFields.item_type == "string") {
			$http.post("/item_type", {
				name: $s.newFormFields.item_type,
				created_by: $scope.Users[0].id
			})
			.then(function(sailsResponse) {
				$s.newFormFields.item_type = sailsResponse.data;
				if($s.currentItem) {
					$http.post("/Item_Make/" + $s.currentItem.id, {
						item_type: sailsResponse.data.id
					})
					.then(function() {
						createItems($s.currentItem);
					})
				} else {
					createItemMake();
				}
			});
		} else {
			if($s.currentItem) {
				$http.post("/Item_Make/" + $s.currentItem.id, {
					item_type: $s.newFormFields.item_type.id
				})
				.then(function() {
					createItems($s.currentItem);
				})
			} else {
				createItemMake();
			}
		}
	};

	function createItemMake() {
		var rand = Math.floor(Math.random() * 999999999) + 100000000,
			type = $s.newFormFields.item_type,
			//man = $s.newFormFields.manufacturer,
			sku = $s.newFormFields.sku || "999" + rand;

		$http.post("/item_make", {
			description: $s.newFormFields.description || $s.newFormFields.item_make,
			item_type: type.id,
			//manufacturer: man.id,
			sku: sku,
			created_by: $scope.Users[0].id
		})
		.then(function(sailsResponse) {
			if(sailsResponse.data.id) {
				createItems(sailsResponse.data);
			}
		});
	}
}]);
