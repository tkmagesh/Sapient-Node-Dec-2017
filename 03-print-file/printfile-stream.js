const fs = require('fs');

let stream = fs.createReadStream('./calculator.dat', { encoding : 'utf8'});

//events -> open, data, end, close, error
let readCount = 0;


stream.on('data', function(chunk){
	++readCount;
	//console.log(chunk);
});

stream.on('end', function(){
	console.log(`------------------ thats all folks! ------------------ with ${readCount} reads`);
});


stream.on('error', function(err){
	console.log('something went wrong');
	console.log(err);
});


stream.pipe(process.stdout);