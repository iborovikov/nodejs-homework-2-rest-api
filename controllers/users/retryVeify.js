const { NotFound, BadRequest } = require('http-errors')

const { User } = require('../../models')
const sendMail = require('../../helpers')

const retryVeify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound('User not foud')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const { verificationToken } = user

  const mail = {
    to: email,
    from: 'ivans.borovikovs@live.com',
    subject: 'Verify',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нжми для подтверждения</a>`
  }

  await sendMail(mail)

  res.json({
    message: 'Verification email sent'
  })
}

module.exports = retryVeify
