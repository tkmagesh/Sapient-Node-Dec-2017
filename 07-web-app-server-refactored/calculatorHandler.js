const calculator = require('./calculator');
const querystring = require('querystring');

module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator'){
		let data = req.method === 'GET' ? req.queryData : req.bodyData;
		let op = data.op,
			n1 = parseInt(data.n1),
			n2 = parseInt(data.n2);
		
		let result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else {
		next();
	}
}