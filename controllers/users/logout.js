const { Unauthorized } = require('http-errors')

const { User } = require('../../models')

const logout = async (req, res) => {
  const { id } = req.user
  const user = await User.findByIdAndUpdate(id, { token: null })
  if (!user) {
    throw new Unauthorized('Not authorized')
  }
  res.status(204).json()
}

module.exports = logout
