const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { User } = require('../../models')

const singup = async (req, res) => {
  const { email, password } = req.body
  const avatar = gravatar.url(email, { protocol: 'http', s: '250' })
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const newUser = await User.create({ email, password: hashPassword, avatarURL: avatar })
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter',
      avatar
    }
  })
}

module.exports = singup
