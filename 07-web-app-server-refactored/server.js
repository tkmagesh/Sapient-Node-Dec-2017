const http = require('http');
const dataParser = require('./dataParser');
const serveStatic = require('./serveStatic');
const calculatorHandler = require('./calculatorHandler');
const notFoundHandler = require('./notFoundHandler');
const app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8085);

