const changeToWaiting = (waiting) => {
    if (waiting) {
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("chooseOption").style.visibility = "hidden";
        document.getElementById("waitingOpponent").style.visibility = "visible";
    } else {
        document.getElementById("title").style.visibility = "visible";
        document.getElementById("chooseOption").style.visibility = "visible";
        document.getElementById("waitingOpponent").style.visibility = "hidden";
    }
}

const change = (waiting) => {
    changeToWaiting(waiting);

    setTimeout(() => {
        changeToWaiting(!waiting);
    }, 1000);
}

var options = {
    "rock": {
        "rock": 0,
        "paper": -1,
        "scissors": 1
    },
    "paper": {
        "rock": 1,
        "paper": 0,
        "scissors": -1
    },
    "scissors": {
        "rock": -1,
        "paper": 1,
        "scissors": 0
    }
};

const play = (option1, option2) => {
    return options[option1][option2];
}

var win = 0;

var counter = [
    document.getElementById("counter0"),
    document.getElementById("counter1"),
    document.getElementById("counter2"),
    document.getElementById("counter3"),
    document.getElementById("counter4"),
    document.getElementById("counter5")
];

const reset = () => {
    option1 = "rock";
    option2 = "rock";
    turn = 1;
    win = 0;

    for (let i = 0; i < counter.length / 2; i++) {
        counter[i].className = addBlue();
    }

    for (let i = counter.length / 2; i < counter.length; i++) {
        counter[i].className = addOrange();
    }
}

const addBlue = () => {
    return "col-sm-4 p-3 fw-bolder fs-3 bg-primary";
}

const addOrange = () => {
    return "col-sm-4 p-3 fw-bolder fs-3 bg-warning";
}

const printWin = (win) => {
    let color = win ? "bg-success" : "bg-danger";
    document.getElementById("body").className = color;

    setTimeout(() => {
        document.getElementById("body").className = "bg-dark";
    }, 500);
}

const addWin = () => {
    win++;
    let index = win + 2;
    counter[index].className = addBlue();
    printWin(true);

    if (win > 2) {
        setTimeout(() => {
            reset();
            alert("You win!");
        }, 1000);
    }
}

const subWin = () => {
    win--;
    let index = win + 3;
    counter[index].className = addOrange();
    printWin(false);

    if (win < -2) {
        setTimeout(() => {
            reset();
            alert("You lose!");
        }, 1000);
    }
}

var opts = ["rock", "paper", "scissors"];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var option1 = "rock";
var option2 = "rock";
var turn = 1;

const playOption = (option) => {
    change(true);

    // 2 players
    if (turn == 1) {
        option1 = option;
        turn = 2;
    } else if (turn == 2) {
        option2 = option;
        turn = 1;

        change(true);

        var result = play(option1, option2);

        if (result == 1) {
            addWin();
        } else if (result == -1) {
            subWin();
        }
    }

    // 1 player
    /*option1 = option;
    option2 = opts[getRandomInt(0, 2)];

    var result = play(option1, option2);

    if (result == 1) {
        addWin();
    } else if (result == -1) {
        subWin();
    }*/

    // 0 players
    /*
    do {
        playBots();
    } while (win < 3 && win > -3);
    */
}

const playBots = () => {
    option1 = opts[getRandomInt(0, 2)];
    option2 = opts[getRandomInt(0, 2)];

    change(true);

    var result = play(option1, option2);

    if (result == 1) {
        addWin();
    } else if (result == -1) {
        subWin();
    }
}