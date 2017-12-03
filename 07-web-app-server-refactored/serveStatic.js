const path = require('path'),
	  fs = require('fs');

let staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.json', '.xml'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) !== -1;
}

module.exports = function(req, res){
	let resourcePath = path.join(__dirname, req.urlObj.pathname);

	if (isStatic(req.urlObj.pathname)){
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	}
}