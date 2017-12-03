var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req['urlObj'] = url.parse(req.url),
	req['queryData'] = querystring.parse(req.urlObj.query);
	if (req.method === "GET"){
		next();
		return;
	}
	let data = '';
	req.on('data', function(chunk){
		data += chunk;
	});
	req.on('end', function(){
		req.bodyData = querystring.parse(data);
		next();
	});
}