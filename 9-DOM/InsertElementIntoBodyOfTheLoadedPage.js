// Write a function that inserts an element into the body of the currently loaded page.
// That element should have fixed position, z-index of 2147483647, left of 20px, top of 100px, font-size of 200px, and contain the text 'AWESOME'.
document.body.onload = addElement;

function addElement() {
    var element = document.createElement("div");

    var newContent = document.createTextNode("AWESOME!");
    element.style.position = "fixed";
    element.style.zIndex = 2147483647;
    element.style.left = 20 + "px";
    element.style.top = 100 + "px";
    element.style.fontSize = 200 + "px";

    element.appendChild(newContent);

    // add the newly created element and its content into the DOM
    var currentDiv = document.getElementById("header-1");
    document.body.insertBefore(element, currentDiv);
}
