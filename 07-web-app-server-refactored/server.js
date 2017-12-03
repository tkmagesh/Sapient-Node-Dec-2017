const http = require('http');
const dataParser = require('./dataParser');
const serveStatic = require('./serveStatic');
const calculatorHandler = require('./calculatorHandler');
const notFoundHandler = require('./notFoundHandler');
const app = require('./app');
const path = require('path');
const chalk = require('chalk');


app.use(dataParser);
app.use(function(req, res, next){
	console.log(chalk.yellow(req.method)+'\t'+chalk.bold.blue(req.urlObj.pathname));
	next();
})
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8085);