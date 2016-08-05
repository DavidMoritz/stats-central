/**
 * Item_MakeController
 *
 * @description :: Server-side logic for managing Item_makes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// free api key from outpan.com for davidmoritz worth 50,000 requests per day
var apiKey = "b6a465db99141f5857a789bd1da2f63f", 
https = require("https");

module.exports = {
	productInfo: function(req, res) {
		var options = {
			"method": "GET",
			"hostname": "api.outpan.com",
			"port": 443,
			"auth": apiKey + ":",
			"path": "/v1/products/" + req.param("gtin"),
		}, 
		product;

		Item_Make.findOne({sku: req.param("gtin").toString()}).populate("item_type").exec(function(err, make) {
			if(!make) {
				var outPan = https.request(options, function (response) {
					response.once("data", function (d) {
						product = JSON.parse(d);

						if(product.name) {
							var creds = product.attributes;
							creds.sku = product.gtin;
							creds.description = product.name;
							creds.created_by = req.session.me || 0;

							Item_Make.create(creds, function success(err, newMake) {
								res.json(newMake);
							});
						} else {
							res.ok();
						}
					});
				});
				outPan.end();
			} else {
				res.json(make)
			}
		})
	}
};

