// production: 'https://tic-tac-toe-api-production.herokuapp.com',
// development: 'https://tic-tac-toe-api-development.herokuapp.com'

const config = require('../config.js')
const store = require('../store.js')

// url: config.apiUrl + '/game'

// code here
const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data // same as data: data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data // same as data: data
  })
}

const signOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',

    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const createGame = function (data) {
  console.log(createGame)
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {}
  })
}
// const getGameStatus = function (data) {
//   console.log(getGameStatus)
//   return $.ajax({
//     method: 'GET',
//     url: 'https://tic-tac-toe-api-development.herokuapp.com/games' + data.id,

//     headers: {
//       Authorization: 'Bearer ' + store.user.token
//     },
//     data
//   })
// }

const playerMove = function (index, value, gameOver) { // parameter index value gameover
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/games/' + store.game._id,

    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: index,
          value: value
        },
        over: gameOver
      }
    }
  })
}
module.exports = {
  signUp,
  signIn,
  // changePw,
  signOut,
  // getGameStatus,
  playerMove,
  createGame
}
