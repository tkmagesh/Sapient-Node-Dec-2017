let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let server = http.createServer(function(req, res){

	let urlObj = url.parse(req.url),
		rawData = querystring.parse(urlObj.query),
		resourcePath = path.join(__dirname, urlObj.pathname);

	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	
	let op = rawData.op,
		n1 = parseInt(rawData.n1),
		n2 = parseInt(rawData.n2);
	
	let result = calculator[op](n1, n2);
	res.write(result.toString());
	res.end();
});

server.listen(8085);

