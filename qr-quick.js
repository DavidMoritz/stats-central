var https = require("http");

var options = {
	"method": "GET",
	"hostname": "upcdatabase.org",
	"port": 80,
	"path": "/qr-quick/?" + "me",
};

var req = https.get(options, function (res) {
	var body = '';
	res.on('data', function(d) {
		body += d;
	});
	res.on('end', function() {
		console.log(body.toString());
	});
});

req.end();