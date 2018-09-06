// Write a function that takes any number of numbers as parameters and returns the sum of those numbers.
// sum(5, 10); //15
//
// sum(5, 10, 15); //30;
//
// sum(5, 10, 15, 100, 200); //330

function sum(num1, num2) {
    var total = 0;

    for (var i = 0; i < arguments.length; i++) {
        if (Number.isNaN(arguments[i]))
            return console.log("Please pass numbers only");
    }

    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
