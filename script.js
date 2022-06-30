var pacman = {
    el: document.querySelector("#pacman"),
    row: 13,
    col: 10
};

document.addEventListener("keydown", movePacman);


var blockType = {
    0: 'brick',
    1: 'empty',
    2: 'coin'
};

var world = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0],
    [0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0],
    [0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


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

document.querySelector(".world").innerHTML = displayWorld();

setInterval(function() {
    document.querySelector(".world").innerHTML = displayWorld();
    updatePacman();
    //console.log("tick");
}, 150);

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