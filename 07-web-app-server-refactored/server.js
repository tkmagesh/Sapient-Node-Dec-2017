const http = require('http');
const dataParser = require('./dataParser');
const serveStatic = require('./serveStatic');
const calculatorHandler = require('./calculatorHandler');
const notFoundHandler = require('./notFoundHandler');
const app = require('./app');
const path = require('path');

app.use(dataParser);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8085);

