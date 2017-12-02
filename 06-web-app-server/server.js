let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

let server = http.createServer(function(req, res){

	let urlObj = url.parse(req.url),
		rawData = querystring.parse(urlObj.query),
		resourcePath = path.join(__dirname, urlObj.pathname);

	if (isStatic(urlObj.pathname)){
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (urlObj.pathname === '/calculator'){
		let op = rawData.op,
			n1 = parseInt(rawData.n1),
			n2 = parseInt(rawData.n2);
		
		let result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8085);

