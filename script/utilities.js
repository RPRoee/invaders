'use strict';

function getRandomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function countInRow(board, rowIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[rowIdx][i]
        if (cell === symbol) count++
    }
    return count
}

function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][colIdx]
        if (cell === symbol) count++
    }
    return count
}

function countInMainDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][i]
        if (cell === symbol) count++
    }
    return count
}

function countInSecondaryDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][board.length - 1 - i]
        if (cell === symbol) count++
    }
    return count
}
//  squared matrix
function createBoard(num) {

    var board = [];
    for (var i = 0; i < num; i++) {
        board.push([])
        for (var j = 0; j < num; j++) {
            board[i][j] = ''
        }
    }
    return board;
}

// generate specific sized 2d array
function create2Darray(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createNums(num) {
    var nums = []
    for (var i = 0; i < num; i++) {
        nums.push(i + 1)
    }
    return nums
}

////////////////////////////////////////////////////////////////////////////


var gElStopWatch = document.querySelector('.stopwatch') //<div class="stopwatch">0.000</div>
var gTimerInterval
var gStartTime

function timerCycle() {
    var currTime = Date.now()
    var sec = (currTime - gStartTime) / 1000
    sec = sec.toFixed(3)
    gElStopWatch.innerHTML = sec
}

function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(timerCycle, 10)
}

function stopTimer() {
    clearInterval(gTimerInterval)
}

function resetTimer() {
    clearInterval(gTimerInterval)
    gElStopWatch.innerText = '0.000'
}
/////////////////////////////////////////


function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell-' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell === EMPTY) emptyCells.push({ i, j })
        }
    }
    var randomIdx = getRandomIntExclusive(0, emptyCells.length)
    return emptyCells[randomIdx]
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE)
            if (mat[i][j]) neighborsCount++;
        }
    }
    return neighborsCount;
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;

            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
        }
    }
    return neighborsCount;
}

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    console.log('elCell:', elCell)
    elCell.innerText = value
}

function handleKey(event) {
    // make sure to get the spcific needed positions from the current project
    var i = gGamerPos.i;
    var j = gGamerPos.j;
    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;
    }
}

//  the parameter coords is a [{i,j},{i,j}]
function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }
}