/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	quickCode: function(req, res) {
		// console.log("Quick Code Time");
		// Item.find({limit: 0}, function(err, items) {
		// 	if(err) {
		// 		res.negotiate(err);
		// 	} else {
		// 		_.forEach(items, function(item) {
		// 			item.isCheckedOut = false;
		// 			item.save();
		// 		});
		// 		res.json({ok: "yes"});
		// 	}
		// })
	},
	canary: function(req, res) {
		console.log("canary");
		res.json({ok: "yes"});
	}
};

