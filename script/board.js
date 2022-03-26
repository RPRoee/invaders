'use strict';


let gBoard

// let gHero = {location: {i: gBoard.length-3, j: gBoard[0].length-3}, isShoot: false}

function setSeige(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = setCell('', 'field')
        }
    }
    board = setEnemyPositions(board)
    board = setDefencesPosition(board)
    board = setHeroPosition(board)
    board = setCity(board)
    return board;
}

function renderSeige(board, container) {
    let strHTML = '<table border = "0" cellspacing = "0" = "moveHero(this)"><tbody>'
    for (let i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < board[i].length; j++) {
            let cellContent = board[i][j]
            let id = i * board.length + j + 1
            // let location = `{i: ${i}, j: ${j}}`
            // row before last one, class is suburbs:
            let rowClass = (i !== board.length - 1 && i !== board.length - 2) ? i : 'suburbs'
            // for last row, class is the city:
            if (i === board.length - 1) rowClass = 'kiev'
            // per cell class is defined by row, id& location by row&cell
            strHTML += `<td data-location="${i}-${j}" class="${rowClass}" id="${id}"> ${cellContent.gameObject}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    document.querySelector(container).innerHTML = strHTML
}

function updateBoard(i, j, obj, type) {
    gBoard[i][j] = setCell(obj, type)
    document.getElementById(i * gBoard.length + j + 1).innerHTML = gBoard[i][j].gameObject
}

function setCell(gameObject, type) {
    return { gameObject, type }
}
function renderCell(location, value) {
    var elCell = document.querySelector(`[data-location="${location.i}-${location.j}"]`);
    elCell.innerHTML = value;
}