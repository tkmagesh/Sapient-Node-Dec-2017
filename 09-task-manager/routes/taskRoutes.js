var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');


router.get('/', function(req, res, next) {
	taskService.getAll((tasks) => res.json(tasks));
});

router.post('/', function(req, res,next){
	let newTaskData = req.body;
	taskService.addNew(newTaskData, function(newTask){
		res.status(201).json(newTask);
	});
});

router.put('/:id', function(req, res, next){
	let updatedTaskId = parseInt(req.params.id),
		updatedTaskData = req.body;
	taskService.update(updatedTaskId, updatedTaskData, function(updatedTask){
		res.status(200).json(updatedTask);	
	});
	
});

router.delete('/:id', function(req, res, next){
	let deletedTaskId = parseInt(req.params.id);
	taskService.remove(deletedTaskId, function(){
		res.status(200).json({});	
	});
});

module.exports = router;