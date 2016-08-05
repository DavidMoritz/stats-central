angular.module('AppModule').controller('SignupController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	// set-up loading state
	$s.signupForm = {
		loading: false
	};
	$s.loginForm = {
		loading: false
	};
	$s.collapse = {};
	$s.status = {
		isFirstOpen: true,
		isFirstDisabled: false
	};

	function resolveLogin(user) {
		user = user || {};

		$sailsBind.bind("User", $scope, {id: user.id} , function() {
			if(!user.id) {
				$scope.$state.go("signup");
			} else if(!user.currentSchool) {
				$scope.$state.go("school");
			} else if(!user.currentSport) {
				$scope.currentSchool = $scope.Users[0].currentSchool;
				$scope.$state.go("sport");
			} else {
				$scope.currentSchool = $scope.Users[0].currentSchool;
				$scope.currentSport = $scope.Users[0].currentSport;
				$scope.$state.go("check");
			}
		});
	}

	$s.toggleCollapse = function(open) {
		var initState = $s.collapse[open];
		$s.collapse = {};
		$s.collapse[open] = !initState;
	}

	$s.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$s.signupForm.loading = true;

		// Submit request to Sails.
		$http.post('/signup', {
			name: $s.signupForm.name,
			title: $s.signupForm.title,
			email: $s.signupForm.email,
			password: $s.signupForm.password
		})
		.then(function onSuccess(res){
			resolveLogin(res.data);
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$s.signupForm.loading = false;
		})
	};

	$s.submitLoginForm = function (){

		// Set the loading state (i.e. show loading spinner)
		$s.loginForm.loading = true;

		// Submit request to Sails.
		$http.put('/login', {
			email: $s.loginForm.email,
			password: $s.loginForm.password
		})
		.then(function onSuccess (res){
			// Refresh the page now that we've been logged in.
			resolveLogin(res.data);
		})
		.catch(function onError(sailsResponse) {

			// Handle known error type(s).
			// Invalid username / password combination.
			if (sailsResponse.status === 400 || 404) {
				// $s.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
				//
				toastr.error('Invalid email/password combination.', 'Error', {
					closeButton: true
				});
				return;
			}

				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

		})
		.finally(function eitherWay(){
			$s.loginForm.loading = false;
		});
	};
}]);
