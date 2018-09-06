(function() {


$('button').on('click',function (e) {
    e.preventDefault();

    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var usernameToSearch = $('input[name="username-to-search"]').val();

    var baseUrl = "https://api.github.com";
    var reposUrl = "/users/" + usernameToSearch + "/repos";

    $.ajax({
    url: baseUrl+reposUrl,
    headers: {
       Authorization: 'Basic ' + btoa(username + ':' + password)
   },
    success : function (data) {
        console.log(data);
        var reposDiv = $('.repos');
        reposDiv.html(Handlebars.templates.listOfRepos({
            reposResults:data,
        }));
    }
});

});

$(document).on("click", ".full-name", function(e) {
        var fullName = (($(e.target).text()).split(" "))[1];
        console.log(fullName);
        var baseUrl = "https://api.github.com";
        var commitsUrl = "/repos/" + fullName + "/commits";

        $.ajax({
            url: baseUrl + commitsUrl,
            success: function(response) {
                console.log(response.slice(0,10));
                var commitsDiv = $(e.target).find(".repoAndCommits");
                commitsDiv.append(
                    Handlebars.templates.listOfCommits({
                        last10Commits: response.slice(0, 10)
                                            })
                );
            }
        });
    });

























/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DO NOT TOUCH ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// DO NOT TOUCH ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
})();
