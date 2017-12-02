let http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

let server = http.createServer(function(req, res){

	let urlObj = url.parse(req.url),
		resourcePath = path.join(__dirname, urlObj.pathname);

	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	
	let stream = fs.createReadStream(resourcePath);
	
	stream.on('data', function(chunk){
		res.write(chunk);
	});
	
	stream.on('end', function(){
		res.end();
	});

});

server.listen(8085);

