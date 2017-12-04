var pgm = (function(){
	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}
	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning result`);
			callback(result);
		}, 4000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);	
		});
	}

	var addAsyncEvents = (function(){
		var _subscribers = [];
		function process(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				_subscribers.forEach(_subscriber => _subscriber(result));
			}, 4000);
		}
		function subscribe(callback){
			_subscribers.push(callback);
		}
		return {
			process : process,
			subscribe : subscribe
		}
	})();

	function addAsyncPromise(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				resolveFn(result);
			}, 4000);
		});
		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})();


var promise = pgm.addAsyncPromise(100,200);
var dPromise = promise.then(function(result) {
	console.log(`[@Client] result = ${result}`)
	var dPromise = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var doubleResult = result * 2;
			resolveFn(doubleResult);
        }, 4000)
	});
	return dPromise;
});


var promise = pgm.addAsyncPromise(100,200);
var dPromise = promise.then(function(result) {
	console.log(`[@Client] result = ${result}`)
	var dPromise = new Promise(function(resolveFn, rejectFn){
		resolveFn(result * 2);
	});
	return dPromise;
});

var promise = pgm.addAsyncPromise(100,200);
var dPromise = promise.then(function(result) {
	console.log(`[@Client] result = ${result}`)
	return Promise.resolve(result * 100);
});


var promise = pgm.addAsyncPromise(100,200);
var dPromise = promise.then(function(result) {
	console.log(`[@Client] result = ${result}`)
	return result * 100;
});

function addAsyncPromiseClient(x,y){
	console.log(`[@Client] triggering add`);
	pgm.addAsyncPromise(x,y)
		.then(function(result){
			console.log(`[@Client] result = ${result}`);
    	});
}


async function addAsyncPromiseClient(x,y){
	console.log(`[@Client] triggering add`);
	var result = await pgm.addAsyncPromise(x,y);
	console.log(`[@Client] result = ${result}`);	
}

