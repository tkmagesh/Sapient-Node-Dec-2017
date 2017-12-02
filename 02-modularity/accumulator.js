/*
console.log('loading accmulatorFactory');
function accmulatorFactory(){
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
	};
	return accumulator;
}
module.exports = accmulatorFactory;
*/

class Accumulator{
	constructor(){
		this.result = 0;
	}
	add(value){
		this.result += value;
	}
	subtract(value){
		this.result -= value;
	}
	multiply(value){
		this.result *= value;
	}
	divide(value){
		this.result /= value;
	}
}
module.exports = Accumulator;