const { Unauthorized, NotFound, BadRequest } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound(`Email ${email} dosen't exist`)
  }
  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (!user.verify) {
    throw new BadRequest('Email need to be verifyed')
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription
    }
  })
}

module.exports = login
