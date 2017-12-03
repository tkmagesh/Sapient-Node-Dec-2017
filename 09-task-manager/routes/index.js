var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var options = {
    	root: __dirname + '/public/'
  	};

  var fileName = 'index.html';
  res.sendFile(fileName);
});

module.exports = router;
