const gameboard = (function() {
    const gameboardElement = [['X','X','X'],
                              ['O','O','O'],
                              ['X','X','X']  
                            ];
    
    const updateElement = (i,j,symbol) => gameboardElement[i][j] = symbol;
    const getElement = (i,j) => gameboardElement[i][j];
    const debugPrintBoard = () => console.log(gameboardElement);

    return {updateElement, debugPrintBoard, getElement};
}) ();

const boardDisplay = (function() {
    const cells = document.querySelectorAll('.board-cell');
    let cells_arr = Array.from(cells);

    const updateDisplay = () => {
        let i,j;
        for(i=0;i<3;i++) {
            for(j=0;j<3;j++) {
                if(gameboard.getElement(i,j) === 'O') {
                    cells_arr[(i*3)+j].innerHTML = 'O';
                } else if (gameboard.getElement(i,j)==='X') {
                    cells_arr[(i*3)+j].innerHTML = 'X';
                } else {
                    cells_arr[(i*3)+j].innerHTML = '';
                }

            }
        }
    }

    
    const debugPrintCell = () => console.log(cells_arr);

    return {debugPrintCell, updateDisplay};
}) ();

boardDisplay.debugPrintCell();
boardDisplay.updateDisplay();