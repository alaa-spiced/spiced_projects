(function() {
    var $textArea = $("#validator");
    var $validate = $("#validate");

    $validate.on("click", function(e) {
        var text = $textArea.val();

        try {
            JSON.parse(text);
            console.log("This is a valid JSON");
        } catch (e) {
            console.log("This is not a valid JSON " + e);
        }
    });
})();
