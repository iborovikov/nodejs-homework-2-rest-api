const { Unauthorized } = require('http-errors')

const { User } = require('../../models')

const getCurrentUser = async (req, res) => {
  const { id } = req.user
  const user = User.findById(id)
  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  res.json({
    user: {
      email: req.user.email,
      subscription: req.user.subscription
    }

  })
}

module.exports = getCurrentUser
