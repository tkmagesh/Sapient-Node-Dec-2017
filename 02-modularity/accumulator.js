let result = 0;
let accumulator = {
	add(value){
		result += value;
	},
	subtract(value){
		result -= value;
	},
	multiply(value){
		result *= value;
	},
	divide(value){
		result /= value;
	},
	getResult(){
		return result;
	}
}
module.exports = accumulator;