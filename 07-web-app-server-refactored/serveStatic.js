const path = require('path'),
	  fs = require('fs');

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		let resourcePath = path.join(staticResourcePath, req.urlObj.pathname);

		if (isStatic(req.urlObj.pathname)){
			if (!fs.existsSync(resourcePath)){
				res.statusCode = 404;
				res.end();
				next();
			}
			let stream = fs.createReadStream(resourcePath);
			stream.pipe(res);
			stream.on('end', () => next());
		} else {
			next();
		}
	};
};