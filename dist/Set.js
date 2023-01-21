import reason from "./Errors.js";
import Config from "./Config.js";
import symbol from "./SymbolFunctions.js";
export default class Set {
    config = Config;
    default;
    constructor(defaultConfig) {
        this.default = defaultConfig;
    }
    parse(element) {
        const params = symbol.devide(element);
        const obj = structuredClone(this.default);
        //we check value in main script
        delete obj["value"];
        obj["globalKey"] = undefined;
        const checked = structuredClone(obj);
        Object.keys(checked).forEach(key => checked[key] = false);
        //we dont need to have checker for require, cuz we check it any time
        delete checked['require'];
        params.forEach((p) => {
            p = this.#isRequired(p, obj, checked); //check everytime, cuz ! can be anywhere
            if (this.#findTypes(p, obj, checked))
                return true;
            this.#findVariationsAndGlobalKey(p, obj, checked); //must be below all
        });
        // console.log({obj,checked})
        if (!checked["globalKey"])
            throw Error(reason['!GlobalKey']);
        const globalKey = obj["globalKey"];
        delete obj["globalKey"];
        return { key: globalKey, data: obj };
    }
    #findVariationsAndGlobalKey(p, obj, checked) {
        //globalkey is invalid
        if (!p.length)
            return false;
        const temp = symbol.or(p);
        //first would be global key, other will be variations
        obj["globalKey"] = temp.shift();
        checked["globalKey"] = true;
        if (temp.length > 0) {
            obj["variations"] = temp;
            checked["variations"] = true;
        }
        return true;
    }
    #isRequired(p, obj, checked) {
        if (!obj['require']) {
            if (this.config['symbol']['require'].includes(p[0])) {
                obj['require'] = true;
                p = p.slice(1);
            }
        }
        return p;
    }
    #findTypes(p, obj, checked) {
        if (checked["types"])
            return false;
        //its not a type thing
        if (!(p[0] === this.config['symbol']['types'][0] && p.at(-1) === this.config['symbol']['types'][1]))
            return false;
        const types = symbol.or(p.slice(1, -1));
        //check types if they are valid
        if (!types.every(type => this.config['allowedTypes'].includes(type)))
            throw Error(reason["!Type"]);
        checked["types"] = true;
        obj["types"] = types;
        return true;
    }
}
//# sourceMappingURL=Set.js.map