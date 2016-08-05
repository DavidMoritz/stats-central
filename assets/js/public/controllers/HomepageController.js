angular.module('AppModule').controller('HomepageController', ['$scope', '$http', 'toastr', '$sailsBind', function($s, $http, toastr, $sailsBind){

	// set-up loginForm loading state
	$s.loginForm = {
		loading: false
	}

	$s.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $s.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $s.loginForm.email,
      password: $s.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      $scope.loggedIn = true;
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
