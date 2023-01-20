import {isObject,isNumber} from './external.js'

const all = {
	"undefined":x=>typeof x==='undefined',
	"boolean":x=>typeof x==='boolean',
	"int":x=>typeof x==='number',
	"bigint":x=>typeof x==='bigint',
	"number":x=>isNumber(x),
	"char":x=>typeof x==='string' ? x.length===1 : false,
	"function":x=>typeof x==='function',
	"symbol":x=>typeof x==="symbol",
	"string":x=>typeof x==='string',
	"array":x=>Array.isArray(x),
	"object":x=>isObject(x),
}
const allTypes = Object.keys(all);
function findType(value:any){
	let type = 'any'
	allTypes.every(key=>{
		if(!all[key](value)) return true;
		type = key;
		return false;
	});
	return type;
}
export {allTypes,findType};