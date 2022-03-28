const store = require('../store.js')

// code here
const onSignUpSuccess = function () {
  $('#auth-display').html('<p>User signed up successfully</p>')

  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('#auth-display').html('<p>Error while signing up</p>')

  $('form').trigger('reset')
}

const onSignInSuccess = function (response) {
  $('#auth-display').html('<p>Welcome!</p>')

  // reset all form
  $('form').trigger('reset')

  // store data from the response in my store object
  store.user = response.user
  console.log(store.user._id)
}

const onSignInFailure = function () {
  $('#auth-display').html('<p>Password or email is incorrect</p>')
  $('form').trigger('reset')
}

const onSignOutSuccess = function () {
  $('#auth-display').html('<p>Goodbye!</p>')

  $('form').trigger('reset')
}

const onSignOutFailure = function () {
  $('#auth-display').html('<p>Error while signing out</p>')
}

const createGameSuccess = function (response) {
  $('#auth-display').html('<p>Game Created!</p>')
  console.log('You create game')
  store.game = response.game
  store.gameCells = response.game.cells
  console.log(response.game)
  console.log(response.game.cells)
}

const createGameFailure = function () {
  console.log('Fail to create game')
}

const onUpdateGameSuccess = function (response) {
  console.log(response + 'Game Updated')
  store.gameId = response.game.id
  store.gameCells = response.game.cells
}

const onUpdateGameFailure = function () {
  console.log('update fail')
  $('#game-result').html('<p>Update Fail</p>')
}


module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  // onChangePwSuccess,
  // onChangePwFailure,
  onSignOutSuccess,
  onSignOutFailure,
  createGameSuccess,
  createGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
