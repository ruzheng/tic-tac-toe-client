const store = require('../store.js')

// code here
const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
    data // same as data: data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
    data // same as data: data
  })
}

const signOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-out',

    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  // changePw,
  signOut
}
