# Data Types

As of this writing there are seven data types in the Javascript language:

1. Undefined
2. `null`
3. Boolean - `true` and `false`
4. Number - 90210, 3.1, -55
5. String - "Why, hello there!"
6. Symbol - this is new in ES 2015 and we will leave it out of consideration for now
7. Object

The first six types in the list above are called _primitive_ data types.

## The `typeof` operator

The `typeof` operator can be used to check the type of a value.

```js
typeof 'test'; //'string'

typeof 99; //'number'

typeof function(){}; //'function'

typeof {}; //'object'

typeof [1,2,3]; //'object'
```

Since `typeof` returns 'object' for arrays, how can you determine if you have an array on your hands? In most situations the `isArray` method attached to the `Array` constructor will work for you.

```js
Array.isArray([1,2,3]); //true
Array.isArray('pizza'); //false
```

`typeof null` returns 'object', which is widely considered to be a bug. To test whether something is `null` you can use `===`:

```js
var n = null;
n === null; //true;
```

Another strange case is `NaN`, which means "not a number." This value is produced when you do something mathematically nonsensical like multiplying a string by an object.

```js
typeof NaN; //number
```

Wow. Also strange is that `NaN` doesn't equal anything.

```js
NaN == NaN; //false
NaN === NaN; //false
```

So how can you tell if you have `NaN` on your hands? There is a function called `isNaN` for this specific purpose.

```js
isNaN(NaN); //true
```

In addition to the global `isNaN`, there is also a version attached to the `Number` constructor but it behaves slightly differently. If the argument passed to the global `isNaN` is not of the type number, it will convert it to a number and return `true` if the result of that conversion is `NaN` and false otherwise. `Number.isNaN` will not convert its argument and will return `false` if the type of argument passed to it is not number whether or not it can be converted to a number. 

```js
isNaN(NaN); //true
Number.isNaN(NaN); //true

isNaN("1"); //false
Number.isNaN("1"); //false

isNaN("not a number!"); //true
Number.isNaN("not a number!"); //false
```

## Constructors

As with objects and arrays, Javascript provides constructors for strings, numbers, and booleans. When these functions are used as constructors (i.e., when they are used with the `new` keyword), they return primitive values _wrapped_ in an object.

```js
typeof new String("test"); //'object'
typeof new Number(55); //'object'
```

When used without the `new` keyword, these functions can be used to _cast_ strings to numbers, numbers to strings, booleans to numbers, etc.

```js
String(666); //'666'
Number('100'); //100
Number('pizza'); //NaN
Number(true); //1
Boolean(0); //false
```

## Truthiness and Falsiness
Only booleans can be `true` or `false` but every value in Javascript is either truthy or falsey. A truthy value will be treated as `true` in conditional contexts and falsey values will be treated as `false`.

* `null` and `undefined` are both falsey.
* 0 and `NaN` are both falsey. All other numbers (including negative numbers) are truthy.
* "" (a string with no length) is falsey. All other strings are truthy.
* All objects, arrays, and functions are truthy.

```js
if (0) {
    // we will never get here
}

if (-1) { 
    // we will get here
}

if ('') {
    // we will never get here
}

if ('tuna') {
    // we will get here
}

if ([]) {
    // we will get here
}



# Control Flow

## Operators

### Logical Operators
`!` (logical NOT) - returns `true` for `false` or falsey values and returns `false` for `true` or truthy values. You can double up in order to cast a truthy value to `true` or a falsey value to `false`.

```js
var a = !null; //a is true
var b = !100; //b is false

var c = !!null; //c is false
var d = !!100; //d is true
```

`&&` (logical AND) - the item on the right side is only evaluated if the item on the left side is `true` or truthy.

```js
var a = true && 100; //a is 100
var b = false && 100; //b is false
```

`||` (logical OR) - the item on the right side is only evaluated if the item on the left side is `false` or falsey.

```js
var a = true || 100; //a is true
var b = false || 100; //b is 100
```

You should be aware that many Javascript coders like to use `&&` and `||` in a sort of shorthand conditional.

```js
a && doSomething(); //only calls doSomething if a is true or truthy
  
a || doSomethingElse(); //only calls doSomethingElse if a is false or falsey
```

### Comparison Operators

`==` (equality) and `!=` (inequality) - if the items on either side are not of the same type, automatic type conversion (_coercion_) is performed before comparison. Many find these automatic type conversions difficult to understand (or do not bother to understand them) and forbid the use of these operators on their projects.

```js
1 == 1; //true
1 == '1'; //true
1 == true; //true
```

`===` (strict equality) and `!==` (strict inequality) - no coercion takes place.

```js
1 === 1; //true
1 === '1'; //false
1 === true; //false
```

`<=` (less than or equal) and `>=` (greater than or equal) work like `<` (less than) and `>` (greater than) but will also return `true` if the item on the left is equal to the item on the right.

```js
4 < 5; //true
4 <= 5; //true

5 > 5; //false
5 >= 5; //true
```

### Conditional Operator

This is also called the ternary operator because it has three parts.

```js
condition ? item1 : item2;
```

If the item to the left of the `?` is `true` or truthy, the item immediately to the right of the `?` is evaluated. If the item to the left of the `?` is `false` or falsey, the item to the right of the `:` is evaluated.

```js
var a = null ? 100 : 'nice'; //a is 'nice'
var b = 100 ? null : 'nice'; // b is null
```

## Conditionals

### `if/else`

```js
if (someCondition) {
    doSomething();
} else {
    doSomethingElse();
}
```

Stuff that appears between curly braces (`{` and `}`) are called a _block_. In the example above there is an `if` block and an `else` block. 

If an `if` block or an `else` block contain only one line it is possible to omit the curly braces. However, it is recommended that you never do this as it can easily result in errors when the code is modified. An exception to this recommendation arises when you wish to _nest_ an `if` block in an `else` block.

```js
if (someCondition) {
    doSomething();
} else if (someOtherCondition) {
    doSomeOtherThing();
} else if (yetAnotherCondition) {
    doYetAnotherThing();
} else {
    doSomethingElse();
}
```

### `switch`

```js
switch (name) {
    case 'Esmerelda':
        doSomething();
        break;
    case 'Alejandro':
        doSomethingElse();
        break;
    default:
        doAnotherThingEntirely();
}
```

## Loops

It is of critical importance that you make sure any loop you create exits in a reasonable amount of time.

### `while`

```js
var i = 0;
while (i < 5) {
    doSomething();
    i++;
}
```

### `do...while`

`do...while` works like `while` but it guarantees that the code contained in the `do` block runs at least once.

```js
var i = 0;
do {
    doSomething();
} while (i > 0);
```

### `for`

```js
for (var i = 0; i < 5; i++) {
    doSomething();
}
```

### `for...in`

`for...in` is used for iterating over the property names of an object.

```js
var obj = {
    a: 1,
    b: 2,
    c: 3
};

for (var p in obj) {
    console.log('The value of obj.' + p + ' is ' + obj[p]);
}
```

### `for...of`

`for...of` is new in ES 6 (so it will not be available in all environments) and is used for iterating over objects that qualify as _iterable_. Arrays are iterable.

```js
var a = [1, 2, 3];
for (var val of a) {
    console.log(val); //logs 1, 2, 3
}
```

# Exercises

1. Write a function named `logType` that expects a single argument and logs a different string depending on the type/value of the argument that is passed to it. The string it logs should be one of the following:

  * "undefined!"
  * "null!"
  * "number!"
  * "not a number!"
  * "string!"
  * "boolean!"
  * "function!"
  * "object!"
  * "array!"
  * "I have no idea!"


  
2. Copy the following object into your code:
  ```js
  var a = {
      Berlin: 'Germany',
      Paris: 'France',
      'New York': 'USA'
  };
  ```
  Then create a new empty object `b` and use a `for..in` loop to iterate over all of `a`'s properties. Give `b` properties whose names are the values from `a` and whose values are the property names from `a`. The result should be an object that looks like this:
    
  ```js
  {
      Germany: 'Berlin',
      France: 'Paris',
      USA: 'New York' 
  }
  ```
  
3. Write a `while` or `for` loop that counts down from 10 to 1, logging each number to the console.