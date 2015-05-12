user = {};

$(document).ready(function()  {
    $("#save-container").hide();

    $("#login").click(function(e) {
        var username = $("#username").val();
        if (username != '') {
            $.ajax({
                url: '/users/' + username,
                type: 'GET',
                success: function(response) {
                    if (!response) {
                        $("#message").text("User does not exist!");
                    } else {
                        user = response;
                        $("#login-container").hide();
                        $("#save-container").show();
                        var username = user.username;
                        $("#welcome").text("Welcome " + username + "!");
                        var state = JSON.parse(user.state);
                        game.playerState = state;
                        game.state.start(state.currentState);
                    }
                },
                error: function(jqXHR, textStatus, err) {
                    console.log(jqXHR.responseText);
                }
            });
        } else {
        }
        

    });

    $("#signup").click(function(e) {
        var username = $("#username").val();
        var state = JSON.stringify(game.playerState);
        $.ajax({
            url: '/users/',
            type: 'POST',
            data: {
                username: username,
                state: state
            },
            success: function(response) {
                console.log(response);
            },
            error: function(jqXHR, textStatus, err) {
                $("#message").text("User already exists!");

                console.log(jqXHR.responseText);
            }
        });
    });

    $("#save").click(function(e) {
        var state = JSON.stringify(game.playerState);
        console.log(state);
        $.ajax({
            url: '/users/' + user.username,
            type: 'PUT',
            data: {
                state: state
            },
            success: function(response) {
                console.log(response);
            },
            error: function(jqXHR, textStatus, err) {
                console.log(jqXHR.responseText);
            }
        });
    });
});