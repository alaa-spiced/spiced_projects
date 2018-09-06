//for diagonal check I hard coded the arrays of possible win as follows
// [0,7,14,21,28,35],[1,8,15,22,29],[2,9,16,23],[6,13,20,27,34,41],[12,19,26,33,40],[18,25,32,39]=>i+=7
// [5,10,15,20,25,30],[4,9,14,19,24],[3,8,13,18],[11,16,21,26,31,36],[17,22,27,32,37],[23,28,33,38]=>i+=5
// Since I have to use each one for each player, I got 12*2 = 24 for loops

(function() {
    var curPlayer = "player1";
    var piece1 = $('.piece1');
    var piece2 = $('.piece2');
    var columns = $('.column');
    piece1.on('dragend', function(e) {
        var x = e.pageX;

        for (var i = 0; i < columns.length; i++) {
            if (x >= columns.eq(i).offset().left  &&
                x <= (columns.eq(i).offset().left + columns.eq(i).width())){
                    goAhead(columns.eq(i));

                }

        }

    });

    piece2.on('dragend', function(e) {
        var x = e.pageX;

        for (var i = 0; i < columns.length; i++) {
            if (x >= columns.eq(i).offset().left  &&
                x <= (columns.eq(i).offset().left + columns.eq(i).width())){
                    goAhead(columns.eq(i));
                }

        }

    });


    function goAhead(targetColumn) {

        var slotsInColumn = targetColumn.find(".slot");
        for (var i = slotsInColumn.length - 1; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                break;
            }
        }
        slotsInColumn.eq(i).addClass(curPlayer);
        checkHorizontal(i);
        checkVertical(slotsInColumn);
        checkDiagonal();
        switchPlayers();

        function checkHorizontal(rowIndex) {
            var p1 = 0;
            var p2 = 0;
            for (var i = 0; i <= 6; i++) {
                if ( $(".row" + rowIndex).eq(i).hasClass("player1") &&
                    $(".row" + rowIndex).eq(i + 1).hasClass("player1")) {
                    p1++;
                    p2 = 0;
                }else if ( $(".row" + rowIndex).eq(i).hasClass("player2") &&
                        $(".row" + rowIndex).eq(i + 1).hasClass("player2")){
                            p2++;
                            p1 = 0;
                        }
                    if (p1 == 3 || p2 ==3) {
                        if (i ==2) {
                            for (var x = 0; x <= i+1 ; x++) {
                                $(".row" + rowIndex).eq(x).addClass("winner");
                            }
                        }else if (i == 3){
                            for (var y = 1; y <= i+1 ; y++) {
                                $(".row" + rowIndex).eq(y).addClass("winner");
                            }
                        }else if (i == 4) {
                            for (var z = 2; z <= i+1 ; z++) {
                                $(".row" + rowIndex).eq(z).addClass("winner");
                            }
                        }else if(i == 5){
                            for (var q = 3; q <= i+1 ; q++) {
                                $(".row" + rowIndex).eq(q).addClass("winner");
                            }
                        }
                        setTimeout(function() {
                            if (p1 == 3){
                                console.log("1");
                            if(alert('Player One has won!\n Please press OK to restart the game')){}
                                else window.location.reload();
                        }else if (p2 == 3){
                            console.log("2");
                            if(alert('Player Two has won!\n Please press OK to restart the game')){}
                                else window.location.reload();
                        }
                    },1000);
                    break;
                }

            }
        }

        function checkVertical(slotsInCol) {
                var p1 = 0;
                var p2 = 0;
                for (var i = 0; i <= 5; i++) {
                    if ( slotsInCol.eq(i).hasClass("player1") &&
                        slotsInCol.eq(i + 1).hasClass("player1") ) {
                        p1++;
                        if (p1 == 3) {
                            if (i ==2) {
                                for (var x = 0; x <= i+1 ; x++) {
                                    slotsInCol.eq(x).addClass("winner");
                                }
                            }else if (i == 3){
                                for (var y = 1; y <= i+1 ; y++) {
                                    slotsInCol.eq(y).addClass("winner");
                                }
                            }else if (i == 4) {
                                for (var z = 2; z <= i+1 ; z++) {
                                    slotsInCol.eq(z).addClass("winner");
                                }
                            }
                            setTimeout(function() {
                                if(alert('Player One has won!\n Please press OK to restart the game')){}
                                    else window.location.reload();
                            },1000);
                    }
                } else {
                        p1 = 0;
                    }
                }

                for (var j = 0; j <= 5; j++) {
                    if ( slotsInCol.eq(j).hasClass("player2") &&
                        slotsInCol.eq(j + 1).hasClass("player2") ) {
                        p2++;
                        if (p2 == 3) {
                            if (j ==2) {
                                for (var x = 0; x <= j+1 ; x++) {
                                    slotsInCol.eq(x).addClass("winner");
                                }
                            }else if (j == 3){
                                for (var y = 1; y <= j+1 ; y++) {
                                    slotsInCol.eq(y).addClass("winner");
                                }
                            }else if (j == 4) {
                                for (var z = 2; z <= j+1 ; z++) {
                                    slotsInCol.eq(z).addClass("winner");
                                }
                            }
                            setTimeout(function() {
                                if(alert('Player Two has won!\n Please press OK to restart the game')){}
                                    else window.location.reload();
                            },1000);
                    }
                } else {
                        p2 = 0;
                    }
                }

}

    function checkDiagonal() {
        var p1 = 0;
        var p2 = 0;
        var i;
        var slots = $('.slot');

        for (i = 0; i <= 35; i+=7) {
            if ( slots.eq(i).hasClass("player1") &&
                slots.eq(i + 7).hasClass("player1") ) {
                    p1++;
                    if (p1 == 3) {
                if (i ==14) {
                    for (var x = 0; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 21){
                    for (var y = 7; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 28) {
                    for (var z = 14; z <= i+7 ; z+=7) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 0; i <= 35; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==14) {
                    for (var x = 0; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 21){
                    for (var y = 7; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 28) {
                    for (var z = 14; z <= i+7 ; z+=7) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 1; i <= 29; i+=7) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 7).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==15) {
                    for (var x = 1; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 22){
                    for (var y = 8; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 1; i <= 29; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==15) {
                    for (var x = 1; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 22){
                    for (var y = 8; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 2; i <= 23; i+=7) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 7).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==16) {
                    for (var x = 2; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 2; i <= 23; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==16) {
                    for (var x = 2; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 6; i <= 41; i+=7) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 7).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==20) {
                    for (var x = 6; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 27){
                    for (var y = 13; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 34) {
                    for (var z = 20; z <= i+7 ; z+=7) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 6; i <= 41; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==20) {
                    for (var x = 6; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 27){
                    for (var y = 13; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 34) {
                    for (var z = 20; z <= i+7 ; z+=7) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 12; i <= 40; i+=7) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 7).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==26) {
                    for (var x = 12; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 33){
                    for (var y = 19; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 12; i <= 40; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==26) {
                    for (var x = 12; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 33){
                    for (var y = 19; y <= i+7 ; y+=7) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 18; i <= 39; i+=7) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 7).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==32) {
                    for (var x = 18; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 18; i <= 39; i+=7) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 7).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==32) {
                    for (var x = 18; x <= i+7 ; x+=7) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }




    for (i = 5; i <= 30; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==15) {
                    for (var x = 5; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 20){
                    for (var y = 10; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 25) {
                    for (var z = 15; z <= i+5 ; z+=5) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 5; i <= 30; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==15) {
                    for (var x = 5; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 20){
                    for (var y = 10; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 25) {
                    for (var z = 15; z <= i+5 ; z+=5) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }

    for (i = 4; i <= 24; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==14) {
                    for (var x = 4; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 19){
                    for (var y = 9; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 4; i <= 24; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==14) {
                    for (var x = 4; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 19){
                    for (var y = 9; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 3; i <= 18; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==13) {
                    for (var x = 3; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 3; i <= 18; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==13) {
                    for (var x = 3; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }


    for (i = 11; i <= 36; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==21) {
                    for (var x = 11; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 26){
                    for (var y = 16; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 31) {
                    for (var z = 21; z <= i+5 ; z+=5) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 11; i <= 36; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==21) {
                    for (var x = 11; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 26){
                    for (var y = 16; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }else if (i == 31) {
                    for (var z = 21; z <= i+5 ; z+=5) {
                        slots.eq(z).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }

    for (i = 17; i <= 37; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==27) {
                    for (var x = 17; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 32){
                    for (var y = 22; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 17; i <= 37; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==27) {
                    for (var x = 17; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }else if (i == 32){
                    for (var y = 22; y <= i+5 ; y+=5) {
                        slots.eq(y).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }

    for (i = 23; i <= 38; i+=5) {
        if ( slots.eq(i).hasClass("player1") &&
            slots.eq(i + 5).hasClass("player1") ) {
            p1++;
            if (p1 == 3) {
                if (i ==33) {
                    for (var x = 23; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player One has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p1 = 0;
        }
    }

    for (i = 23; i <= 38; i+=5) {
        if ( slots.eq(i).hasClass("player2") &&
            slots.eq(i + 5).hasClass("player2") ) {
            p2++;
            if (p2 == 3) {
                if (i ==33) {
                    for (var x = 23; x <= i+5 ; x+=5) {
                        slots.eq(x).addClass("winner");
                    }
                }
                setTimeout(function() {
                    if(alert('Player Two has won!\n Please press OK to restart the game')){}
                        else window.location.reload();
                },1000);
        }
    } else {
            p2 = 0;
        }
    }

}
    function switchPlayers() {
            if (curPlayer == "player1") {
                piece1.css({ "display": "none"});
                piece2.css({ "display": "block"});
                curPlayer = "player2";

            } else {
                piece2.css({ "display": "none"});
                piece1.css({ "display": "block"});
                curPlayer = "player1";
            }
        }
    }
})();
