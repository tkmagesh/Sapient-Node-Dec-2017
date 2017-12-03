const calculator = require('./calculator');
const querystring = require('querystring');

module.exports = function(req, res, next){
	if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
		let op = req.queryData.op,
			n1 = parseInt(req.queryData.n1),
			n2 = parseInt(req.queryData.n2);
		
		let result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
		next();
	} else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){

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
			next();
		});

	} else {
		next();
	}
}