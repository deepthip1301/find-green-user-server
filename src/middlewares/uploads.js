const util = require('util')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/public/images')
  },
  filename: (req, file, callback) => {
    const match = ['image/png', 'image/jpeg', 'image/jpg']
    if (match.indexOf(file.mimetype) === -1) {
      const message = `${file.originalname} is invalid file format.
           Only accept png/jpeg/jpg file formats.`
      return callback(message, null)
    }
    const filename = `${Date.now()}-${file.originalname}`
    callback(null, filename)
  }
})

const uploadFiles = multer({ storage }).single('profile_pic')

const uploadFilesMiddleware = util.promisify(uploadFiles)

module.exports = uploadFilesMiddleware
