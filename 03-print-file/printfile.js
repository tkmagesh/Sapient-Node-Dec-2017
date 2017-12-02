const fs = require('fs');

//sync
//const fileContents = fs.readFileSync('./test.txt', { encoding : 'utf8'});

fs.readFile('./test.txt', { encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log(err);
		return;
	}
	console.log(fileContents);
});