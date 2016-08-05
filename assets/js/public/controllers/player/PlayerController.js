angular.module('AppModule').controller('PlayerController', ['$scope', '$http', 'toastr', '$sailsBind', '$timeout', '$sce', function($s, $http, toastr, $sailsBind, $timeout, $sce){

	$s.player = $scope.currentPlayer;

	if(!$s.player.id) {
		$s.$state.go("check");
	}
}]);
