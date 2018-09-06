// Write a function that expects a string representing a selector to be passed as a parameter.
// The function should find all the elements in the document that match the selector and change their style
// so that the text they contain is italic, underlined, and bold.

function changeSelectorStyle(selector) {
    var selector = document.querySelectorAll(selector);
    for (var i = 0; i < selector.length; i++) {
        selector[i].style.fontStyle = "italic";
        selector[i].style.fontWeight = "bold";
        selector[i].style.textDecoration = "underline";
    }
}
