const sgMail = require('@sendgrid/mail')

require('dotenv').config()

const { SEND_GRID_API_KEY } = process.env

sgMail.setApiKey(SEND_GRID_API_KEY)

const sendMail = async(data) => {
  const email = { ...data, from: 'ivans.borovikovs@live.com' }
  await sgMail.send(email)
  return true
}
module.exports = sendMail
