/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addUser: function(req, res) {
		School.findOne(req.param("school"), function (err, school){
			school.users.add(req.session.me);
			school.save(console.log);
			// is good
			User.update({id: req.session.me}, {currentSchool: req.param("school")}).exec(function(err, user) {
				if(err) {
					res.negotiate(err);
				}
				res.json(school);
			});
		});
	},
	addSport: function(req, res) {
		School.findOne(req.param("school"), function (err, school){
			school.sports.add(req.param("sport"));
			school.save(console.log);

			User.update({id: req.session.me}, {currentSport: req.param("sport")}).exec(function(err, user) {
				if(err) {
					res.negotiate(err);
				}
				res.json(school);
			});
		});
	},
	getItems: function(req, res) {
		//School.findOne(req.param("school")).populate("items").exec(function(err, school) {
		School.findOne(req.param("school")).populate("items").exec(function(err, school) {
			var data = {},
				index = 0,	
				countItems = _.countBy(school.items, function(item) {
					return item.item_make;
				}),
				keys = _.keys(countItems).length;

			if(keys > 0) {
				_.each(countItems, function(val, key) {
					Item_Make.findOne(key).populate("item_type").exec(function(err, make) {
						data[make.item_type.name] = {
							key: make.item_type.name,
							value: val,
							id: make.item_type.id
						}
						index++;

						if(index == keys) {
							res.json(data);
						}
					})
				});
			} else {
				res.ok();
			}
		})
	},
	getItemType: function(req, res) {
		//School.findOne(req.param("school")).populate("items").exec(function(err, school) {
		Item.find({
			school: req.param("school"),
			item_type: req.param("item_type")
		}).populate("item_make").exec(function(err, items) {
			if(err) {
				negotiate(err);
			} else {
				res.json(items);
			}
		})
	},
	getRentedItems: function(req, res) {
		Item.find({
			school: req.param("school"),
			item_make: req.param("item_make"),
			condition: req.param("condition"),
			isCheckedOut: true
		}).populate("rentals").populate("item_make").exec(function(err, items) {
			Player.find({school: req.param("school")}, function(err, players) {
				_.each(items, function(item) {
					var rentals = _.sortBy(item.rentals, function(rental) {
						// rentals without "date_returned" will be on the top of the list
						return rental.date_returned ? 1 : -1;
					});
					item.player = _.findWhere(players, {id: rentals[0].player});
					console.log(item.player.name);
				});
				res.json(items);
			})
		});
	},
	getSportItems: function(req, res) {
		var schoolId = req.param("school"),
			playerId = req.param("player"),
			sportId = req.param("sport");

		if(schoolId && playerId && sportId) {
			School_Sport_Item_Type.find({
				school: schoolId,
				sport: sportId
			}).populate("item_type").exec(function(err, items) {
				Player_Item_Rental.find({
					player: playerId
				}).populate("item").exec(function(err, rentals) {
					_.each(items, function(item) {
						var rented = _.filter(rentals, function(rental) {
							if(!rental.date_returned) {
								if(typeof rental.item.item_type == "object") {
									return rental.item.item_type.id == item.item_type.id;
								} else {
									return rental.item.item_type == item.item_type.id;
								}
							}
						});

						if(rented.length) {
							item.checked = true;
						}
					});
					res.json(items);
				});
			});
		} else {
			res.ok();
		}
	},
	playerRental: function(req, res) {
		var schoolId = req.param("school"),
			playerId = req.param("player"),
			itemTypeId = req.param("item_type");

		if(schoolId && playerId && itemTypeId) {
			Item.findOne({
				school: schoolId,
				item_type: itemTypeId,
				isCheckedOut: false
			}, function(err, item) {
				if(err) {
					negotiate(err);
					return;
				}
				item.isCheckedOut = item.isCheckedOut || false;
				if(req.param("create")) {
					console.log("create");
					Player_Item_Rental.create({
						item: item.id,
						player: playerId,
						date_rented: new Date().toDateString()
					}, function() {
						item.isCheckedOut = true;
						item.save();
						res.ok();
					});
				} else {
					console.log("destroy");
					Player_Item_Rental.destroy({
						item: item.id,
						player: playerId
					}, function() {
						item.isCheckedOut = false;
						item.save();
						res.ok();
					});
				}
			});
		} else {
			res.ok();
		}
	}
};