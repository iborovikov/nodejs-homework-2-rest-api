const singup = require('./singup')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateUserSubscrition = require('./updateUserSubscrition')
const updateUserAvatar = require('./updateUserAvatar')

module.exports = {
  singup,
  login,
  logout,
  getCurrentUser,
  updateUserSubscrition,
  updateUserAvatar
}
