let calculator = {
	add(x,y){
		return x + y;
	},
	subtract(x,y){
		return x - y;
	},
	multiply(x,y){
		return x * y;
	},
	divide(x,y){
		return x / y;
	}
};
console.log('[@calculator.js] calculator -> ', calculator);
module.exports = calculator;