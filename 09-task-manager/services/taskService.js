let tasks = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Node.js', isCompleted : true},
	{id : 3, name : 'Plan vacation', isCompleted : false},
];

function getAll(onComplete){
	setTimeout(function(){
		onComplete(tasks);
	},4000);
}

function addNew(newTask, onComplete){
	setTimeout(function(){
		let newTaskId = tasks.reduce((prevResult, task) => prevResult > task.id ? prevResult : task.id, 0) + 1;
		newTask.id = newTaskId;
		tasks.push(newTask);
		onComplete(newTask);
	},4000);
}

function update(id, updatedTask, onComplete){	
	setTimeout(function(){
		tasks = tasks.map(taskInList => taskInList.id === id ? updatedTask : taskInList);
		onComplete(updatedTask);
	},4000);
}

function remove(id, onComplete){
	setTimeout(function(){
		tasks = tasks.filter(taskInList => taskInList.id !== id);
		onComplete();
	},4000);
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};