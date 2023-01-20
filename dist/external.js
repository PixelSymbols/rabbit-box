export const isObject = value => typeof value === "object" && !Array.isArray(value) && value !== null;
export function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0); }
//# sourceMappingURL=external.js.map