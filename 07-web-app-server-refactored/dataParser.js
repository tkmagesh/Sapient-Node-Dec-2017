var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req['urlObj'] = url.parse(req.url),
	req['queryData'] = querystring.parse(req.urlObj.query);
	next();
}