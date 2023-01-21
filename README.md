# rabbit-box
`rabbit-box` is a library that aims to simplify development and improve the user experience by providing a variety of useful features.

## Features

-   For developers:
    -   Specify the type of input required from users
    -   Accept certain values (NOT IMPLEMENTED)
    -   Set default values
    -   Provide shortcuts for users
-   For users:
    -   Easily provide values using various methods:
        -   Pass arguments normally
        -   Use object destructuring
        -   Use key shortcuts

# Usage:
## For developers:
to start , import and initialize class and set parameters
```js
import RabbitBox from 'rabbit-box'

const rabbit = new RabbitBox(<params go here>);
```
### Parameters
Pass values as strings.
```js
const rabbit = new RabbitBox("pizza","lemon");
```
if you want to add default values, you should pass as an object
```js
const rabbit = new RabbitBox({"pizza":5,"lemon":10});
```
also you can pass them in multiple objects
```js
const rabbit = new RabbitBox({"pizza":5},{"lemon":10});
```
### shortcuts

if you want to add shortcut, provide it inside string and split with `|` or `,`:
```js
const rabbit = new RabbitBox("pizza|p","lemon,l");
const rabbit = new RabbitBox({"pizza|p":5,"lemon,l":10});
```
### types
if you wanna set allowed types, do this:
```js
const rabbit = new RabbitBox("pizza|p:<string|number>","lemon,l:<int>");
const rabbit = new RabbitBox({"pizza|p:<string,number>:":5,"lemon,l:<int>":10});
```
also you can put them first
```js
const rabbit = new RabbitBox("<string|number>:pizza|p");
```
### required
if you want to make specific parameter to be required, so it cannot be `undefined`, you can make it by putting `!` in the beginning
```js
const rabbit = new RabbitBox("!pizza|p:<string|number>")
```

## For users:
First thing user need todo , is to know keys inside "values" and their variations, which you set. Then, they

### how to
imagine you as a developer set this parameters:
```js
const rabbit = new RabbitBox("pizza|p:<string|number>","lemon|l:<int>");
```
### by position
user can provide parameters by a position
```js
const result = rabbit.make(5,10);
```
output:
```json
{pizza:5,lemon:10}
```
### by key or variations
```js
const result = rabbit.make({"p":5,"lemon":10);
```
output:
```json
{pizza:5,lemon:10}
```
### by range
you can specify range. You can make with numbers, or using shortcuts,
```js
const result1 = rabbit.make({"0:1":5);
const result2 = rabbit.make({"p:l":10);
```
```json
result1 will be {pizza:5,lemon:5}
result2 will be {pizza:10,lemon:10}
```
Also you can provide negative numbers, or put first value bigger than second.
Also you can provide no range, or only 1 position 
```js
const result1 = rabbit.make({":":8); //will set 8 to all values
const result2 = rabbit.make({":l":12); //will set 12 to all from 0 to `lemon`
const result3 = rabbit.make({"l:":12); //will set 12 to all from last element to zero
```
### types
there will be an error if types wont match. Also i added few additional types: `array`,`int` and `char`



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
This can be a bit inconvenient. `rabbit-box` aims to solve this problem by allowing the user to provide values in a more flexible and concise way.

For example, rather than having to type out the full parameter names, the user can use key shortcuts to specify the values they want to pass to the function.
```js
doSomething({p1: "Hello World"});
```
Additionally, if the user wants to provide the same value for multiple parameters, they can do so using a shorthand syntax.
```js
doSomething({'p1:p3': "Hello World"});
```
Alternatively, the user can specify the values they want to pass to the function using their positions rather than their names.
```js
doSomething({"0:2":"Hello World"});
```
Awesome!

So , this library helps to solve all of this problems...and more! 🤫
It is comfortable to use both for users and developers.