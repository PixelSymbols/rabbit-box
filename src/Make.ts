import Config from "./Config.js";
import reason from "./Errors.js";
import { isNumber, isObject } from "./external.js";
import {findType,isTypeExpected} from "./Types.js";
export default class Make{
	holder: object;
	keys: object;
	constructor(holderRef){
		this.holder = holderRef;
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
			this.#isRightType(e);
		});
		const isSatisfy:boolean = !!missing.length;
		if(isSatisfy) throw Error(`${reason["!Requirements"]}\n==>\t${missing}`)
		return true;
	}
	#isRightType(obj:{types:string[]&string,value:any}){
		const {types,value} = obj
		if(types==='any') return;
		const type:any = findType(value);
/* 		console.log({value,expected:types})
		console.log({gotten:type})
		console.log({isTypeExpected:isTypeExpected(type,types)}); */
		if(!isTypeExpected(type,types)) throw Error(`${reason['!Type']}\n==>\t${types}`);
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
	shortcuts(value:string|object){
		if(!isObject(value)) return value;
		const keys = Object.keys(value);
		const holderKeys = Object.keys(this.holder);
		keys.forEach((p:string)=>{
			let shortcuts:any[] = p.split(Config.symbol['devide']);
			if(shortcuts.length>2) return false; //think about second param, it might cuz instabilty
			if(shortcuts.includes(''))
				shortcuts = [
				shortcuts[0] ? shortcuts[0] : 0,
				shortcuts[1] ? shortcuts[1] : holderKeys.length-1]
			let isShortcut = true;
			const positions = shortcuts.map(e=>{
				let position = 0;
				const isNumberic = isNumber(e);

				if(isNumber(e)){
					position = Number(e);
					position >= holderKeys.length ?
					position%=holderKeys.length :
					position < 0 ? //the same but backwards
					position=(holderKeys.length-position)%holderKeys.length : 0;
					return position;
				}
				position = this.#isExists(e as string,holderKeys)+1;
				if(position!==0) return position;
				isShortcut=false;
				return -1;
			});
			if(!isShortcut) return;
			const v = value[p];
			delete value[p];
			for(let position:number=positions[0];position<=positions[1];position++){
				value[holderKeys[position]] = v;
			}
		})
		console.log(this.holder)
		return value;
	}
}
