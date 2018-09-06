// Write a function that takes an array as a parameter and returns a new array containing all of the items
// that are in the array that was passed in but in reverse order.
// Unlike the reverse method that all arrays have, this function should leave the original array unchanged.

function reverseArray(arr) {
    if (Array.isArray(arr)) {
        var clone = arr.slice();
        return clone.reverse();
    } else {
        return console.log("Not an Array");
    }
}
