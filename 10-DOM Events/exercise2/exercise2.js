// Make a page that has a <textarea> element on it. As the user types visible characters into this field,
// the characters should be replaced with the characters in the corresponding position in the Gettysburg Address.
// (Note - you can get and set the text in a <textarea> through its value property.)

(function() {
    var textarea1 = document.getElementById("text-area1");
    var textarea2 = document.getElementById("text-area2");
    var str2 = textarea2.value;

    textarea1.addEventListener("keydown", function() {
        var str1 = textarea1.value;
        textarea1.value = str2.substring(0, str1.length);
    });
})();
