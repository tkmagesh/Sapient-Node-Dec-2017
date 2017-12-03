var express = require('express');
var router = express.Router();

let tasks = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Node.js', isCompleted : true},
	{id : 3, name : 'Plan vacation', isCompleted : false},
]
router.get('/', function(req, res, next) {
	res.json(tasks);
});

module.exports = router;