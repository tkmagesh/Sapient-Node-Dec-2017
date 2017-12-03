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

router.post('/', function(req, res,next){
	let newTaskId = tasks.reduce((prevResult, task) => prevResult > task.id ? prevResult : task.id, 0) + 1;
	let newTaskData = req.body;
	newTaskData.id = newTaskId;
	tasks.push(newTaskData);
	res.status(201).json(newTaskData);
})
module.exports = router;