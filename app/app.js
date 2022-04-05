// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#game-board').hide()
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  // $('#change-pw-form').on('submit', authEvents.onChangePw)
  $('#sign-out-button').on('click', authEvents.onSignOut)
  // $('.box').on('click', authEvents.runGame)
  // $('#restart-button').on('click', authEvents.restart)
  // $('#create-game').on('click', authEvents.onCreateGame)
  $('#create-new-game').on('click', '#create-game-button', authEvents.onCreateGame)
  $('#create-new-game').on('click', '#new-game-button', authEvents.restart)
})
