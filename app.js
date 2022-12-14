let playerBoard = [];
let enemyBoard = [];
let shipCounter = 0;
let gameOver = false;
let playerTurn = true;
let playerName;

const rows = 10;
const cols = 10;
const playerShips = [
    {
        shipName: "Boat",
        letter: "T",
        hits: 0,
        totalHealth: 2,
        isSunk: false,
        isPlaced: false,
    },
    {
        shipName: "Submarine",
        letter: "S",
        hits: 0,
        totalHealth: 3,
        isSunk: false,
        isPlaced: false,
    },
    {
        shipName: "Destroyer",
        letter: "D",
        hits: 0,
        totalHealth: 3,
        isSunk: false,
        isPlaced: false,
    },
    {
        shipName: "Battleship",
        letter: "B",
        hits: 0,
        totalHealth: 4,
        isSunk: false,
        isPlaced: false,
    },
    {
        shipName: "Aircraft-Carrier",
        letter: "A",
        hits: 0,
        totalHealth: 5,
        isSunk: false,
        isPlaced: false,
    },
]

const enemyShips = [
    {
        shipName: "Boat",
        letter: "T",
        hits: 0,
        totalHealth: 2,
        isSunk: false,
    },
    {
        shipName: "Submarine",
        letter: "S",
        hits: 0,
        totalHealth: 3,
        isSunk: false,
    },
    {
        shipName: "Destroyer",
        letter: "D",
        hits: 0,
        totalHealth: 3,
        isSunk: false,
    },
    {
        shipName: "Battleship",
        letter: "B",
        hits: 0,
        totalHealth: 4,
        isSunk: false,
    },
    {
        shipName: "Aircraft-Carrier",
        letter: "A",
        hits: 0,
        totalHealth: 5,
        isSunk: false,
    },
]

const welcomeSetup = () => {
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("game-title").style.visibility = "hidden";
    document.getElementById("winner-modal").style.visibility = "hidden";
    document.getElementById("enemy-board").style.display = "none";
    document.getElementById("welcome-modal").style.visibility = "visible";
}

const gameStart = () => {
    let userName = document.getElementById("name-input").value;
    if(userName && userName != " ") {
        playerName = userName;
        document.getElementById("sidebar-player-name").textContent = document.getElementById("name-input").value;
        document.getElementById("container").style.visibility = "visible";
        document.getElementById("game-title").style.visibility = "visible";
        document.getElementById("welcome-modal").style.visibility = "hidden";
        document.getElementById("placing-music").play();
    }
}

const generateEngineBoards = (boardToGenerate) => {

    for (let r = 0; r <= rows; r++) {
        let row = [];
        for (let c = 0; c <= cols; c++) {
            row.push(" ");
        }
        boardToGenerate.push(row)
    }
}


const generateVisibleBoards = (player) => {

    let whosBoardWeCreate = player === "player" ? player : "enemy";
    
    for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
            if(r === 0 && c != 0) {
                let columnNumber = document.createElement("div");
                columnNumber.textContent = c;
                columnNumber.classList.add("grid-header")
                document.getElementById(player + "-board").append(columnNumber);
            } else if (c === 0 && r != 0) {
                let rowNumber = document.createElement("div");
                rowNumber.textContent = r;
                rowNumber.classList.add("grid-header", "row-header")
                document.getElementById(player + "-board").append(rowNumber);
            } else if (r === 0 && c === 0) {
                let headerNull = document.createElement("p");
                headerNull.classList.add("grid-header")
                document.getElementById(player + "-board").append(headerNull);
            } else {
                let square = document.createElement("div");
                square.id = (whosBoardWeCreate + "-" + r.toString() + "-" + c.toString());
                square.classList.add("square");
                if (whosBoardWeCreate === "enemy") {
                    square.classList.add("enemy-square");
                    square.onclick = shot;
            }
            document.getElementById(player + "-board").append(square);
            }
            
        }
    }
}


const generateShips = (ship) => {
    let direction = Math.random() < 0.5;
    let randomRow = direction ? Math.floor(Math.random() * rows + 1) : Math.floor(Math.random() * (rows - ship.totalHealth) + 1);
    let randomCol = direction ? Math.floor(Math.random() * (cols - ship.totalHealth) + 1) : Math.floor(Math.random() * cols + 1);
    if (direction) {
        for (let i = 0; i < ship.totalHealth; i++) {
            if (enemyBoard[randomRow][randomCol + i] !== " ") {
                shipCounter = 0;
                enemyBoard = [];
                generateEngineBoards(enemyBoard);
                placeEnemyShips();
                break;
            } else {
                enemyBoard[randomRow][randomCol + i] = ship.letter;
            }
        } 
        shipCounter++      
    } else {
        for (let i = 0; i < ship.totalHealth; i++) {
            if (enemyBoard[randomRow + i][randomCol] !== " ") {
                shipCounter = 0;
                enemyBoard = [];
                generateEngineBoards(enemyBoard);
                placeEnemyShips();
                break;
            } else {
                enemyBoard[randomRow + i][randomCol] = ship.letter;
            }
        }
        shipCounter++
    }
}


const placeEnemyShips = () => {

    for (let i = 0; i < enemyShips.length; i++) {
        if (shipCounter >= 5) {
            break;
        } else {
            generateShips(enemyShips[i]);
        }
    }
}


const generateBoards = () => {
    generateEngineBoards(playerBoard);
    generateEngineBoards(enemyBoard);
    generateVisibleBoards("player");
    generateVisibleBoards("enemy");
}

const showShipHealth = (player) => {

    let playerToMap = player === "player" ? playerShips : enemyShips
    playerToMap.map((ship) => {

        const clearHealthPoints = () => {
            document.getElementById(player + "-" + ship.shipName + "-health").innerHTML= "";
        }
        clearHealthPoints();

        if (ship.hits === ship.totalHealth) {
            ship.isSunk = true;
            document.getElementById(player + "-" + ship.shipName).setAttribute("src", "media/" + ship.shipName + "2.png");
        } 

        for (let i = 0; i < ship.totalHealth; i++) {
            let healthPoint = document.createElement("div");
            if (i < ship.hits) {
                healthPoint.classList.add("hit");
                document.getElementById(player + "-" + ship.shipName + "-health").append(healthPoint)
            } else {
                healthPoint.classList.add("no-hit");
                document.getElementById(player + "-" + ship.shipName + "-health").append(healthPoint)
            }
        }
    })
}

const directionButtons = (clickedButton, notClickedButton) => {
    clickedButton = document.getElementById(clickedButton);
    notClickedButton = document.getElementById(notClickedButton);
    clickedButton.onclick = clickedButton.classList.add("ship-button-clicked");
    notClickedButton.classList.remove("ship-button-clicked");
}

const removePlayerShips = (ship) => {

    for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
            let visibleSquare = document.getElementById("player-" + r + "-" + c)
            if (playerBoard[r][c] === ship.letter) {
                playerBoard[r][c] = " ";
            }

            if (visibleSquare.textContent === ship.letter) {
                visibleSquare.textContent = "";
                visibleSquare.classList.remove("player-ship");
            }
        }
    }
}

const checkEmptySpaces = (xCoordenada, yCoordenada, horizontal, ship) => {
    
    let placeableShip = true;
    
    if (horizontal) {
        for (let i = 0; i < ship.totalHealth; i++) {
            if (playerBoard[xCoordenada][yCoordenada + i] != " ") {
                placeableShip = false;
            }
        }

    } else {
        for (let i = 0; i < ship.totalHealth; i++) {
            if (playerBoard[xCoordenada + i][yCoordenada] != " ") {
                placeableShip = false;
            }
        }
    }

    return placeableShip
}


const placePlayerShips = (xCoordenada, yCoordenada, horizontal, comment, ship) => {

    removePlayerShips (ship);

    let shipxCoordenada = parseInt(document.getElementById(yCoordenada).value);
    let shipyCoordenada = parseInt(document.getElementById(xCoordenada).value);
    let horizontalDirection = document.getElementById(horizontal).classList.contains("ship-button-clicked") ? true : false;
    let shipComment = document.getElementById(comment);
    let isPlaceable;
    
    if (!isNaN(shipxCoordenada) && !isNaN(shipxCoordenada)) {
        isPlaceable = checkEmptySpaces(shipxCoordenada, shipyCoordenada, horizontalDirection, ship);
    } 

    if (isNaN(shipxCoordenada * 1) || isNaN(shipyCoordenada * 1)) {
        shipComment.textContent = "Please enter numeric values."
        ship.isPlaced = false;

    } else if (horizontalDirection && shipyCoordenada > (11 - ship.totalHealth)) {
        shipComment.textContent = "Can't place the ship outside the grid."
        ship.isPlaced = false;

    } else if (!horizontalDirection && shipxCoordenada > (11 - ship.totalHealth)) {
        shipComment.textContent = "Can't place the ship outside the grid."
        ship.isPlaced = false;

    } else if (shipxCoordenada === 0 || shipyCoordenada === 0) {
        shipComment.textContent = "Please enter values from 1 to 10."
        ship.isPlaced = false;

    } else if (!isPlaceable) {
        shipComment.textContent = "Another ship interferes with the placement."
        ship.isPlaced = false;
        
    } else {
        if (horizontalDirection) {
            for (let i = 0; i < ship.totalHealth; i++) {
                playerBoard[shipxCoordenada][shipyCoordenada + i] = ship.letter;
                document.getElementById("player-" + shipxCoordenada + "-" + (shipyCoordenada + i)).classList.add("player-ship");
                document.getElementById("player-" + shipxCoordenada + "-" + (shipyCoordenada + i)).textContent = ship.letter;
                document.getElementById("placed-ship-sound").play();
            }
            shipComment.textContent = "Ship placed correctly!"
            ship.isPlaced = true;
        } else {
            for (let i = 0; i < ship.totalHealth; i++) {
                playerBoard[shipxCoordenada + i][shipyCoordenada] = ship.letter;
                document.getElementById("player-" + (shipxCoordenada + i) + "-" + shipyCoordenada).classList.add("player-ship");
                document.getElementById("player-" + (shipxCoordenada + i) + "-" + shipyCoordenada).textContent = ship.letter;
                document.getElementById("placed-ship-sound").play();
            }
            shipComment.textContent = "Ship placed correctly!"
            ship.isPlaced = true;   
        }
    }
}


const checkIfAllPlaced = () => {

    let allPlaced = true;

    playerShips.map((ship) => {
        if (ship.isPlaced === false) {
            allPlaced = false;
        }
    })

    return allPlaced
}

const startGame = () => {

    let allPlaced = checkIfAllPlaced();

    if (allPlaced) {

        document.getElementById("countdown").play();

        setTimeout (function() {
            
            document.getElementById("player-ships-placer").style.display = "none";
            document.getElementById("enemy-board").style.display = "";
            document.getElementById("comments").textContent = "Your turn! Click on your opponent's grid."
            document.getElementById("placing-music").pause()
            document.getElementById("bg-music").play();
            document.getElementById("bg-music").volume = 0.6;
        }, 3000);
    } 
}


const shot = (square) => {

    if (gameOver) {
        return
    }

    if (playerTurn) {

        let squareId = square.target.id;
        let squareCoords = squareId.split("-");

        let row = parseInt(squareCoords[1]);
        let column = parseInt(squareCoords[2]);

        let explosion = document.getElementById("explosion");
        explosion.volume = 0.8

        switch (enemyBoard[row][column]) {
            case "X":
                return
            case " ":
                enemyBoard[row][column] = "X";
                let squareX = document.getElementById("enemy-" + row + "-" + column);
                squareX.classList.add("missed-shot");
                document.getElementById("splash").currentTime = 0;
                document.getElementById("splash").play();
                document.getElementById("comments").textContent = "Oh! You found nothing but water!"
                break;
            case "T":
            case "D":
            case "S":
            case "B":
            case "A":
                enemyShips.map((ship) => {
                    if(ship.letter === enemyBoard[row][column]) {
                        ship.hits++
                        let squareText = document.getElementById("enemy-" + row + "-" + column);
                        squareText.textContent = ship.letter;
                        document.getElementById("comments").textContent = ship.hits === ship.totalHealth ? `You destroyed the ${ship.shipName}!` : `You hit your opponent's ${ship.shipName}!`
                    }
                })
                enemyBoard[row][column] = "X";
                showShipHealth("enemy");
                explosion.currentTime = 0;
                explosion.play();
                explosion.volume = 0.8
                let squareColor = document.getElementById("enemy-" + row + "-" + column);
                squareColor.classList.add("shot");
        }
        playerTurn = false;
        checkWinner(enemyShips)
        enemyShot()  
    }
}

const enemyShot = () => {

    if (gameOver) {
        return
    }

    let randomRow = Math.floor((Math.random() * 10) + 1);
    let randomColumn = Math.floor((Math.random() * 10) + 1);
    let randomShot = playerBoard[randomRow][randomColumn];

    if (randomShot === "X") {
            
        return enemyShot()
        
    } else {
            
        setTimeout(function() {

            playerTurn = true;
            switch (randomShot) {
                case " ":
                    playerBoard[randomRow][randomColumn] = "X";
                    let squareShot = document.getElementById("player-" + randomRow + "-" + randomColumn);
                    squareShot.classList.add("missed-shot");
                    document.getElementById("splash").play();
                    document.getElementById("comments").textContent = "Good! Your opponent missed!"
                    break;
                case "T":
                case "D":
                case "S":
                case "B":
                case "A":
                    playerShips.map((ship) => {
                        if(ship.letter === randomShot) {
                            ship.hits++
                            let squareText = document.getElementById("player-" + randomRow + "-" + randomColumn);
                            squareText.textContent = ship.letter;
                            document.getElementById("comments").textContent = ship.hits === ship.totalHealth ? `Your ${ship.shipName} has been destroyed!` : `Your ${ship.shipName} has been hit!`
                        }
                    })
                    playerBoard[randomRow][randomColumn] = "X";
                    showShipHealth("player");
                    explosion.currentTime = 0;
                    explosion.play();
                    explosion.volume = 0.8
                    let squareColor = document.getElementById("player-" + randomRow + "-" + randomColumn);
                    squareColor.classList.add("shot");
            }
            checkWinner(playerShips)
        }, 2500)
    }
}

const checkWinner = (player) => {

    let isWinner = true;

    player.map((ship) => {
        if (ship.isSunk === false) {
            isWinner = false;
        }
    })

    if (isWinner) {
        document.getElementById("bg-music").pause();
        gameOver = true;
        let whoWon = player === playerShips ? "CPU" : playerName;
        
        setTimeout(function() {
            winnerModal(whoWon)
        }, 3000)
        
    }
}

const winnerModal = (winner) => {
    document.getElementById("explosion").currentTime = 0;
    document.getElementById("explosion").play();
    document.getElementById("winner-music").play();
    document.getElementById("winner-music").volume = 0.7;
    document.getElementById("winner-modal").style.visibility = "visible";
    document.getElementById("winner-text").textContent = winner + " wins!"
}

const playAgain = () => {
    window.location.reload();
}

welcomeSetup();
generateBoards();
placeEnemyShips();
showShipHealth("player");
showShipHealth("enemy");
