// Write a function that expects a string representing a class name to be passed as a parameter.
// The function should return an array containing all the elements in the document that have the class that was passed in.

function classElements(className) {
    var className = document.getElementsByClassName(className);
    var arrOfElements = [];

    for (var i = 0; i < className.length; i++) {
        arrOfElements[i] = className[i];
    }

    return arrOfElements;
}
