import reason from "./Errors.js";
import types from './Types.js'

export default class Set{
	config: object = {
		allowedTypes: types,
	}
	default:object;
	constructor(defaultConfig:object){
		this.default = defaultConfig;
	}
	parse(element:string){
		const params:string[] = element.split(':');
		const obj:object = structuredClone(this.default);
		//we check value in main script
		delete obj["value"];
		obj["globalKey"] = undefined;
		const checked: object = structuredClone(obj);
		Object.keys(checked).forEach(key=>checked[key] = false);
		//we dont need to have checker for require, cuz we check it any time
		delete checked['require'];

		params.forEach((p:string)=>{
			p = this.#isRequired(p,obj,checked); //check everytime, cuz ! can be anywhere
			if(this.#findTypes(p,obj,checked)) return true;
			this.#findVariationsAndGlobalKey(p,obj,checked);//must be below all
		});
		// console.log({obj,checked})
		if(!checked["globalKey"]) throw Error(reason['!GlobalKey'])
		const globalKey = obj["globalKey"];
		delete obj["globalKey"]
		return {key:globalKey,data:obj};
	}

	#findVariationsAndGlobalKey(p:string,obj:object,checked:object){
		//globalkey is invalid
		if(!p.length) return false;

		const temp = p.split('|');
		//first would be global key, other will be variations
		obj["globalKey"] = temp.shift();
		checked["globalKey"] = true;
		if(temp.length>0){
			obj["variations"] = temp;
			checked["variations"] = true;
		}
		return true;
	}
	#isRequired(p:string,obj:object,checked:object){
		if(!obj['require']){
			if(p[0]==='!'){
				obj['require'] = true;
				p = p.slice(1);
			}
		} return p;
	}
	#findTypes(p:string,obj:object,checked:object){
		if(checked["types"]) return false;

		//its not a type thing
		if(!(p[0]==='<' && p.at(-1)==='>')) return false;
		const types = p.slice(1,-1).split('|');
		//check types if they are valid
		if(!types.every(type=>this.config['allowedTypes'].includes(type))) throw Error(reason["!Type"]);
		checked["types"] = true;
		obj["types"] = types;
		return true;
	}
}