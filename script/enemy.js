'use strict';
// direction; 1 is RIGHT, -1 is LEFT
let gMovementDir = 1
let gEnemyInterval
let gShootInterval

function setEnemyPositions(board) {
    for (let enLine = 0; enLine < ENEMY_LINE_COUNT; enLine++) {
        for (let enCount = 0; enCount < ENEMY_LINE_LENGTH; enCount++) {
            board[enLine][enCount] = setCell(ENEMY, 'field')
            gGame.enemyCount++
            // console.log(gGame.enemyCount)
        }
    }
    return board
}

function moveEnemies() {
    let enemies = locateEnemyObjects();
    (gMovementDir === -1) ? moveLeft(enemies) : moveRight(enemies)
}

function locateEnemyObjects() {
    let enemies = []
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].gameObject === ENEMY) {
                enemies.push({ i, j })
            }
        }
    }
    return enemies
}

function moveRight(ens) {
    for (let x = ens.length - 1; x >= 0; x--) {
        let enLoc = ens[x]
        let nextCell = gBoard[enLoc.i][enLoc.j + 1]
        if (!nextCell) {
            gMovementDir = -1
            moveDown(ens)
            // console.log('moving left')
            return
        }
        checkNextCell(enLoc, { i: enLoc.i, j: enLoc.j + 1 })
    }
}

function moveLeft(ens) {
    for (let x = 0; x < ens.length; x++) {
        let enLoc = ens[x]
        let nextCell = gBoard[enLoc.i][enLoc.j - 1]
        if (!nextCell) {
            gMovementDir = 1
            moveDown(ens)
            // console.log('moving right')
            return
        }
        checkNextCell(enLoc, { i: enLoc.i, j: enLoc.j - 1 })
    }
}

function moveDown(ens) {
    for (let x = ens.length - 1; x >= 0; x--) {
        let enLoc = ens[x]
        let nextCellLoc = { i: enLoc.i + 1, j: enLoc.j }
        checkNextCell(enLoc, nextCellLoc)
    }
}

function checkNextCell(enLoc, nextLocation) {
    let nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell.gameObject === JAVELIN) {
        killEnemy(enLoc.i, enLoc.j)
        updateEnemies()
        return
    } else if (nextCell.gameObject === BARRICADE) {
        moveUp(enLoc)
        destroyBarricade(enLoc.j)
        // console.log('barricade destroyed! enemy at the gates!')
    } else if (nextCell.gameObject === HERO) {
        gameOver('our hero was crushed. Putin won')
        return
    } else if (nextCell.type === 'city') {
        gameOver('the enemy took Kiev. Putin won.')
        return
    } else {
        // next cell data&dom:
        updateBoard(nextLocation.i, nextLocation.j, ENEMY, nextCell.type)
        // erasing cell data&dom:
        updateBoard(enLoc.i, enLoc.j, '', gBoard[enLoc.i][enLoc.j].type)
    }
}

// if the enemy tries to walk on a barricade,
// the enemy losses progress but the barricade is destroyed
function moveUp(en) {
    console.log(en)
    updateBoard(en.i, en.j, '', gBoard[en.i][en.j].type)
    updateBoard(en.i - ENEMY_LINE_COUNT, en.j, ENEMY, gBoard[en.i - ENEMY_LINE_COUNT][en.j].type)
}

function destroyBarricade(barJ) {
    console.log('barricade destroyed!')
    updateBoard(gBoard.length - 3, barJ, DESTROYED, gBoard[gBoard.length - 3][barJ])
    console.log(locateEnemyObjects())
}

function shootShell() {
    let tank = chooseRandomShooter()
    let shellLoc = { i: tank.i + 1, j: tank.j }
    updateBoard(shellLoc.i, tank.j, SHELL, gBoard[shellLoc.i][shellLoc.j].type)
    moveShell(shellLoc)
}

function moveShell(shellLoc) {
    updateBoard(shellLoc.i, shellLoc.j, '', gBoard[shellLoc.i][shellLoc.j].type)
    let nextShellLoc = { i: shellLoc.i + 1, j: shellLoc.j }
    // console.log(nextShellLoc)
    let nextCell = gBoard[nextShellLoc.i][nextShellLoc.j]

    if (nextShellLoc.i === gBoard.length-1) return
    if (nextCell.gameObject === BARRICADE) {
        destroyBarricade(nextShellLoc.j)
        removeShell(shellLoc)
        return
    }else if (nextCell.gameObject === HERO){
        removeShell(shellLoc)
        updateBoard(gHero.location.i, gHero.location.j, HERO, 'suburbs')
        killHero()
        return
    }else if (nextCell.gameObject === JAVELIN){
        // debugger
        removeShell(shellLoc)
        removeJavelin(nextShellLoc.i, nextShellLoc.j)
        return
    }
    // debugger
    updateBoard(nextShellLoc.i, nextShellLoc.j, SHELL, gBoard[nextShellLoc.i][nextShellLoc.j].type)
    setTimeout(moveShell, 500, nextShellLoc)
}

function removeShell(shellLoc) {
    // debugger
    updateBoard(shellLoc.i, shellLoc.j, '', gBoard[shellLoc.i][shellLoc.j].type)
}

function chooseRandomShooter() {
    let closeLine = getClosestLine()
    let tankToShoot = closeLine[getRandomIntExclusive(0, closeLine.length)]
    return tankToShoot
}

function getClosestLine() {
    let ens = locateEnemyObjects()
    let biggestI = ens[ens.length - 1].i
    let closests = []
    for (let x = 0; x < ens.length; x++) {
        if (ens[x].i === biggestI) closests.push(ens[x])
    }
    return closests
}

function getRandomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
