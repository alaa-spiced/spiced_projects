// Make a page that has on it an element that is 200px by 200px in size and has a solid background color.
// Nest within that element another element that is 50px by 50px in size and has a different solid background color.
// When the user clicks on the outer element its background color should change to a randomly selected color.
// However, if the user clicks on the inner element, the inner element's background color should change to a randomly
// selected background color but the outer element's background color should not change at all.

(function() {
    var outer = document.getElementById("outer-div");
    var inner = document.getElementById("inner-div");

    outer.addEventListener("click", function(e) {
        outer.style.backgroundColor = getRandomColor();
        e.stopPropagation();
    });

    inner.addEventListener("click", function(e) {
        inner.style.backgroundColor = getRandomColor();
        e.stopImmediatePropagation();
    });

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 10)];
        }
        return color;
    }
})();
