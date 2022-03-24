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

  console.log(response)

  // store data from the response in my store object
  store.user = response.user
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
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  // onChangePwSuccess,
  // onChangePwFailure,
  onSignOutSuccess,
  onSignOutFailure
}
