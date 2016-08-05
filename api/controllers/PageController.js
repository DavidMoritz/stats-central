/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	userLoggedIn: function(req, res) {
		var view = "signup",
			serverData = {};

		// If not logged in, show the signup page.
		if (!req.session.me) {
			return res.view(view);
		}

		// Otherwise, look up the logged-in user and show the logged-in view,
		// bootstrapping basic user data in the HTML sent from the server
		User.findOne(req.session.me, function (err, user){

			if (err) {
				return res.negotiate(err);
			}

			if (!user) {
				sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
				return res.view(view);
			}

			if (!user.currentSchool) {
				User.findOne(user.id).populate('schools').exec(function(err, user) {
					view = 'choose/school';
					serverData.user = user;

					if(user.schools.length == 0) {
						view = 'add/school';
						serverData.postLocation = '/school',
						serverData.postFinish = '/pickschool'
					}
					return res.view(view, {serverData: serverData});
				});
			}

			if (!user.currentSport) {
				School.findOne(user.currentSchool).populate('sports').exec(function(err, school) {
					view = 'choose/sport';
					if(school.sports.length == 0) {
						view = 'add/sport';
					}
					return res.view(view, {serverData: {user: user, school: school}});
				});
			}

			return user;
		});
	},

	check: function(req, res) {
		var user = this.userLoggedIn(req, res) || {};
		if(user.id) {
			res.view('check', {serverData: {user: user}})
		}
	},

	choose: function(req, res) {
		this.userLoggedIn(req, res, 'sports/choose');
	},

	checkout: function(req, res) {
		this.userLoggedIn(req, res, 'checkout');
	},

	player: function(req, res) {
		req.session.sport = req.param('sport');
		this.userLoggedIn(req, res, 'sports/player');
	},

	checkin: function(req, res) {
		var ctlr = this;
		Player.findOne(req.param('player'), function (err, player) {
			req.session.player = player;
			ctlr.userLoggedIn(req, res, 'sports/checkin');
		});
	},

	index: function(req, res) {
		// Cookies?
		if(req.session.me) {
			User.findOne(req.session.me, function (err, user){
				if (err) {
					return res.negotiate(err);
				} else if (!user) {
					sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
					req.session.me = false;
					res.redirect("/#/signup/");
				} else {
					res.view("index", {_userId: user.id});
				}
			})
		} else {
			res.view("index");
		}
	}

};
