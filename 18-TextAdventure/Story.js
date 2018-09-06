var story = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn? (left or right)?",
            answers: {
                left: {
                    q: "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        "2": "congratulations!"
                    }
                },
                right: "This was not the right choice. Goodbye!"
            }
        },
        no: "Alright then. Enjoy your day!"
    }
};

var readline = require('readline');
var chalk = require('chalk');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var userName = require("os").userInfo().username;
console.log("Good day to you "+userName);
var colors=["black","red","green","yellow","blue","magenta","cyan","white","gray","grey"]
console.log("Please pick up one of those colors starting from 0 to "+colors.length);

for (var i = 0; i < colors.length; i++) {
    console.log( i + " = " + colors[i])
}

rl.question("Your color is ", function(col) {
    if (!isNaN(col) && col>=0 && col<colors.length && col ==='undefined' ){
        game(story,colors[col]);
    }else{
        game(story , colors[7]);
    }
});

function game(story, col) {

    rl.question(chalk.keyword(col)(story.q), function(answer) {
        if (!story.answers[answer]) {
            console.log("Are you kidding me " + userName + " ! :(");
            rl.close();
        }else if(story.answers[answer] === 'Alright then. Enjoy your day!'){
            console.log(story.answers[answer]);
            rl.close();
        }else {
            if (typeof story.answers[answer] !== 'object'){
                console.log(story.answers[answer] +" " + userName);
                rl.close();
            }else {
                game(story.answers[answer],col);
            }
        }
    });
}
