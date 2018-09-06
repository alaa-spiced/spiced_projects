# Objects

Objects are collections of properties. Properties have names and values. Property names can be any string. However, if you wish to access a property using dot syntax, the name must begin with an alphabetic character, $, or _, and contain only those same characters and/or digits. Otherwise, you must access the property with square brackets and quotes.

```js
var obj = {
  prop: 1,
  prop2: 2,
  $prop: 3,
  _prop: 4,
  '2*prop*!': 5
};

obj.prop; //1
obj.prop2; //2
obj.$prop; //3
obj._prop; //4
obj['2*prop*!']; //5
```

Property values can be strings, numbers, booleans, `null`, `undefined`, objects, arrays, and functions. That is, properties can contain any value that can possibly exist.

## The `in` operator

When you access a property of an object that does not exist, the value that is returned is `undefined`.

```js
var obj = {};
obj.prop; //undefined
```

Of course, a property can exist and have `undefined` as its value. To test whether a property exists on an object, you can use the `in` operator.

```js
var obj = {
  prop: undefined
};

obj.prop; //undefined
obj.prop2; //undefined

'prop' in obj; //true
'prop2' in obj; //false
```

## The `delete` operator
To remove a property from an object, you can use the `delete` operator. An expression with the `delete` operator will return `true` if the property can be deleted and `false` if it cannot.

```js
var obj = {
  prop: 'whatever'
};

delete obj.prop; //true
```

## Creating objects

Javascript provides multiple ways to create objects. The examples above all use _literal syntax_. It is also possible to create an object using the `Object` constructor but there is no advantage to doing so.

```js
var obj1 = {};
var obj2 = Object();
var obj3 = new Object();

obj1; //{}
obj2; //{}
obj3; //{}
```

Another way to create objects is to use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create">`Object.create`</a> method.

```js
var obj = Object.create(null);

obj; //{}
```

The `Object.create` method accepts two parameters. The first is an object that is to serve as the _prototype_ of the object you are creating (if you do not want your object to have a prototype you can pass `null`). The second parameter is a _property descriptor_ - an object that describes properties of the object you are creating.

What is a prototype? A prototype is an object that another object _inherits_ properties from. When you access a property on an object, if that property is not found, the property is then looked for in the prototype.

```js
var proto = {
  prop: 'whatever'
};

var obj = Object.create(proto);

obj.prop; //'whatever'
```

An object can have properties that have the same name as properties of its prototype. This is called _overriding_.

```js
var proto = {
  prop: 'whatever'
};

var obj = Object.create(proto);
obj.prop = 'not whatever';

obj.prop; //'not whatever'

delete obj.prop;

obj.prop; //'whatever'
```

What is a property descriptor? A property descriptor is an object that describes a property. There are specific attributes that can be used in a property descriptor:

* **value** - the value of the property
* **writable** - a boolean indicating whether the property can be set to a new value. The default is `false`
* **configurable** - a boolean indicating whether the descriptor for the property can be changed and whether the property can be deleted. The default is `false`
* **enumerable** - a boolean indicating whether the property should appear when the object's properties are enumerated (as with a `for...in` loop). The default is `false`.
* **get** - a function to be run when the property is accessed. The value returned from the function is used as the property value
* **set** - a function to be run when the property is set

```js
var obj = Object.create(null, {
  city: {
    value: 'Berlin'
  }
});

delete obj.city; //false (error in strict mode)

obj.city = 'Dallas'; //error in strict mode

obj.city; //'Berlin'

for (var prop in obj) {
  console.log(prop); //'city' is not logged
}
```

Note that these defaults are not used when you create a property by directly setting it on an object.

```js
var obj = {
  city: 'Berlin'
};

obj.country = 'Germany';

delete obj.city; //true

obj.country = 'Canada';

obj.country; //'Canada'

for (var prop in obj) {
  console.log(prop); //'country' is logged
}

```

Other methods that use property descriptors are <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">`Object.defineProperty`</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties">`Object.defineProperties`</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor">`Object.getOwnPropertyDescriptor`</a>.

## Properties inherited from `Object.prototype`

Objects inherit a number of properties that do not show up in `for..in` loops because they are not enumerable. Four particularly important properties that all objects inherit are:

* **constructor** - The function used to construct the object. For objects created using literal syntax the constructor is `Object`.
* **hasOwnProperty** - Returns a boolean indicating whether the specified property exists directly on the object or not.
* **toString** - Returns a string represenation of the object. This method is automatically called when the object is coerced to a string. By default this method returns '[object Object]'.
* **valueOf** - This method is automatically called when an object is coerced to a primitive value. By default this method returns the object itself.


# Arrays

Arrays are objects that can be used to store lists of items. The items may be of any type and each one can be accessed using its _index_ - its position in the array.

```js
var arr = [ 'hello world', 90210, false, Math ];

arr[0]; // 'hello world';
arr[1]; // 90210
```

Arrays have a `length` property that indicates how many items are in the array.

```js
var arr = [ 'hello world', 90210, false, Math ];

arr.length; // 4
```

Arrays can be missing elements. Such arrays are said to be _sparse_.

```js
var arr = [];
arr[2] = 5;

arr.length; // 3
arr[0]; // undefined
arr; // [ , , 5 ]
```

In the examples above, arrays are created using literal syntax. It is also possible to create arrays using the `Array` constructor but there is almost never any reason to do so. The parameters you pass to `Array` become elements of the array that is created unless you only pass one parameter and that parameter is a number. In that case that parameter becomes the length of the array that is created. If the number is not a valid length, an error is thrown.

```js
var arr = new Array(5);

arr.length; // 5

arr = new Array(-5); // error
```

## Array methods

Arrays come with many useful methods. For example, to add elements to the end of an array you can use the `push` method, which returns the new length of the array;

```js
var gettysburgWords = [ 'four', 'score' ];

gettysburgWords.push('and'); // 3

gettysburgWords.push('seven', 'years', 'ago'); // 6
```

To add elements to the beginning of an array, you can use `unshift`.

```js
var gettysburgWords = [ 'score' ];

gettysburgWords.unshift('four'); // 2

gettysburgWords[0]; // 'four'
gettysburgWords[1]; // 'score'
```

The name `unshift` makes more sense when you consider the fact that there is also a `shift` method that removes and returns the first element of the array.

```js
var gettysburgWords = [ 'four', 'score' ];

var firstWord = gettysburgWords.shift();

firstWord; // 'four';

gettysburgWords.length; // 1

gettysburgWords[0]; // 'score'
```

To remove the last item, use `pop`;

```js
var gettysburgWords = [ 'four', 'score' ];

var lastWord = gettysburgWords.pop();

lastWord; // 'score';

gettysburgWords.length; // 1

gettysburgWords[0]; // 'four'
```

Both `shift` and `pop` return `undefined` if the array is empty.

To remove items from anywhere in an array, use the `splice` method. This method takes as its first parameter a number indicating the index at which to start removal. The second parameter is the number of items to remove and if none is specified all of the elements after the index specified by the first parameter will be removed. Any additional parameters passed will be added to the array starting at the index specified by the first parameter. This method returns a new array containing the elements that were removed.

```js
var arr = [0, 1, 2, 3];

var removed = arr.splice(1, 2, 'two items missing');

removed[0]; // 1
removed[1]; // 2

arr[0]; // 0
arr[1]; // 'two items missing'
arr[2]; // 3
```

Do not confuse `splice` with the `slice` method. `slice` takes a start index and an end index as parameters and returns a new array consisting of the specified elements. The array that `slice` is called on remains unchanged. The start and end indexes can be negative numbers to indicate positions from the end of the array. If there is no end index, all of the items from the start index are in the returned array. If no parameters are passed to `slice`, a _clone_ of the array is returned.

```js
var arr = [0, 1, 2, 3];

var sliced = arr.slice(1, 3);

sliced; // [1, 2]

sliced = arr.slice(0, -1);

sliced; // [0, 1, 2];

sliced = arr.slice(3);

sliced; // [3]

sliced = arr.slice();

sliced; // [0, 1, 2, 3];

arr; // [0, 1, 2, 3];

sliced == arr; // false
```

Other extremely useful array methods:
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join">`join`</a> - converts the contents an array into a string with each item separated by the delimitor specified as the first parameter
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">`concat`</a> - returns a new array consisting of the combination of the passed in arrays and/or non-array values
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">`reverse`</a> - reverses the array
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">`sort`</a> - sorts the array. By default, it sorts alphabetically. However, a function can be passed in to specify how the sorting should occur
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">`filter`</a> - returns a new array consisting of only those elements that pass a test contained in the callback that is passed in
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">`map`</a> - returns a new array consisting of elements returned by the callback that is passed in
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some">`some`</a> - returns `true` as soon as a single elements in the arrays passes a test contained in the callback that is passed in. If none pass, `false` is returned
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every">`every`</a> - returns `true` if every item in the array passes the test contained in the callback that is passed in and `false` otherwise
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">`indexOf`</a> - returns the index of an item in an array. If the item appears in the array more than once then only the first index is returned. If the item is not in the array then -1 is returned. Note that `===` is used to test if the specified item is in the array.
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf">`lastIndexOf`</a> - like `indexOf` but returns the index of the last occuring match in the array instead of the first
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">`forEach`</a> - an alternative to a `for` loop

# Exercises

1. Write a function called `each` that accepts either an object or an array as its first parameter and a callback as its second parameter.

    If the first parameter is an object, it should loop over the object's properties and call the callback for each one. The property value should be the first parameter passed to the callback and the property name should be the second.

    If the first parameter is an array, it should loop over the array's elements and call the callback for each one. The array element should be the first parameter passed to the callback and the index should be the second.
    ```js
      each({
        a: 1,
        b: 2
      }, function(val, name) {
        console.log('The value of ' + name + ' is ' + val);
      }); // logs 'the value of a is 1' and 'the value of b is 2'

      each(['a', 'b'], function(val, idx) {
        console.log('The value of item ' + idx + ' is ' + val);
      }); // logs 'the value of item 0 is a' and 'the value of item 1 is b'
    ```
2. Write a function that takes an array as a parameter and returns a new array containing all of the items that are in the array that was passed in but in reverse order. Unlike the `reverse` method that all arrays have, this function should leave the original array unchanged.

3. Write a function called `getLessThanZero` that expects an array of numbers to be passed to it and returns a new array containing only those numbers from the array that was passed in that are less than zero.
    ```js
      getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
      getLessThanZero([1, 2]); //[]
    ```