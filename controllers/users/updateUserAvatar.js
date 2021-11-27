const fs = require('fs/promises')
const path = require('path')
const { NotFound } = require('http-errors')
const Jimp = require('jimp')

const { User } = require('../../models/user')

const avatarDir = path.join(__dirname, '../../public/avatars')

const updateUserAvatar = async (req, res) => {
  const { id } = req.user
  const { path: tempUpload, originalname } = req.file

  try {
    const resultUpload = path.join(avatarDir, originalname)
    await fs.rename(tempUpload, resultUpload)

    const foto = await Jimp.read(resultUpload)
    foto.resize(250, 250)
    foto.write(resultUpload)

    const avatar = path.join('/avatars', originalname)
    const result = await User.findByIdAndUpdate(id, { avatarURL: avatar })
    if (!result) {
      throw new NotFound(`User with id${id} not found`)
    }
    res.json({
      status: 'succsess',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw console.error()
  }
}

module.exports = updateUserAvatar
