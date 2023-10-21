var numPlayers = parseInt(localStorage.getItem("players"));

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

var win = 0;

var counter = [
    document.getElementById("counter0"),
    document.getElementById("counter1"),
    document.getElementById("counter2"),
    document.getElementById("counter3"),
    document.getElementById("counter4"),
    document.getElementById("counter5")
];

var opts = ["rock", "paper", "scissors"];

var option1 = "rock";
var option2 = "rock";
var turn = 1;

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
}

const play = (option1, option2) => {
    return options[option1][option2];
}

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
    }, 1000);
}

const addWin = () => {
    win++;
    let index = win + 2;
    counter[index].className = addBlue();
    printWin(true);
}

const addTie = () => {
    document.getElementById("body").className = "bg-secondary";

    setTimeout(() => {
        document.getElementById("body").className = "bg-dark";
    }, 1000);
}

const subWin = () => {
    win--;
    let index = win + 3;
    counter[index].className = addOrange();
    printWin(false);
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const showOptions = (option1, option2, visibility) => {
    fightDiv = document.getElementById("fightDiv");
    fightDiv.style.visibility = visibility;

    let opt1 = document.getElementById("option1");
    let opt2 = document.getElementById("option2");

    opt1.src = "media/img/" + option1 + ".png";
    opt2.src = "media/img/" + option2 + ".png";

    let notVisible = (visibility == "hidden") ? "visible" : "hidden";
    document.getElementById("title").style.visibility = notVisible;
    document.getElementById("chooseOption").style.visibility = notVisible;
}

const playOnePlayer = (option) => {
    change(true);

    setTimeout(() => {
        change(false);
        
        option1 = option;
        option2 = opts[getRandomInt(0, 2)];
        
        let result = play(option1, option2);
        
        showOptions(option1, option2, "visible");
        
        if (result == 1) {
            addWin();
        } else if (result == 0) {
            addTie();
        } else if (result == -1) {
            subWin();
        }
            
        setTimeout(() => {
            showOptions(option1, option2, "hidden");
        }, 1000);
    }, 1000);
}

const playTwoPlayers = (option) => {
    if (turn == 1) {
        option1 = option;
        turn = 2;
    } else if (turn == 2) {
        option2 = option;
        turn = 1;

        let result = play(option1, option2);

        showOptions(option1, option2, "visible");

        if (result == 1) {
            addWin();
        } else if (result == 0) {
            addTie();
        } else if (result == -1) {
            subWin();
        }

        setTimeout(() => {
            showOptions(option1, option2, "hidden");
        }, 500);
    }
}

const playBots = () => {
    option1 = opts[getRandomInt(0, 2)];
    option2 = opts[getRandomInt(0, 2)];

    let result = play(option1, option2);

    showOptions(option1, option2, "visible");

    if (result == 1) {
        addWin();
    } else if (result == 0) {
        addTie();
    } else if (result == -1) {
        subWin();
    }

    setTimeout(() => {
        showOptions(option1, option2, "hidden");
    }, 1000);
}

if (numPlayers == 0) {
    do {
        playBots();
    } while (win < 3 && win > -3);

    setTimeout(() => {
        if (win > 2) {
            setTimeout(() => {
                reset();
                alert("You win!");
            }, 1000);
        } else if (win < -2) {
            setTimeout(() => {
                reset();
                alert("You lose!");
            }, 1000);
        }
    }, 1000);
}

const playOption = (option) => {
    if (numPlayers == 1) {
        playOnePlayer(option);
    } else if (numPlayers == 2) {
        playTwoPlayers(option);
    }

    // Check if win or lose
    setTimeout(() => {
        if (win > 2) {
            setTimeout(() => {
                reset();
                alert("You win!");
            }, 1000);
        } else if (win < -2) {
            setTimeout(() => {
                reset();
                alert("You lose!");
            }, 1000);
        }
    }, 1000);
}