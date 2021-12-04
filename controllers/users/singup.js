const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../models')
const sendMail = require('../../helpers')

const singup = async (req, res) => {
  const { email, password } = req.body
  const avatar = gravatar.url(email, { protocol: 'http', s: '250' })
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verificationToken = nanoid()

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const newUser = await User.create({ email, password: hashPassword, avatarURL: avatar, verificationToken })

  const mail = {
    to: email,
    from: 'ivans.borovikovs@live.com',
    subject: 'Verify',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нжми для подтверждения</a>`
  }

  await sendMail(mail)
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: 'starter',
      avatar
    }
  })
}

module.exports = singup
