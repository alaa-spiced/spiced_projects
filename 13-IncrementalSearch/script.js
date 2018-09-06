(function() {
    var resultsHtml = "";
    var resultscontainer = $("#results");
    var inp = $("input");

    inp.on("input", function(e) {
        var val = inp.val();

        if (val.length == 0) {
            resultscontainer.html(resultsHtml);
            return;
        }

        $.ajax({
            url: "https://flame-egg.glitch.me/",
            data: {
                q: val
            },
            error: function(xhr) {
                if (xhr && xhr.readyState != 4) {
                    //4 =DONE
                    console.log(xhr);
                    xhr.abort();
                }
            },
            success: function(matches) {
                resultscontainer.html(resultsHtml);
                for (var i = 0; i < matches.length; i++) {
                    resultscontainer.append('<div class="result">' + matches[i] + "</div>");
                }

                if (matches.length == 0) {
                    resultscontainer.html(resultsHtml);
                    resultscontainer.append('<div class="result">no results found</div>');
                }

                $(document).on("mouseover", ".result", function(e) {
                    $(".highlight").removeClass("highlight");
                    $(e.target).addClass("highlight");
                });

                $(document).on("mousedown", ".result", function(e) {
                    $(".highlight").removeClass("highlight");
                    inp.val(e.target.outerText);
                    resultscontainer.html(resultsHtml);
                });

                // handling keydown events
                inp.on("keydown", function(e) {
                    var highlightedIndex;
                    if (e.keyCode == 40) {
                        //arrowDown Key
                        if (resultscontainer.find(".highlight").length) {
                            if ( $(".highlight").index() == $(".result").length - 1) {
                                return;
                            } else {
                                highlightedIndex = $(".highlight").index();
                                $(".result").removeClass("highlight");
                                $(".result").eq(highlightedIndex + 1).addClass("highlight");
                            }
                        } else {
                            resultscontainer.children(":first").addClass("highlight");
                        }
                    } else if (e.keyCode == 38) {
                        // arrowUp Key
                        if (resultscontainer.find(".highlight").length) {
                            if ($(".highlight").index() == 0) {
                                return;
                            } else {
                                highlightedIndex = $(".highlight").index();
                                $(".result").removeClass("highlight");
                                $(".result").eq(highlightedIndex - 1).addClass("highlight");
                            }
                        } else {
                            resultscontainer.children(":last").addClass("highlight");
                        }
                    } else if (e.keyCode == 13) {
                        // Enter Key
                        if (resultscontainer.find(".highlight").length) {
                            inp.val(resultscontainer.find(".highlight").text());
                            resultscontainer.html(resultsHtml);
                        } else {
                            return;
                        }
                    }
                });

                //handling bluring event on the inputField
                inp.blur(function(){
                    resultscontainer.html(resultsHtml);

                });

                //handling focus event on the inputField
                inp.focus(function(){
                    $("input").val(inp.val()).trigger("input");
                });
            }
        });
    });
})();
