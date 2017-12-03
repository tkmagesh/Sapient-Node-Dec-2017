const http = require('http');
const dataParser = require('./dataParser');
const serveStatic = require('./serveStatic');
const calculatorHandler = require('./calculatorHandler');
const notFoundHandler = require('./notFoundHandler');


let server = http.createServer(function(req, res){
	dataParser(req);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(res);
});

server.listen(8085);

