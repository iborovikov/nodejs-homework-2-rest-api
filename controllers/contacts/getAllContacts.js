const { Contact } = require('../../models')

const getAllContacts = async (req, res) => {
  const { _id } = req.user
  console.log(req.query.favorites)
  if (req.query.page && req.query.limit) {
    const { page, limit } = req.query
    const skip = (page - 1) * limit

    const contacts = await Contact.find({ owner: _id }, '_id name email phone favorite', { skip, limit: +limit }).populate('owner', '_id email')
    res.json({
      status: 'sucsess',
      code: 200,
      data: { contacts }
    })
  }

  const contacts = await Contact.find({ owner: _id, favorites: true }, '_id name email phone favorite').populate('owner', '_id email')
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contacts }
  })
}

module.exports = getAllContacts
