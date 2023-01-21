import { allTypes } from "./Types.js"
const config = {
	allowedTypes: [
		"undefined",
		"boolean",
		"int",
		"bigint",
		"number",
		"char",
		"function",
		"symbol",
		"string",
		"array",
		"object",
	],
	symbol:{
		devide:':',
		types:'<>',
		or:'|,',
		require:'!'
	}
}
export default config;