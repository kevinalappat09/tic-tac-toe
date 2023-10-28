// Gameboard - updating and getting element on the board.
const gameboard = (function() {
    const gameboardElement = [['','',''],
                              ['','',''],
                              ['','','']  
                            ];
    
    const updateElement = (i,j,symbol) => gameboardElement[i][j] = symbol;
    const getElement = (i,j) => gameboardElement[i][j];
    const debugPrintBoard = () => console.log(gameboardElement);

    return {updateElement, debugPrintBoard, getElement};
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

const player1 = createPlayer("X");
player1.setName("Kevin");
const player2 = createPlayer("O");
player2.setName("Nikita");

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


}) ();

const gameObject = (function() {

}) ();

boardDisplay.updateDisplay();