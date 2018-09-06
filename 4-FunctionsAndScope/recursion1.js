// Write a function that expects a number as a parameter. If the value that is passed in is less than 0, equal to 0, or not a number,
//  the function should return the string 'ERROR'. If the number that is passed in is greater than or equal to 1000000 it should simply return the number.
// Otherwise it should multiply the number by 10 however many times it takes to get a number that is greater than or equal to 1000000 and return that.

function check(num) {
    if (Number.isNaN(num) || num <= 0) {
        return console.log("ERROR!");
    }
    if (num >= 1000000) {
        return num;
    }
    num *= 10;

    return check(num);
}
