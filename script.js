let activePlayer = 0;
const resetButton = document.querySelector('.reset-btn');
const message = document.querySelector('.messages');
const changeNameButton = document.querySelectorAll('.change-name');
    changeNameButtonArr = Array.from(changeNameButton);
    for(let i=0;i<changeNameButtonArr.length;i++) {
        changeNameButtonArr[i].addEventListener('click',changeName);
    }

function changeName (event) {
    let new_name = prompt("Enter new name");
    if(event.target.getAttribute('p-id')==1) {
        player1.setName(new_name);
        playerDisplay.player1updateNameUI();
    } else if(event.target.getAttribute('p-id')==2) {
        player2.setName(new_name);
        playerDisplay.player2updateNameUI();
    }
}


// Gameboard - updating and getting element on the board.
const createBoard = ( function() {
    const boardDiv = document.querySelector('.board');

    for(let i=0;i<9;i++) {
        const new_grid_square = document.createElement('div');
        new_grid_square.setAttribute('class','board-cell');
        new_grid_square.setAttribute('data-id',i);
        if(i==0) {
            new_grid_square.setAttribute('id','top-left');
        } else if(i==1) {
            new_grid_square.setAttribute('id','top-center');
        } else if(i==2) {
            new_grid_square.setAttribute('id','top-right');
        } else if(i==3) {
            new_grid_square.setAttribute('id','center-left');
        } else if(i==4) {
            new_grid_square.setAttribute('id','center-center');
        } else if(i==5) {
            new_grid_square.setAttribute('id','center-right');
        } else if(i==6) {
            new_grid_square.setAttribute('id','bottom-left');
        } else if(i==7) {
            new_grid_square.setAttribute('id','bottom-center');
        } else if(i==8) {
            new_grid_square.setAttribute('id','bottom-right');
        } 
        boardDiv.appendChild(new_grid_square);
    }
}())

const gameboard = (function() {
    const gameboardElement = [['','',''],
                              ['','',''],
                              ['','','']  
                            ];
    
    const updateElement = (i,j,symbol) => gameboardElement[i][j] = symbol;
    const getElement = (i,j) => gameboardElement[i][j];
    const debugPrintBoard = () => console.log(gameboardElement);
    const resetBoard = () => {
        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                gameboardElement[i][j] = '';
            }
        }
    }

    return {updateElement, debugPrintBoard, getElement, resetBoard};
}) ();

// Display features related to the board.
const boardDisplay = (function() {
    const cells = document.querySelectorAll('.board-cell');
    let cells_arr = Array.from(cells);

    const updateDisplay = () => {
        let i,j;
        for(i=0;i<3;i++) {
            for(j=0;j<3;j++) {
                if(gameboard.getElement(i,j) === 'O') {
                    cells_arr[(i*3)+j].innerHTML = `<i class='material-icons' style="font-size:128px">exposure_zero</i>`;
                } else if (gameboard.getElement(i,j)==='X') {
                    cells_arr[(i*3)+j].innerHTML = `<i class='material-icons' style="font-size:128px">close</i>`;
                } else {
                    cells_arr[(i*3)+j].innerHTML = '';
                }

            }
        }
    }

    const debugPrintCell = () => console.log(cells_arr);

    return {debugPrintCell, updateDisplay};
}) ();

// Create player factory function
function createPlayer(symbol) {
    let playerScore = 0;
    let playerName;
    const playerSymbol = symbol 

    const getScore = () => playerScore;
    const increaseScore = () => playerScore++;
    const getName = () => playerName;
    const setName = (newUserName) => playerName = newUserName;
    const getSymbol = () => playerSymbol;

    return {getScore, increaseScore, getName, setName, getSymbol};
}

// The player objects
const player1 = createPlayer("X");
player1.setName("Kevin");
const player2 = createPlayer("O");
player2.setName("Nikita");

// Player display object
const playerDisplay = (function() {
    const player1Name = document.querySelector('#player1-name');
    const player1Symbol = document.querySelector('#player1-symbol');
    const player1Score = document.querySelector('#player1-score');

    player1Name.innerHTML =player1.getName();
    player1Symbol.innerHTML =player1.getSymbol();
    player1Score.innerHTML =player1.getScore();

    const player2Name = document.querySelector('#player2-name');
    const player2Symbol = document.querySelector('#player2-symbol');
    const player2Score = document.querySelector('#player2-score');

    player2Name.innerHTML =player2.getName();
    player2Symbol.innerHTML =player2.getSymbol();
    player2Score.innerHTML =player2.getScore();

    const player1updateNameUI = () => {
        player1Name.innerHTML = player1.getName();
    }

    const player1updateScoreUI = () => {
        player1Score.innerHTML = player1.getScore();
    }

    const player2updateNameUI = () => {
        player2Name.innerHTML = player2.getName();
    }

    const player2updateScoreUI = () => {
        player2Score.innerHTML = player2.getScore();
    }

    return {player1updateNameUI, player2updateNameUI, player1updateScoreUI, player2updateScoreUI};
}) ();

function gamePause() {
    const gridCells = document.querySelectorAll('.board-cell');
    gcArray = Array.from(gridCells);
    for(let i=0;i<gcArray.length;i++) {
        gcArray[i].removeEventListener('click',changeElement);
    }

    console.log('reset the boad to try again');
    message.innerHTML = 'Reset the board to try again';
}

function checkWin () {
    for(let i=0;i<3;i++) {
        if(gameboard.getElement(i,0) == 'X' && gameboard.getElement(i,1) == 'X' && gameboard.getElement(i,2) == 'X') {
            console.log(`X won, row ${i}`);
            gamePause();
            player1.increaseScore();
            message.innerHTML = `Player 1 wins<br>Reset the board to play again`;
            return;
        }
        else if(gameboard.getElement(i,0) == 'O' && gameboard.getElement(i,1) == 'O' && gameboard.getElement(i,2) == 'O') {
            console.log(`Y won, row ${i}`);
            gamePause();
            player2.increaseScore();
            message.innerHTML = `Player 2 wins<br>Reset the board to play again`;
            return;
        }
    }

    for(let i=0;i<3;i++) {
        if(gameboard.getElement(0,i) == 'X' && gameboard.getElement(1,i) == 'X' && gameboard.getElement(2,i) == 'X') {
            console.log(`X won, row 1 ${i}`);
            gamePause();
            player1.increaseScore();
            message.innerHTML = `Player 1 wins<br>Reset the board to play again`;
            return;
        }
        else if(gameboard.getElement(0,i) == 'O' && gameboard.getElement(1,i) == 'O' && gameboard.getElement(2,i) == 'O') {
            console.log(`Y won, row ${i}`);
            gamePause();
            player2.increaseScore();
            message.innerHTML = `Player 2 wins<br>Reset the board to play again`;
            return;
        }
    }

    if(gameboard.getElement(0,0)=='X' && gameboard.getElement(1,1)=='X' && gameboard.getElement(2,2)=='X') {
        console.log(`X won, diagonal`);
        player1.increaseScore();
        message.innerHTML = `Player 1 wins<br>Reset the board to play again`;
        gamePause();
        return;
    } else if (gameboard.getElement(0,0)=='O' && gameboard.getElement(1,1)=='O' && gameboard.getElement(2,2)=='O'){
        console.log(`Y won, diagonal`);
        gamePause();
        player2.increaseScore();
        message.innerHTML = `Player 2 wins<br>Reset the board to play again`;
        return;
    }

    if(gameboard.getElement(0,2)=='X' && gameboard.getElement(1,1)=='X' && gameboard.getElement(2,0)=='X') {
        console.log(`X won, diagonal`);
        player1.increaseScore();
        message.innerHTML = `Player 1 wins<br>Reset the board to play again`;
        gamePause();
        return;
    } else if (gameboard.getElement(0,2)=='O' && gameboard.getElement(1,1)=='O' && gameboard.getElement(2,0)=='O'){
        console.log(`Y won, diagonal`);
        gamePause();
        player2.increaseScore();
        message.innerHTML = `Player 2 wins<br>Reset the board to play again`;
        return;
    }

    let count = 0;
    for(let i=0;i<3;i++) {
        for(let j=0;j<3;j++) {
            if(gameboard.getElement(i,j)=='') {
                count++;
            }
        }
    }
    if(count==0) {
        console.log(`Tie`);
        gamePause();
        return;
    }
    
    
}

function changeElement(event) {
    const gridID = event.target.getAttribute('data-id');
    let x = Math.floor(gridID/3);
    let y = gridID % 3;
    console.log(`${x},${y}`);
    if(gameboard.getElement(x,y)!='') {
        message.innerHTML = "Already occupied";
        return;
    }
    if(activePlayer==0) {
        gameboard.updateElement(x,y,player1.getSymbol());
        activePlayer = 1;
    } else {
        gameboard.updateElement(x,y,player2.getSymbol());
        activePlayer = 0;
    }
    gameboard.debugPrintBoard();
    boardDisplay.updateDisplay();
    checkWin();
    playerDisplay.player1updateScoreUI();
    playerDisplay.player2updateScoreUI();
}

function game_init() {
    console.log('meow');
    activePlayer=0;
    gameboard.resetBoard();
    boardDisplay.updateDisplay();
    const gridCells = document.querySelectorAll('.board-cell');
    gcArray = Array.from(gridCells);
    for(let i=0;i<gcArray.length;i++) {
        gcArray[i].addEventListener('click',changeElement);
    }

    playerDisplay.player1updateScoreUI();
    playerDisplay.player2updateScoreUI();
    message.innerHTML = "";
}


resetButton.addEventListener('click', game_init);


game_init();
