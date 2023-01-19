# Choice
Choice is a library that aims to simplify development and improve the user experience by providing a variety of useful features.

## Features

-   For developers:
    -   Specify the type of input required from users
    -   Require specific values
    -   Accept certain values
    -   Set default values
    -   Provide shortcuts for users
-   For users:
    -   Easily provide values using various methods:
        -   Pass arguments normally
        -   Use object destructuring
        -   Use key shortcuts
        -   Use value shortcuts (NOT YET AVAILABLE)
## Why
When you have a function that takes a lot of parameters, has default values, and requires some parameters to be of a specific type, it can become cumbersome to write all the necessary checks for them.

For example, consider the following function:
### 
```javascript
function performAction(param1, param2, param3, param4, param5, param6 = 'default value') {
  if (!param5) return new Error('param5 is a required parameter');
  if (typeof param1 !== 'string' || typeof param2 !== 'number') {
    return new Error('param1 must be a string and param2 must be a number');
  }
  if (!param3 || !param4) {
    return new Error('param3 and param4 are required parameters');
  }
  // Do something with the parameters here
  return 'Action performed successfully';
}

```
Using this function can be a bit cumbersome for the user. They need to provide the values in a specific order, and they must wrap the function call in a try-catch block to handle any errors.
```js
try {
  const result = performAction('hello', 42, true, [1, 2, 3], 'required value');
  console.log(result);
  // Output: "Action performed successfully"
} catch (error) {
  console.error(error);
}

```
One way to make this function more user-friendly is to use object destructuring. This allows the user to specify the values they want to pass to the function in an object, rather than as separate arguments.
```js
function performAction({param1, param2, param3, param4, param5, param6 = 'default value'} = {}) {
  if (!param5) return new Error('param5 is a required parameter');
  if (typeof param1 !== 'string' || typeof param2 !== 'number') {
    return new Error('param1 must be a string and param2 must be a number');
  }
  if (!param3 || !param4) {
    return new Error('param3 and param4 are required parameters');
  }
  // Do something with the parameters here
  return 'Action performed successfully';
}
```
This approach solves the issue of having to provide values in a specific order and allows the user to specify only the values they want to pass to the function. However, it can still be a bit cumbersome if the function only has one required parameter, as the user still needs to provide an object with that one value.
```js
function doSomething({param1, param2, param3, param4} = {}) {
  if (!param1) {
    return new Error('param1 is a required parameter');
  }
  // Do something with the parameters here
  return 'Action performed successfully';
}

```
In this case, the user needs to provide an object with at least one property in order to pass the required parameter to the function.
```js
doSomething({param1: "Hello World"});
```
This can be a bit inconvenient. Choice aims to solve this problem by allowing the user to provide values in a more flexible and concise way.

For example, rather than having to type out the full parameter names, the user can use key shortcuts to specify the values they want to pass to the function.
```js
doSomething({p1: "Hello World"});
```
Additionally, if the user wants to provide the same value for multiple parameters, they can do so using a shorthand syntax.
```js
doSomething({'p1-p3': "Hello World"});
```
Alternatively, the user can specify the values they want to pass to the function using their positions rather than their names.
```js
doSomething({"0-2":"Hello World"});
```
Awesome!

So , this library helps to solve all of this problems...and more! 🤫
It is comfortable to use both for users and developers.

# Usage:
## For developers:
to start , import and initialize class
```js
import Choice from 'choice'

const choice = new Choice();
```
you can or set parameters later using `set` method:
```js
choice.set(<params go here>);
```
or in the constructor

```js
import Choice from 'choice'

const choice = new Choice(<params go here>);
```
### Parameters
- `values` | `v` | `value`
Takes object, where values will be default values.
**Usage**:
	- **example**: 
		```js
		{values:{key1:"Hello",key2:"World"}}
		```
	- **Special Keys**:
		- `#keys`: shortcut for defining keys as an array
			example: 
			```js
			values:{#keys:["key1","key2","key3"]}
			```
			will be the same as:
			```js
			values:{"key1":undefined,"key2":undefined,"key3":undefined}
			```
		- `#value`: shortcut for giving value to all keys:
			example:
			```js
			values:{#keys:["key1","key2","key3"],#value:5}
			```
			will be the same as:
			```js
			values:{"key1":5,"key2":5,"key3":5}
			```
- `variations` | `variation` | `var` | `vars` | `variant` | `variants`
Takes `char`/`string`/`array`/`object`
**Usage**:
	- **example**:
		```js
		//char
		{values:{"Hello":undefined,"World":5}, variations:'h'}
		//variations: [['h']]

		//string
		{values:{"Hello":undefined,"World":5}, variations:"hl"}
		//variations: [['hl']]

		//array
		{values:{"Hello":undefined,"World":5}, variations:["hl","wd"]}
		//variations: [["hl"],["wd"]]
		
		//object with char
		{values:{"Hello":undefined,"World":5}, variations:{"Hello":'h',"World":'w'}}
		//variations: [['h']]
		
		//object with string
		{values:{"Hello":undefined,"World":5}, variations:{"Hello":"hl","World":"wd"}}

		//object with array
		{
			values:{"Hello":undefined,"World":5},
			variations:{"Hello":["hl",'h'],"World":["wd",'w']}
		}
		```
	- **Special Keys**: None

- `require` | `r` | `req` | `required`
Takes `string`/`boolean/array`
	- **default**: `false`
	- ***meaning***:
		`true` - all parameters are required.
		`false` - all parameters are not required
		`+` - required
		`-` - not required
	- **Usage**:
		- Using sequence of `+` and `-` or `boolean`
		if you want to specify which parameters are required and which are not, you can pass it as a string using `+` or `-`.
			Here is an example:
			```js
			{values:{"Hello":undefined,"World":5},require:'+'}
			```
			it means `"Hello"` is required.
			(you do not need to put `-` if its last parameter, for example, you do not need to do this: `+-+----`, do this: `+-+`)
		- Using keys (`array`/`string`)
		You can specify which keys will be required
		Here is an example of `String`:
			```js
			{
				values:{"Hello":undefined,"World":5,"Moon":undefined},
				require:"Hello"
			}
			```
			it means `"Hello"` is required.
			
			Here is an example of `Array`:
			```js
			{
				values:{"Hello":undefined,"World":5,"Moon":undefined},
				require:["Hello","Moon"]
			}
			```
			it means `"Hello"` and `"Moon"` are required.
- `'accept` | `a` | `acceptAble'`: ***Not implemented yet***
- `help` | `h`: ***Not implemented yet***

Now after you setup everything, you can use it inside your functions/methods to check and get parameters:
```js
function yourFunc(...args:any[]){
	const data = choice.make(...args);
	/*will handle parameters and return object.
	The object will look like you set up in "values",
	but with values provided from user. Also data will be updated and saved to choice handler*/

	//do something with the data...
}
```
Also in your documentation in your package, you should write about all the keys and variations , so user can know and use them. Todo that, you can call `help` (***NOT IMPLEMENTED***) method and copy results from it. Also you can provide description for every key. Also it would be good if you implement `help` method in your library that uses this `help` method.
## For users:
First thing user need todo , is to know keys inside "values" and their variations, which you set. Then, they 
