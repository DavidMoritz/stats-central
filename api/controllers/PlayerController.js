/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addPlayer: function(req, res) {
		if(req.session.me) {
			// Create a Player with the params sent from
			// the new-Player form --> player.ejs
			User.findOne({id: req.session.me}, function foundUser(err, user) {
				var createObject = {
					name: req.param('name'),
					year: req.param('year'),
					school: user.school,
					createdBy: user.name
				};
				createObject[req.session.sport] = true;
				Player.create(createObject, function PlayerCreated(err, newPlayer) {
					if (err) {

						console.log("err: ", err);
						console.log("err.invalidAttributes: ", err.invalidAttributes)

						// Otherwise, send back something reasonable as our error response.
						return res.negotiate(err);
					}

					// Send back the id of the new Player
					return res.view('Sports/player');
				});
			});
		} else {
			return res.view('signup');
		};
	},
	getRentals: function(req, res) {
		Player_Item_Rental.find({
			player: req.param("player")
		}).populate("item").exec(function(e, rentals) {
			if(e) {
				console.log(e);
				negotiate(e);
			}
			var i = 0;
			var sendData = [];
			_.forEach(rentals, function(rental) {
				if(rental.date_returned) {
					i++;
				} else {
					Item_Make.findOne(rental.item.item_make).populate("item_type").exec(function(e, make) {
						rental.item_make = make;
						sendData.push(rental);
						if(++i == rentals.length) {
							res.json(sendData);
						}
					});
				}
			});
		});
	},
	checkinItem: function(req, res) {
		Player_Item_Rental.findOne(req.param("rentalId"), function(e, rental) {
			var id = typeof rental.item == "object" ? rental.item.id : rental.item;

			rental.date_returned = new Date().toDateString();
			rental.save();

			Item.findOne(id, function(e, item) {
				item.isCheckedOut = false;
				item.condition = req.param("condition");
				item.save();
			})
		});
	}
};

