const { BadRequest } = require('http-errors')

const { User } = require('../../models')

const updateUserSubscrition = async (req, res) => {
  const { id } = req.user
  const { status } = req.params
  if (status !== 'starter' && status !== 'pro' && status !== 'business') {
    throw new BadRequest('Invalid subscription status')
  }
  await User.findByIdAndUpdate(id, { subscription: status })
  res.json({
    user: {
      email: req.user.email,
      subscription: status
    }
  })
}

module.exports = updateUserSubscrition
