import Set from "./Set.js";
import Make from "./Make.js";
import { isObject } from "./external.js";
import reason from "./Errors.js";
export default class RabbitBox {
    holder = {};
    config = {
        default: {
            require: false,
            variations: [],
            types: 'any',
            value: undefined,
        },
    };
    setChecker = new Set(this.config.default);
    makeChecker = new Make(this.holder);
    constructor(...args) {
        this.set(args);
    }
    set(args) {
        args.forEach(element => {
            //make object from string
            if (typeof element === 'string') {
                const temp = {};
                temp[element] = undefined;
                element = temp;
            }
            if (isObject(element)) {
                Object.keys(element).forEach(key => {
                    const temp = this.setChecker.parse(key);
                    this.holder[temp['key']] = temp['data'];
                    this.holder[temp['key']]['value'] = element[key];
                });
                return;
            }
            //if there is another type occured
            throw Error(reason['!Set']);
        });
    }
    make(...args) {
        const temp = this.makeChecker.isDNR(args);
        if (temp['isEmpty'])
            return false;
        else
            temp['position'] !== -1 ? args.splice(temp['position'], 1) : 0;
        const holderKeys = Object.keys(this.holder);
        args.forEach((element, globalPosition) => {
            element = this.makeChecker.shortcuts(element);
            if (isObject(element)) {
                let newValues = false;
                const isElementEmpty = !Object.keys(element).length;
                if (!isElementEmpty)
                    newValues = this.makeChecker.isSettings(element);
                if (newValues !== false) {
                    Object.keys(newValues).forEach((key) => {
                        this.holder[key]['value'] = newValues[key];
                    });
                    return true;
                }
            }
            this.holder[holderKeys[globalPosition]]['value'] = element;
            return;
        });
        this.makeChecker.checkRequirements();
        const result = {};
        holderKeys.forEach(key => result[key] = this.holder[key]['value']);
        return result;
    }
}
//# sourceMappingURL=index.js.map