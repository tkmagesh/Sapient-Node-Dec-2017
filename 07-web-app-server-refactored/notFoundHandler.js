module.exports = function(res){
	console.log('notFoundHandler triggered');
	res.statusCode = 404;
	res.end();
}