import Config from "./Config.js";

function base(value:string,devideByWhat:string='or'){
	let output = [''];
	let position = 0;
	value.split('').forEach(symbol=>{
		if(Config['symbol'][devideByWhat].includes(symbol)){
			output.push('');
			position++;
			return;
		} output[position]+=symbol;
	})
	return output;
}
function or(value:string){
	return base(value,'or');
}
function devide(value:string){
	return base(value,'devide');
}
export default {or,devide}