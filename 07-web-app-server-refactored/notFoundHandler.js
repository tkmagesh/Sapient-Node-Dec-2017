module.exports = function(req, res, next){
	res.statusCode = 404;
	res.end();
	next();
}