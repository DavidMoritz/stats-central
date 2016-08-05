var https = require("https");

var apiKey = "b6a465db99141f5857a789bd1da2f63f";
var gtin = process.argv[2] || "096619756803";

var options = {
	"method": "GET",
	"hostname": "api.outpan.com",
	"port": 443,
	"auth": apiKey + ":",
	"path": "/v1/products/" + gtin,
};

var req = https.request(options, function (res) {
	res.once("data", function (d) {
		var data = JSON.parse(d);
		console.log(data);
	});
});

req.end();