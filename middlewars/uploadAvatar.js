const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileFormat = file.mimetype.split('/')
    if (fileFormat[fileFormat.length - 1] !== 'jpeg') {
      return cb(new Error('Wrong file type'))
    }
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const uploadAvatar = multer({
  storage: uploadConfig
})

module.exports = uploadAvatar
