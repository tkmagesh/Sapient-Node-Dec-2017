let _middlewares = [];

function exec(req, res, middlewares){
	let first = middlewares[0],
		remaining = middlewares.slice(1),
		next = function(){
			exec(req, res, remaining)
		};
	if (typeof first === 'function')
		first(req, res, next);
}

function app(req, res){
	exec(req, res, _middlewares);
}

app['use'] = function(middleware){
	_middlewares.push(middleware);
}

module.exports = app;
