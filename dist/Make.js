import reason from "./Errors.js";
import { findType, isTypeExpected } from "./Types.js";
export default class Make {
    holder;
    keys;
    constructor(holderRef) {
        this.holder = holderRef;
    }
    parse(p) {
    }
    #isExists(p, holderKeys) {
        let position = holderKeys.indexOf(p);
        if (position !== -1)
            return position;
        holderKeys.every((key, index) => {
            if (this.holder[key]['variations'].includes(p)) {
                position = index;
                return false;
            }
            return true;
        });
        return position;
    }
    isSettings(p) {
        const newValues = {};
        const holderKeys = Object.keys(this.holder);
        const isSettings = Object.keys(p).every((key) => {
            const value = p[key];
            const position = this.#isExists(key, holderKeys);
            if (position === -1)
                return false;
            const holderKey = holderKeys[position];
            newValues[holderKey] = value;
            return true;
        });
        return isSettings ? newValues : false;
    }
    checkRequirements() {
        const missing = [];
        const wrongTypes = [];
        const keys = Object.keys(this.holder);
        Object.values(this.holder).forEach((e, i) => {
            //required
            e['require'] && e['value'] === undefined ? missing.push(`${i}:${keys[i]}`) : 0;
            //types
            this.#isRightType(e);
        });
        const isSatisfy = !!missing.length;
        if (isSatisfy)
            throw Error(`${reason["!Requirements"]}\n==>\t${missing}`);
        return true;
    }
    #isRightType(obj) {
        const { types, value } = obj;
        if (types === 'any')
            return;
        const type = findType(value);
        /* 		console.log({value,expected:types})
                console.log({gotten:type})
                console.log({isTypeExpected:isTypeExpected(type,types)}); */
        if (!isTypeExpected(type, types))
            throw Error(`${reason['!Type']}\n==>\t${types}`);
    }
    isDNR(args) {
        let position = args.indexOf('#DNR');
        let isEmpty = false;
        if (position !== -1) {
            if (args.length === 1) {
                this.checkRequirements();
                isEmpty = true;
            }
        }
        return { isEmpty, position };
    }
}
//# sourceMappingURL=Make.js.map