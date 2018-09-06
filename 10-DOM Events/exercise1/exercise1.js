// Make a page that has on it an element that is 100px by 100px in size, has absolute positioning,
// and has a solid background color. Add an event handler that makes this box center itself directly
// under the user's mouse pointer as it is moved across the screen.

(function() {
    var element = document.getElementById("element");
    document.addEventListener("mouseover", function(e) {
        var x = e.pageX;
        var y = e.pageY;
        element.style.left = x - 50 + "px";
        element.style.top = y - 50 + "px";
    });
})();
