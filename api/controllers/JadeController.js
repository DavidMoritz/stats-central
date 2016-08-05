/**
 * JadeController
 *
 * @description :: Server-side logic for managing jades
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	route: function(req, res) {
		var path = "jade/" + req.param('path');
		res.view(path, {path: path, _csrf: res.csrf, _res: res, _req: req});
	},
	// contacts: function(req, res) {
	// 	var path = "jade/" + req.param('path');
	// 	res.view(path, {path: path});
	// },
	info: function(req, res) {
		res.json({
			"contacts":[
				{
					"id": 1,
					"name": "Alice",
					"items": [
						{
							"id": "a",
							"type": "phone number",
							"value": "555-1234-1234"
						},
						{
							"id": "b",
							"type": "email",
							"value": "alice@mailinator.com"
						}
					]
				},
				{
					"id": 42,
					"name": "Bob",
					"items": [
						{
							"id": "a",
							"type": "blog",
							"value": "http://bob.blogger.com"
						},
						{
							"id": "b",
							"type": "fax",
							"value": "555-999-9999"
						}
					]
				},
				{
					"id": 123,
					"name": "Eve",
					"items": [
						{
							"id": "a",
							"type": "full name",
							"value": "Eve Adamsdottir"
						}
					]
				}
			]
		})
	}
};

