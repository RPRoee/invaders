'use strict';

const BOARD_SIZE = 14
const ENEMY_LINE_LENGTH = 8
const ENEMY_LINE_COUNT = 3

const HERO = '↭'
// const ENEMY = '⇔'
const ENEMY = '<img src="style/tank.png">'
const JAVELIN = '↟'
const SHELL = '⇟'
const BARRICADE = '🧱'
const DESTROYED = '🪨'

let gGame = {
    isOn: false,
    enemyCount: 0,
    score: 0
}

let det = document.querySelector('.details')
function start(startEl){
    startEl.style.display = 'none'
    det.style.display = 'block'
    let elBoard = document.querySelector('.boardgame')
    elBoard.style.display = 'block'
    gGame.isOn = true
    let res = det.innerHTML
    det.innerHTML = 'ENEMY INCOMING!!! 3'
    setTimeout(()=> det.innerText = 'ENEMY INCOMING!! 2', 1000)
    setTimeout(()=> det.innerText = 'ENEMY INCOMING! 1', 2000)
    setTimeout(()=> det.innerHTML = res, 3000)
    setTimeout(init, 3000)
}

function init() {
    gBoard = setSeige(BOARD_SIZE)
    renderSeige(gBoard, '.boardgame')
    gGame.score = 0
    if(!gGame.isOn) return
    gGame.enemyCount = locateEnemyObjects()
    updateEnemies()
    gEnemyInterval = setInterval(moveEnemies, 500)
    gShootInterval = setInterval(shootShell, 2000)
}

function gameOver(string){
    clearInterval(gEnemyInterval)
    clearInterval(gShootInterval)
    alert(string)
    gGame.isOn = false
    init()
}

function slavaUkraini(){
    clearInterval(gEnemyInterval)
    clearInterval(gShootInterval)
    alert('slava ukraini!')
    gGame.isOn = false
    init()
}

function updateScore(addition){
    gGame.score += addition
    document.querySelector('.score').innerText = gGame.score
}

function updateEnemies(){
    document.querySelector('.count').innerText = locateEnemyObjects().length
}

