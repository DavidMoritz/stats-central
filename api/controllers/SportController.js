/**
 * SportController
 *
 * @description :: Server-side logic for managing sports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	currentSport: function(req, res) {
		Sport.findOne(req.param("sport"), function (err, sport){
			User.update({id: req.session.me}, {currentSport: req.param("sport")}).exec(function(err, user) {
				if(err) {
					res.negotiate(err);
				}
				res.json(sport);
			});
		});
	},
	addSport: function(req, res) {
		if(req.session.me) {
			// Create a Sport with the params sent from
			// the new-sport form --> choose.ejs
			User.findOne({id: req.session.me}, function foundUser(err, user) {
				Sport.create({
					name: req.param('name'),
					size: req.param('size'),
					season: req.param('season'),
					school: user.school,
					createdBy: user.name
				}, function sportCreated(err, newSport) {
					if (err) {

						console.log("err: ", err);
						console.log("err.invalidAttributes: ", err.invalidAttributes)

						// Otherwise, send back something reasonable as our error response.
						return res.negotiate(err);
					}

					// Send back the id of the new Sport
					return res.view('sports/choose');
				});
			});
		} else {
			return res.view('signup');
		};
	}
};

