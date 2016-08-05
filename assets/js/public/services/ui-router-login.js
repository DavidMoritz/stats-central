angular.module('uiRouterLogin', [
	'ui.router'
]).config(function ($stateProvider,   $urlRouterProvider) {
	$stateProvider
		.state('login', {
			url: '/login',
			controller: 'SignupController',
			templateUrl: '/jade/login'
		})
		.state('login.signup', {
			url: '/signup',
			views: {
				'': {
					templateUrl: '/jade/login-signup'
				},
				'title@': {
					template: 'Sign Up'
				}
			}
		})
		.state('login.form', {
			url: '/form',
			views: {
				'': {
					templateUrl: '/jade/login-form'
				},
				'title@': {
					template: 'Login'
				}
			}
		})
		.state('sport', {
			url: '/sport',
			views: {
				'': {
					controller: 'SportController',
					templateUrl: '/jade/select'
				},
				'title@': {
					template: 'Choose Sport'
				}
			}
		})
		.state('sport.add', {
			url: '/add',
			views: {
				'': {
					templateUrl: '/jade/add',
					controller: 'SportAddController'
				},
				'title@': {
					template: 'Add Sport'
				}
			}
		})
		.state('sport.manage', {
			url: '/manage/items',
			views: {
				'': {
					templateUrl: '/jade/add-items',
					controller: 'SportManageController'
				},
				'title@': {
					template: "Manage Items"
				}
			}
		})
		.state('sport.create', {
			url: '/create',
			views: {
				'': {
					templateUrl: '/jade/create',
					controller: 'SportCreateController'
				},
				'title@': {
					template: "Create new sport"
				}
			}
		})
		.state('school', {
			url: '/school',
			views: {
				'': {
					controller: 'SchoolController',
					templateUrl: '/jade/select'
				},
				'title@': {
					template: 'Choose School'
				}
			}
		})
		.state('school.add', {
			url: '/add',
			views: {
				'': {
					templateUrl: '/jade/add',
					controller: 'SchoolAddController'
				},
				'title@': {
					template: "Add school"
				}
			}
		})
		.state('school.add.item', {
			url: '/item',
			views: {
				'': {
					templateUrl: '/jade/create-items',
					controller: 'SchoolAddItemController'
				},
				'title@': {
					template: "Add Inventory"
				}
			}
		})
		.state('school.add.player', {
			url: '/player',
			views: {
				'': {
					templateUrl: '/jade/create',
					controller: 'SchoolAddPlayerController'
				},
				'title@': {
					template: "Add Player"
				}
			}
		})
		.state('school.manage', {
			url: '/manage',
			controller: 'SchoolManageController',
			templateUrl: '/jade/manage'
		})
		.state('school.manage.items', {
			url: '/items',
			views: {
				'': {
					templateUrl: '/jade/manage',
					controller: 'SchoolManageItemsController'
				},
				'title@': {
					template: "Manage Inventory"
				}
			}
		})
		.state('school.manage.items.item_type', {
			url: '/:id',
			views: {
				'': {
					templateUrl: '/jade/manage-item-type',
					controller: 'SchoolManageItemTypeController'
				},
				'title@': {
					template: "Manage Inventory"
				}
			}
		})
		.state('school.manage.players', {
			url: '/players',
			views: {
				'': {
					templateUrl: '/jade/manage-items',
					controller: 'SchoolManagePlayersController'
				},
				'title@': {
					template: "Manage Players"
				}
			}
		})
		.state('school.rented', {
			url: '/:condition/:item',
			views: {
				'': {
					templateUrl: '/jade/rented-items',
					controller: 'SchoolRentedItemsController'
				},
				'title@': {
					template: "Rented Out"
				}
			}
		})
		.state('school.create', {
			url: '/create',
			views: {
				'': {
					templateUrl: '/jade/create',
					controller: 'SchoolCreateController'
				},
				'title@': {
					template: "Create new school"
				}
			}
		})
		.state('player', {
			url: '/player',
			views: {
				'': {
					controller: 'PlayerController',
					templateUrl: '/jade/info'
				},
				'title@': {
					template: 'Player Info'
				}
			}
		})
		.state('player.checkin', {
			url: '/checkin',
			views: {
				'': {
					controller: 'PlayerCheckinController',
					templateUrl: '/jade/player-checkin'
				},
				'title@': {
					template: 'Checkin'
				}
			}
		})
		.state('player.checkout', {
			url: '/checkout',
			views: {
				'': {
					controller: 'PlayerCheckoutController',
					templateUrl: '/jade/player-checkout'
				},
				'title@': {
					template: 'Checkout'
				}
			}
		})
		.state('check', {
			url: '/check',
			controller: 'CheckController',
			templateUrl: '/jade/check'
		})
		.state('check.in', {
			url: '/checkin',
			views: {
				'': {
					controller: 'CheckController',
					templateUrl: '/jade/add'
				},
				'title@': {
					template: 'Checkin'
				}
			}
		})
		.state('check.out', {
			url: '/checkout',
			views: {
				'': {
					controller: 'CheckController',
					templateUrl: '/jade/add'
				},
				'title@': {
					template: 'Checkout'
				}
			}
		})
});