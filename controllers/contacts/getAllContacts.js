const { Contact } = require('../../models')
const { BadRequest } = require('http-errors')

const getAllContacts = async (req, res) => {
  const { _id } = req.user

  if (req.query.page && req.query.limit) {
    let { page, limit } = req.query
    page = Number(page)
    limit = Number(limit)

    if (!page || !limit) {
      throw new BadRequest('Page and limit must be a number')
    }

    const skip = (page - 1) * limit

    const contacts = await Contact.find({ owner: _id }, '_id name email phone favorite', { skip, limit: limit }).populate('owner', '_id email')
    res.json({
      status: 'sucsess',
      code: 200,
      data: { contacts }
    })
  }
  if (req.query.favorite) {
    const contacts = await Contact.find({ owner: _id, favorite: true }, '_id name email phone favorite').populate('owner', '_id email')
    res.json({
      status: 'sucsess',
      code: 200,
      data: { contacts }
    })
  }

  const contacts = await Contact.find({ owner: _id }, '_id name email phone favorite').populate('owner', '_id email')
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contacts }
  })
}

module.exports = getAllContacts
