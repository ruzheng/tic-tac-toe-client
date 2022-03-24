'use strict'
// require here
const getFormFields = require('../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')
const store = require('../store.js')
// code starts

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
    .catch(() => authUi.onSignInFailure())
}

const onSignOut = function () {
  authApi
    .signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignUpFailure())
}
module.exports = {
  onSignUp,
  onSignIn,
  // onChangePw,
  onSignOut
}
