const { Contact } = require('../../models')

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const contact = await Contact.create(newContact)

  res.status(201).json({
    status: 'sucsess',
    code: 201,
    data: { contact }
  })
}
module.exports = addContact
