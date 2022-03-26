'use strict';
let gHero = { location: { i: 12, j: 5 }, isShoot: false, lives: 3 }

function setDefencesPosition(board) {
    // console.log(board[0].length)
    board[board.length - 3][2] = setCell(BARRICADE, 'field')
    board[board.length - 3][Math.floor(board[0].length / 2) - 2] = setCell(BARRICADE, 'field')
    board[board.length - 3][Math.floor(board[0].length / 2) + 1] = setCell(BARRICADE, 'field')
    board[board.length - 3][board[0].length - 3] = setCell(BARRICADE, 'field')
    return board
}

function setHeroPosition(board) {
    board[board.length - 2][Math.floor(board[0].length / 2) - 2] = setCell(HERO, 'suburbs')
    return board
}

function setCity(board) {
    board[board.length - 1][Math.floor(board[0].length / 2) - 2] = setCell('K', 'city')
    board[board.length - 1][Math.floor(board[0].length / 2) - 1] = setCell('I', 'city')
    board[board.length - 1][Math.floor(board[0].length / 2)] = setCell('E', 'city')
    board[board.length - 1][Math.floor(board[0].length / 2) + 1] = setCell('V', 'city')
    return board
}

function heroAction(event) {
    // console.log(event)
    switch (event.code) {
        case ('ArrowRight'):
            moveHero(1)
            break
        case ('ArrowLeft'):
            moveHero(-1)
            break
        case ('Space'):
            shoot(gHero.location)
            break
        default:
            console.log(event.code + ' pressed')
    }
}

function moveHero(dir) {
    if (gHero.location.j + dir < 0 || gHero.location.j + dir === gBoard.length) return
    // dom:
    renderCell(gHero.location, '')
    // data:
    gHero.location.j += dir
    // console.log(gHero.location)
    // dom:
    renderCell(gHero.location, HERO)
}

function shoot(location) {
    // it'd take 250ms to shoot again if you already have a javelin shot:
    if (gHero.isShoot) return console.log('wait, reloading')
    let range = { i: { min: location.i - 1, max: 1 }, j: location.j }
    if (gBoard[range.i.min][range.j].gameObject === BARRICADE) {
        let elAlert = document.querySelector('.alert')
        elAlert.innerText = 'don\'t shoot over your own defences!'
        elAlert.style.display='block'
        setTimeout(() => {elAlert.style.display = 'none'}, 2000)
        return
    }
    gHero.isShoot = true
    blinkJavelin(range)
    setTimeout(() => { gHero.isShoot = false }, 250)
}

function blinkJavelin(shotRange, currentRow = gHero.location.i) {
    let i = currentRow - 1
    if (i < 0) {
        removeJavelin(i, shotRange.j)
        console.log('what a wasted shot!')
        return
    }else if (gBoard[i][shotRange.j].gameObject === ENEMY) {
        killEnemy(i, shotRange.j)
        return
    } else if (gBoard[i][shotRange.j].gameObject === SHELL){
        removeJavelin(i, shotRange.j)
        removeShell(i-1, shotRange.j)
        return
    }
    moveJavelin(i, shotRange.j)
    // console.log('blink', i, shotRange.j)
    setTimeout(blinkJavelin, 100, shotRange, i)
}

function moveJavelin(i, j) {
    // debugger
    let prevCellId = (i + 1) * gBoard.length + j + 1
    if (document.getElementById(prevCellId).innerHTML !== HERO) removeJavelin(i, j)
    if (gBoard[i][j].gameObject === '') {
        updateBoard(i, j, JAVELIN, gBoard[i][j].type)
    }
}

function killEnemy(i, j) {
    console.log(`enemy killed at cell (i: ${i}, j: ${j})`)
    updateScore(10)
    updateEnemies()
    updateBoard(i, j, '', gBoard[i][j].type)
    removeJavelin(i, j)
    let ens = locateEnemyObjects()
    gGame.enemyCount = ens.length
    if (ens.length === 0) {
        clearInterval(gEnemyInterval)
        slavaUkraini()
    }
}

function removeJavelin(i, j) {
    updateBoard(i+1, j, '', gBoard[i+1][j].type)
}

function killHero(){
    gHero.lives--
    let hearts = ''
    for (let i = 0; i < gHero.lives; i++){
        hearts +='♥'
    }
    document.querySelector('.lives').innerText = hearts
    if (gHero.lives === 0) gameOver('our hero is dead. Putin Won...')
}