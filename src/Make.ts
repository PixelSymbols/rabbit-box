import reason from "./Errors.js";
import { isNumber, isObject } from "./external.js";
import types from "./Types.js";
export default class Make{
	holder: object;
	keys: object;
	constructor(holderRef){
		this.holder = holderRef;
	}
	parse(p:string){

	}
	#isExists(p:string,holderKeys){
		let position:number = holderKeys.indexOf(p);
		if(position!==-1) return position;
		holderKeys.every((key:string,index:number)=>{
			if(this.holder[key]['variations'].includes(p)){
				position = index;
				return false;
			} return true;
		});
		return position;
	}
	isSettings(p:object){
		const newValues:object = {};
		const holderKeys = Object.keys(this.holder);
		const isSettings:boolean = Object.keys(p).every((key:string)=>{
			const value:any = p[key];
			const position:number = this.#isExists(key,holderKeys);
			if(position===-1) return false;
			const holderKey = holderKeys[position];
			newValues[holderKey] = value;
			return true;
		});
		return isSettings ? newValues : false;
	}
	checkRequirements(){
		const missing = []
		const wrongTypes = []
		const keys: string[] = Object.keys(this.holder);
		Object.values(this.holder).forEach((e,i)=>{
			//required
			e['require'] && e['value']===undefined ? missing.push(`${i}:${keys[i]}`) : 0
			//types
			// console.log(e)
			this.#isRightType(e);
		});
		const isSatisfy:boolean = !!missing.length;
		if(isSatisfy) throw Error(`${reason["!Requirements"]}\n==>\t${missing}`)
		return true;
	}
	#isRightType(obj){
		const {types,value} = obj;
		if(types==='any') return;
		const advancedTypes = {
			'object':()=>isObject(value),
			'number':()=>isNumber(value),
			'int':()=>typeof value==='number',
			'char':()=>typeof value==='string' ? value.length===1 : false,
		}
		const typeFound:boolean = !Object.keys(advancedTypes).every(key=>{
			if(advancedTypes[key]()){
				if(types.includes(key)) return false;
				else throw Error(`${reason['!Type']}\n==>\t${types}`);
			} return true;
		})
		if(typeFound) return true;
		if(['bigint','boolean','function','string','symbol','undefined'].includes(typeof value) && types.includes(typeof value)) return true;
		throw Error(`${reason['!Type']}\n==>\t${types}`);

	}
	isDNR(args){
		let position = args.indexOf('#DNR')
		let isEmpty = false;
		if(position!==-1){
			if(args.length===1){
				this.checkRequirements();
				isEmpty = true;
			}
		}
		return {isEmpty,position};
	}
}