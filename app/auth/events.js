'use strict'
// require here
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('../store.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

// code starts
let gameArr = ['', '', '', '', '', '', '', '', '']
let tieCounter = 0
let currentPlayer = 'x'
const gameOver = false

const onSignUp = function (event) {
  event.preventDefault()
  console.log('Here')
  const data = getFormFields(event.target)
  authApi
    .signUp(data)
    .then(() => authUi.onSignUpSuccess())
    .catch(() => authUi.onSignUpFailure())
}

const onSignIn = function (event) {
  event.preventDefault()
  console.log('Here')

  const data = getFormFields(event.target)

  authApi
    .signIn(data)
    .then((response) => authUi.onSignInSuccess(response))
  console.log(store.user)
}

const onCreateGame = function (event) {
  console.log('game create')
  authApi
    .createGame()
    .then((response) => authUi.createGameSuccess(response))
    .catch(() => authUi.onCreateGameFailure())
  tieCounter = 0
  $('.box').on('click', playerClicks)
}
const onSignOut = function () {
  gameArr = store.game.cells
  currentPlayer = 'x'
  $('.box').text('')
  authApi
    .signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignUpFailure())
}

const playerClicks = function (event) {
  const gameIndex = event.target.getAttribute('data-cell-index')
  console.log(gameArr[gameIndex])

  authApi
    .playerMove(gameIndex, currentPlayer, gameOver)
    .then((response) => authUi.onUpdateGameSuccess(response))
    .then(() => gameResult())
    .then(() => {
      tieCounter += 1
    })
    .then(() => {
      if (currentPlayer === 'x') {
        $(this).text('X').unbind()
        // $(this).addClass('x')
        // store.game.cells
        currentPlayer = 'o'
        // console.log(gameArr[gameIndex])
      } else {
        $(this).text('O').unbind()
        // $(this).addClass('o')
        currentPlayer = 'x'
        // store.game.cells = 'o'
        // console.log(store.game.cells)
      }

      console.log(store.game)
      console.log(tieCounter)
    })
}

const gameResult = function () {
  console.log(currentPlayer)
  if (((store.game.cells[0] === currentPlayer) && (store.game.cells[1] === currentPlayer) && (store.game.cells[2] === currentPlayer)) ||
  ((store.game.cells[3] === currentPlayer) && (store.game.cells[4] === currentPlayer) && (store.game.cells[5] === currentPlayer)) ||
  ((store.game.cells[6] === currentPlayer) && (store.game.cells[7] === currentPlayer) && (store.game.cells[8] === currentPlayer)) ||
  ((store.game.cells[0] === currentPlayer) && (store.game.cells[3] === currentPlayer) && (store.game.cells[6] === currentPlayer)) ||
  ((store.game.cells[1] === currentPlayer) && (store.game.cells[4] === currentPlayer) && (store.game.cells[7] === currentPlayer)) ||
  ((store.game.cells[2] === currentPlayer) && (store.game.cells[5] === currentPlayer) && (store.game.cells[8] === currentPlayer)) ||
  ((store.game.cells[0] === currentPlayer) && (store.game.cells[4] === currentPlayer) && (store.game.cells[8] === currentPlayer)) ||
  ((store.game.cells[2] === currentPlayer) && (store.game.cells[4] === currentPlayer) && (store.game.cells[6] === currentPlayer))) {
    console.log(currentPlayer + ' wins!')
    store.game.over = true
    tieCounter = 0
    $('#game-result').html(currentPlayer + ' wins!')
    $('.box').unbind()
    console.log(store.game.over)
    return gameOver
  } else if (tieCounter === 8) {
    $('#game-result').html('It is a tie!')
    tieCounter = 0
    store.game.over = true
    return gameOver
  }
}
const restart = function () {
  console.log('clicked')
  $('.box').text('')
  $('#game-result').html('')
  $('.box').on('click', playerClicks)
  currentPlayer = 'x'
  store.game.over = false
  authApi
    .createGame()
    .then((response) => authUi.createGameSuccess(response))
    .then(() => { gameArr = store.game.cells })
    .catch(() => authUi.onCreateGameFailure())
  tieCounter = 0
}
module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  playerClicks,
  restart,
  onCreateGame

}
