let tasks = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Node.js', isCompleted : true},
	{id : 3, name : 'Plan vacation', isCompleted : false},
];

function getAll(){
	return tasks;
}

function addNew(newTask, onComplete){
	let newTaskId = tasks.reduce((prevResult, task) => prevResult > task.id ? prevResult : task.id, 0) + 1;
	newTask.id = newTaskId;
	setTimeout(function(){
		tasks.push(newTask);
		onComplete(newTask);
	},4000);
}

function update(id, updatedTask){
	tasks = tasks.map(taskInList => taskInList.id === id ? updatedTask : taskInList);
	return updatedTask;
}

function remove(id){
	tasks = tasks.filter(taskInList => taskInList.id !== id);
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};