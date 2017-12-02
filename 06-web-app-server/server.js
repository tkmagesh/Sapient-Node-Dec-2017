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
		queryData = querystring.parse(urlObj.query),
		resourcePath = path.join(__dirname, urlObj.pathname);

	if (isStatic(urlObj.pathname)){
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET '){
		let op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		
		let result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){

		let data = '';
		req.on('data', function(chunk){
			data += chunk;
		});
		req.on('end', function(){
			let bodyData = querystring.parse(data);
			let op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2);
			
			let result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		});

	} else {
		res.statusCode = 404;
		res.end();
	}
});

process.on('uncaughtException', function(err){
	console.log('something went wrong', err);
});

server.listen(8085);

