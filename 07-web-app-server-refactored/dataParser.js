var url = require('url'),
	querystring = require('querystring');

module.exports = function(req){
	req['urlObj'] = url.parse(req.url),
	req['queryData'] = querystring.parse(req.urlObj.query);
}