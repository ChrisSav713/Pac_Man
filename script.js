var pacmanInterval;
var ghostInterval;
var pacman;
var ghost1;
var ghost2;
var ghost3;
var ghost4;
var world;

document.addEventListener("keydown", movePacman);
document.addEventListener("click", initialize);
score = document.querySelector("#score-count");

var blockType = {
    0: 'brick',
    1: 'empty',
    2: 'coin',
    3: 'ghost'
};

//initial world printing
function initialize() {
    world = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0],
        [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0],
        [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    pacman = {
        el: document.querySelector("#pacman"),
        row: 13,
        col: 10
    };

    ghost1 = {
        el: document.querySelector("#ghost1"),
        row: 6,
        col: 8
    };

    ghost2 = {
        el: document.querySelector("#ghost2"),
        row: 6,
        col: 12
    };

    ghost3 = {
        el: document.querySelector("#ghost3"),
        row: 8,
        col: 8
    };

    ghost4 = {
        el: document.querySelector("#ghost4"),
        row: 8,
        col: 12
    };

    score.innerHTML = "0";
    startTimer();
    document.querySelector(".world").innerHTML = displayWorld();
    updatePacman();
    updateGhost();
    document.querySelector("#gameover").style.visibility = "hidden";
}


function displayWorld() {
    var output = "";
    for (var row = 0; row < world.length; row++) {
        output += "<div class=\"row\">\n";
        for (var col = 0; col < world[row].length; col++) {
            output += "<div class=\"" + blockType[world[row][col]] + "\"></div>";
        }
        output += "\n</div>";
    }
    //console.log(output);
    return output;
}

function updatePacman() {
    switch (pacman.el.dataset.animation) {
        case "0":
            pacman.el.dataset.animation = 1;
            pacman.el.style.background = "url(\"./assets/pac1.png\"";
            break;
        case "1":
            pacman.el.dataset.animation = 2;
            pacman.el.style.background = "url(\"./assets/pac2.png\"";
            break;
        case "2":
            pacman.el.dataset.animation = 0;
            pacman.el.style.background = "url(\"./assets/pac0.png\"";
            break;
    }
    pacman.el.style.top = (pacman.row * 30) + "px";
    pacman.el.style.left = (pacman.col * 30) + "px";
}

function updateGhost() {
    ghost1.el.style.top = (ghost1.row * 30) + "px";
    ghost1.el.style.left = (ghost1.col * 30) + "px";

    ghost2.el.style.top = (ghost2.row * 30) + "px";
    ghost2.el.style.left = (ghost2.col * 30) + "px";

    ghost3.el.style.top = (ghost3.row * 30) + "px";
    ghost3.el.style.left = (ghost3.col * 30) + "px";

    ghost4.el.style.top = (ghost4.row * 30) + "px";
    ghost4.el.style.left = (ghost4.col * 30) + "px";
}

function startTimer() {
    pacmanInterval = setInterval(pacmanIntervalTick, 150);
    ghostInterval = setInterval(ghostIntervalTick, 1000);
}

function stopTimer() {
    clearInterval(pacmanInterval);
    clearInterval(ghostInterval);
}

function pacmanIntervalTick() {
    document.querySelector(".world").innerHTML = displayWorld();
    updatePacman();
    checkCollision();
    console.log("tick");
}

function ghostIntervalTick() {
    moveGhost(ghost1);
    moveGhost(ghost2);
    moveGhost(ghost3);
    moveGhost(ghost4);
    updateGhost();
}

function checkCollision() {
    if (pacman.row == ghost1.row && pacman.col == ghost1.col) {
        stopTimer();
        document.querySelector("#gameover").style.visibility = "visible";
    }
    if (pacman.row == ghost2.row && pacman.col == ghost2.col) {
        stopTimer();
        document.querySelector("#gameover").style.visibility = "visible";
    }
    if (pacman.row == ghost3.row && pacman.col == ghost3.col) {
        stopTimer();
        document.querySelector("#gameover").style.visibility = "visible";
    }
    if (pacman.row == ghost4.row && pacman.col == ghost4.col) {
        stopTimer();
        document.querySelector("#gameover").style.visibility = "visible";
    }

}

function moveGhost(ghost) {
    let foundMove = false;
    while (foundMove == false) {
        let randomMove = Math.floor(Math.random() * 4);
        console.log(foundMove + " " + randomMove);
        switch (randomMove) {
            case 0: //LEFT
                var newLoc = world[ghost.row][ghost.col - 1];
                if (newLoc != 0) {
                    foundMove = true;
                    ghost.col--;
                }
                break;
            case 1: //RIGHT
                var newLoc = world[ghost.row][ghost.col + 1];
                if (newLoc != 0) {
                    foundMove = true;
                    ghost.col++;
                }
                break;
            case 2: //DOWN
                var newLoc = world[ghost.row + 1][ghost.col];
                if (newLoc != 0) {
                    foundMove = true;
                    ghost.row++;
                }
                break;
            case 3: //UP
                var newLoc = world[ghost.row - 1][ghost.col];
                if (newLoc != 0) {
                    foundMove = true;
                    ghost.row--;
                }
                break;
        }
    }
}

function movePacman(e) {
    console.log(e.keyCode);
    console.log("before: " + pacman.row + ", " + pacman.col);
    switch (e.keyCode) {
        case 37: //LEFT
            var newLoc = world[pacman.row][pacman.col - 1];
            switch (newLoc) {
                case 0: //brick
                    break;
                case 1: //empty
                    pacman.col--;
                    pacman.el.style.transform = "rotate(" + 180 + "deg)";
                    break;
                case 2: //coin
                    pacman.col--;
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    world[pacman.row][pacman.col] = 1;
                    pacman.el.style.transform = "rotate(" + 180 + "deg)";
                    break;
            }
            break;
        case 39: //RIGHT
            var newLoc = world[pacman.row][pacman.col + 1];
            switch (newLoc) {
                case 0: //brick
                    break;
                case 1: //empty
                    pacman.col++;
                    pacman.el.style.transform = "rotate(" + 0 + "deg)";
                    break;
                case 2: //coin
                    pacman.col++;
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    world[pacman.row][pacman.col] = 1;
                    pacman.el.style.transform = "rotate(" + 0 + "deg)";
                    break;
            }
            break;
        case 40: //DOWN
            var newLoc = world[pacman.row + 1][pacman.col];
            switch (newLoc) {
                case 0: //brick
                    break;
                case 1: //empty
                    pacman.row++;
                    pacman.el.style.transform = "rotate(" + 90 + "deg)";
                    break;
                case 2: //coin
                    pacman.row++;
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    world[pacman.row][pacman.col] = 1;
                    pacman.el.style.transform = "rotate(" + 90 + "deg)";
                    break;
            }
            break;
        case 38: //UP
            var newLoc = world[pacman.row - 1][pacman.col];
            switch (newLoc) {
                case 0: //brick
                    break;
                case 1: //empty
                    pacman.row--;
                    pacman.el.style.transform = "rotate(" + 270 + "deg)";
                    break;
                case 2: //coin
                    pacman.row--;
                    score.innerHTML = parseInt(score.innerHTML) + 10;
                    world[pacman.row][pacman.col] = 1;
                    pacman.el.style.transform = "rotate(" + 270 + "deg)";
                    break;
            }
            break;
    }
    // document.querySelector("#errorcheck").value = printToConsole();
}

function printToConsole() {
    let output = "";
    output = "current = " + pacman.row + ", " + pacman.col + " Type : " + world[pacman.row][pacman.col] + "\n";
    for (row = 0; row < world.length; row++) {
        for (col = 0; col < world[row].length; col++) {
            output += world[row][col] + " ";
        }
        output += "\n"
    }
    return output;
}

initialize();