var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let products = [
		'Pen',
		'Pencil'
	];
	let viewData = {
		title : 'Product List',
		products : products
	};
  res.render('index', viewData);
});

module.exports = router;
