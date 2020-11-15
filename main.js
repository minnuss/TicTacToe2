let mainDiv = document.querySelector('.main-div');
let cells = document.querySelectorAll('.cell');
let messageDiv = document.querySelector('.message-div');
let winningMessage = document.querySelector('.message-pop');
let restartBtn = document.querySelector('.btn');


let X = 'x';
let circle = 'circle';
let currentPlayer;

const winningArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// set a hover on first player, which is X
function startGame() {
    mainDiv.classList.add(X);
}
startGame();

// reset page - refresh page after game ends
restartBtn.addEventListener('click', () => {
    location.reload();
});

for (let cell of cells) {
    cell.addEventListener('click', handleClick, { once: true })
}

function handleClick(e) {

    const cell = e.target;
    // switch currentPlayer
    currentPlayer = currentPlayer === X ? circle : X

    // place current player mark in cell
    function placeCellMark() {
        cell.classList.add(currentPlayer);
    }
    placeCellMark();

    // check for win, draw
    if (checkWin(currentPlayer)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true);
    } else {
        placeCellMark();
        setCurrentPlayerHover();
    }

    // logic for draw game
    function isDraw() {
        return winningArray.every(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(X) || cells[index].classList.contains(circle);
            })
        })
    }

    // what to do when game ends - messages to show !
    function endGame(draw) {
        if (draw) {
            winningMessage.innerText = 'Draw!';
        } else {
            winningMessage.innerText = currentPlayer === X ? 'X Wins !' : 'O Wins !';
        }
        messageDiv.classList.add('show');
    }

    // hover current player mark above cell
    function setCurrentPlayerHover() {
        mainDiv.classList.remove(X);
        mainDiv.classList.remove(circle);
        if (currentPlayer === X) {
            mainDiv.classList.add(circle);
        }

        if (currentPlayer === circle) {
            mainDiv.classList.add(X);
        }
    };
    setCurrentPlayerHover();


    // check for winning combinations in winningArray
    function checkWin(currentPlayer) {
        return winningArray.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentPlayer);
            })
        })
    }
}










