'use strict'
// require here
const getFormFields = require('../../lib/get-form-fields.js')
const store = require('../store.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

// code starts
// let currentPlayer = playerX
// const gameBoard = ['', '', '', '', '', '', '', '', '']

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
  authApi
    .createGame()
    .then((response) => authUi.createGameSuccess(response))
    .catch(() => authUi.onSignInFailure())
  $('.box').on('click', runGame)
}
const onSignOut = function () {
  authApi
    .signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignUpFailure())
}

let clicked = false
const runGame = function (event) {
  const gameIndex = event.target.getAttribute('data-cell-index')
  // console.log(boxIndex)
  console.log('here')
  authApi.playerMove(gameIndex, clicked, gameOver)
  //   gameBoard[event.target.id] = currentPlayer

  //   if (($('.box.data-cell-index[0]') && $('.box.data-cell-index[0]') && 3 || 4 && 5 && 6 || 7 && 8 && 9 || 1 && 4 && 7 || 2 && 5 && 8 || 3 && 6 && 9 || 1 && 5 && 9 || 3 && 5 && 7).hasClass('x')) {
  //     $('#game-result').html('<p>X wins!</p>')
  //   } else if ((1 && 2 && 3 || 4 && 5 && 6 || 7 && 8 && 9 || 1 && 4 && 7 || 2 && 5 && 8 || 3 && 6 && 9 || 1 && 5 && 9 || 3 && 5 && 7).hasClass('o')) {
  //     $('#game-result').html('<p>O wins!</p>')
  //   }

  if (!clicked) {
    $(this).text('X').unbind()
    $(this).addClass('x')

    clicked = true
    // store.game[gameIndex] = 'X'
    // console.log(store.game)
  } else {
    $(this).text('O').unbind()
    $(this).addClass('o')

    clicked = false
    // store.game[gameIndex] = 'O'
    // console.log(store.game)
  }
}

// let won = false
// const checkPlayerWon = function (event) {
//   if ($('.box').hasClass('x').length === 3) {
//      $('#auth-display').html('<p>X wins!</p>')
//   } else if ($('.box').hasClass('o').length === 3) {
//     $('#auth-display').html('<p>O wins!</p>')
//   }
// }

const restart = function (event) {
  console.log('clicked')
  $('.box').text('')
  $('.x').bind('click', runGame)
  $('.o').bind('click', runGame)
  $('.box').removeClass('x')
  $('.box').removeClass('o')
  clicked = false
}
module.exports = {
  onSignUp,
  onSignIn,
  // onChangePw,
  onSignOut,
  runGame,
  restart,
  onCreateGame
//   checkPlayerWon
}
