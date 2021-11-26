const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const singup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const newUser = await User.create({ email, password: hashPassword })
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter'
    }
  })
}

module.exports = singup