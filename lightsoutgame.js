window.onload = function () {
    let boardContainer = [];

    let xlength;
    let ylength;

    let attemptsCounter = 0;
    let boardCompleted = false;

    let boardDiv = document.getElementById("board");
    let restartButton = document.getElementById("restart");
    let newBoardButton = document.getElementById("newboard");
    let createGameForm = document.forms["createGameForm"];
    let attemptsPara = document.getElementById("attempts");

    restartButton.style.display = 'none';
    newBoardButton.style.display = 'none';

    createGameForm.onsubmit = e => newGame(e);
    restartButton.onclick = e => restartGame(e);
    newBoardButton.onclick = e => showGameForm(e);

    function newGame(e) {
        e.preventDefault();

        xlength = createGameForm["width"].value;
        ylength = createGameForm["height"].value;

        createGame();

        createGameForm.style.display = 'none';
        restartButton.style.display = 'inline';
        newBoardButton.style.display = 'inline';
        attemptsPara.style.display = 'block';
    }

    function showGameForm(e) {
        e.preventDefault();

        while (boardDiv.hasChildNodes()) {
            boardDiv.removeChild(boardDiv.lastChild);
        }

        createGameForm.style.display = 'inline';
        attemptsPara.style.display = 'none';
        restartButton.style.display = 'none';
        newBoardButton.style.display = 'none';
    }

    function restartGame(e) {
        e.preventDefault();

        createGame();
    }

    function createGame() {

        boardContainer = createBoard(xlength, ylength);

        attemptsCounter = 0;
        attemptsPara.innerHTML = `Attempts: ${attemptsCounter}`;

        boardCompleted = false;

        displayBoard(boardContainer);
    }

    function userClick(x, y) {

        if (!boardCompleted) {

            attemptsCounter++;
            attemptsPara.innerHTML = `Attempts: ${attemptsCounter}`;

            updateBoard(boardContainer, x, y);

            if (checkBoardCompleted(boardContainer)) {

                boardCompleted = true;
                let attemptText = attemptsCounter === 1 ? 'attempt' : 'attempts';
                attemptsPara.innerHTML = `Congratulations! Completed in ${attemptsCounter} ${attemptText}. Restart or update the board size to continue.`;
            }

            displayBoard(boardContainer);
        }
    }

    function displayBoard(board) {

        while (boardDiv.hasChildNodes()) {
            boardDiv.removeChild(boardDiv.lastChild);
        }

        for (i=0; i<ylength; i++) {

            let row = document.createElement('div');
            row.className = 'row';

            for (j=0; j<xlength; j++) {

                let boardItem = document.createElement('div');
                boardItem.className = board[i][j] ? 'boardItemLightOn' : 'boardItemLightOff';
                boardItem.onclick = userClick.bind(undefined, i, j);
                row.appendChild(boardItem);
            }

            boardDiv.appendChild(row);
        }
    }

    function createBoard(x, y) {

        let newBoard = [];

        let atLeastOneLightOn = false;

        for (j=0; j<y; j++) {

            let xRow = [];

            for (i=0; i<x; i++) {

                let lightOn = Math.round(Math.random()) === 1;

                if (!atLeastOneLightOn && lightOn) {
                    atLeastOneLightOn = true;
                }

                xRow.push(lightOn);
            }

            newBoard.push(xRow);
        }

        if (!atLeastOneLightOn) {
            createBoard(x, y)
        } else {
            return newBoard;
        }
    }

    function updateBoard(board, x, y) {

        board[x][y] = !board[x][y];

        if (x > 0)                  { board[x-1][y] = !board[x-1][y]; }
        if (x < board.length-1)     { board[x+1][y] = !board[x+1][y]; }
        if (y > 0)                  { board[x][y-1] = !board[x][y-1]; }
        if (y < board[0].length-1)  { board[x][y+1] = !board[x][y+1]; }
    }

    function checkBoardCompleted(board) {

        for (i=0; i<board.length; i++) {
            for (j=0; j<board[0].length; j++) {
                if (board[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
};

