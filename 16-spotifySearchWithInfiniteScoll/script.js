(function() {
    var resultsContainer = $(".results-container");
    var more = $("#more");
    var go = $("#go");
    var inp = $("#inp").val();
    var sel = $("#sel").val();
    var data;
    var nextUrl;
    var resultsFound = "";
    var hasNext = false;
    var windowHeight = $(window).height();


    $('#more').on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function () {
            ajaxNext();
        },1000);

    });

    go.on("click", function(e) {
        nextUrl = undefined;
        resultsContainer.html("");
        ajaxNext();
    });

    function ajaxNext() {
        $.ajax({
            url: nextUrl || "https://elegant-croissant.glitch.me/spotify",
            data: nextUrl ? undefined : { q : $("#inp").val() , type : $("#sel").val() },
            success: function(data) {
                data = data.artists || data.albums;
                var resultsHtml = "";
                var counter = 0;

                for (var i = 0; i < data.items.length; i++) {
                    if (data.items[i].images.length) {
                        resultsHtml += '<div class ="results"' + ">";
                        resultsHtml +=
                            '<img src ="' + data.items[i].images[0].url + '"/>';
                        resultsHtml += "</div>";
                        resultsHtml += '<div class ="results">';
                        resultsHtml += "<h2>" + data.items[i].name + "</h2>";
                        resultsHtml += "</div>";
                        resultsContainer.append(resultsHtml);
                        resultsHtml="";
                        counter++;
                    }
                }

                if (data.next) {
                    hasNext = true;
                    $(window).on('scroll',function(e){
                    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
                      setTimeout(function functionName() {
                          $('#more').triggerHandler("click");
                          console.log("hi");

                      },1000)
                    }
            });
                    nextUrl = data.next.replace(
                        "api.spotify.com/v1/search",
                        "elegant-croissant.glitch.me/spotify"
                    );
                } else {
                    hasNext = false;
                    nextUrl = undefined;
                }

                if (counter > 0) {
                    if ($(".added")) {
                        $(".added").remove();
                    }
                    resultsFound =
                        '<div class="added"><h3>Results for " ' +
                        $("#inp").val() +
                        '"</h3></div>';
                    $(".header").append(resultsFound);
                    resultsFound = "";
                } else {
                    if ($(".added")) {
                        $(".added").remove();
                    }
                    resultsContainer.html("");
                    resultsFound =
                        '<div class="added"><h3>No Results Found for " ' +
                        $("#inp").val() +
                        '"</h3></div>';
                    $(".header").append(resultsFound);
                    resultsFound = "";
                }
            }
        });
    }

        function checkScroll() {

            setTimeout(function() {
                if (hasReachedBottom) {

                }else {
                    checkScroll();
                }},1000);
        }

        function parseQueryString() {
            var qs = location.search.slice(1);
            var nvps = qs.split('&');
            var parsed = {};

            nvps.forEach(function nvp() {
                nvp = nvp.split('=');
                parsed[nvp[0]] = nvp[1];
            });
            return parsed;
        }


})();
