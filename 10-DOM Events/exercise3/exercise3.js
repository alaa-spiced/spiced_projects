// Make a page that has on it an element that is 100px by 100px in size and has a solid black border.
// When the user mouses down on this box, its background should change to a randomly selected color.
// When the user mouses up on it, its background should change to another randomly selected color.

(function() {
    var element = document.getElementById("my-div");
    element.addEventListener("mousedown", function() {
        element.style.backgroundColor = getRandomColor();
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
