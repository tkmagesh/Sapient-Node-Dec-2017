const http = require('http');
const dataParser = require('./dataParser');
const serveStatic = require('./serveStatic');
const calculatorHandler = require('./calculatorHandler');
const notFoundHandler = require('./notFoundHandler');

let _middlewares = [dataParser, serveStatic, calculatorHandler, notFoundHandler];

let server = http.createServer(function(req, res){
	function exec(req, res, middlewares){
		let first = middlewares[0],
			remaining = middlewares.slice(1),
			next = function(){
				exec(req, res, remaining)
			};
		if (typeof first === 'function')
			first(req, res, next);
	}
	exec(req, res, _middlewares);
});

server.listen(8085);

