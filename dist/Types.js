import { isObject, isNumber } from './external.js';
import Config from './Config.js';
const allTypes = Config['allowedTypes'];
function findType(value) {
    const normalType = typeof value;
    const types = { normal: undefined, other: [] };
    if (!['string', 'number', 'object'].includes(normalType))
        return normalType;
    switch (normalType) {
        case 'string':
            if (value.length <= 1) {
                types['normal'] = 'char';
                types['other'].push('string');
            }
            else
                types['normal'] = 'string';
            isNumber(value) ? types['other'].push('number') : 0;
            break;
        case 'number':
            types['normal'] = 'int';
            types['other'].push('number');
            break;
        case 'object':
            types['normal'] = isObject(value) ? 'object' : 'array';
    }
    return types;
}
function isTypeExpected(type, types) {
    const allTypes = Object.values(type).flat();
    return !allTypes.every(e => types.includes(e) ? false : true);
}
export { allTypes, findType, isTypeExpected };
//# sourceMappingURL=Types.js.map