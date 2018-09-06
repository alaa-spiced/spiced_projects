// Write a function called getLessThanZero that expects an array of numbers to be passed to it and
// returns a new array containing only those numbers from the array that was passed in that are less than zero.
//
//   getLessThanZero([1, 2, -1, -90, 10]); //[-1, -90]
//   getLessThanZero([1, 2]); //[]

function getLessThanZero(arr) {
    if (!Array.isArray(arr)) {
        return console.log("Not an Array");
    }

    var filtered = arr.filter(function(num) {
        return num < 0;
    });

    return filtered;
}
