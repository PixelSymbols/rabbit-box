import Config from "./Config.js";
function base(value, devideByWhat = 'or') {
    let output = [''];
    let position = 0;
    value.split('').forEach(symbol => {
        if (Config['symbol'][devideByWhat].includes(symbol)) {
            output.push('');
            position++;
            return;
        }
        output[position] += symbol;
    });
    return output;
}
function or(value) {
    return base(value, 'or');
}
function devide(value) {
    return base(value, 'devide');
}
export default { or, devide };
//# sourceMappingURL=SymbolFunctions.js.map