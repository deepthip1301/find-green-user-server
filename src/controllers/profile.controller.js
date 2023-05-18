const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const { profileService } = require('../services')
const uploadFilesMiddleware = require('../middlewares/uploads')
const fs = require('fs')
const { models } = require('../models')
const { User } = models
const { profile_image_path } = require('../config/config')
let image

// View Profile
const profile = catchAsync(async (req, res) => {
  const user = await profileService.getUserbyId(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.userStatus == 'deleted') {
    throw new ApiError(httpStatus.NOT_FOUND, 'User has been deleted')
  }
  if (user.profile_pic != null) {
    image = profile_image_path + user.profile_pic
  } else {
    image = user.profile_pic
  }
  res.status(httpStatus.OK)
    .send({
      Username: user.name,
      Email: user.email,
      Phone_number: user.mobileNumber,
      Country: user.country,
      Postal_code: user.postalCode,
      Vehicle_model: user.vehicle_modal,
      Vehicle_number: user.vehicle_no,
      Connector_type: user.connector_type,
      Pofile_Picture: image
    })
})

// Edit Profile
const editProfile = catchAsync(async (req, res) => {
  const user = await profileService.getUserbyId(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.userStatus == 'deleted') {
    throw new ApiError(httpStatus.NOT_FOUND, 'User has been deleted')
  }
  const useredit = await profileService.updateUser(user, req.body)
  res.status(httpStatus.OK).send(
    {
      Name: useredit.name,
      Email: useredit.email,
      Phone_number: useredit.mobileNumber,
      Country: useredit.country,
      Postal_code: useredit.postalCode,
      Vehicle_model: useredit.vehicle_modal,
      Vehicle_number: useredit.vehicle_no,
      Connector_type: useredit.connector_type,
      Pofile_Picture: useredit.profile_pic
    })
})

// Upload Profile Picture
const uploadProfilePicture = catchAsync(async (req, res) => {
  const user = await profileService.getUserbyId(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  const filename = await profileService.getPicName(req.params.userId)
  if (filename != null) {
    fs.unlink('./src/public/images/' + filename, function (err) {
      if (err) {
        res.send('Error try again')
      }
    })
  }
  uploadFilesMiddleware(req, res, async (err) => {
    if (err) {
      res.status(403).send({ msg: err })
    } else if (req.file == undefined) {
      res.send({ msg: 'Error: No File Selected!' })
    } else {
      await profileService.uploadPic(user, req.file.filename)
      res.status(httpStatus.OK).send('Profile Picture Uploaded')
    }
  })
})

// Delete Prfile Picture
const deletePic = catchAsync(async (req, res) => {
  const user = await profileService.getUserbyId(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  } else {
    const filename = await profileService.getPicName(req.params.userId)
    if (filename == null) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Profile Picture')
    } else {
      fs.unlink('./src/public/images/' + filename, function (err) {
        if (err) {
          res.send('Error try again')
        } else {
          User.update({ profile_pic: null }, { where: { id: req.params.userId } })
          res.status(httpStatus.OK).send('Profile picture deleted')
        }
      })
    }
  }
})

// Delete User
const deleteUser = catchAsync(async (req, res) => {
  const user = await profileService.getUserbyId(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  } else {
    await profileService.deleteUserById(req.params.userId)
    res.status(httpStatus.OK).send('User deleted')
  }
})

module.exports = {
  profile,
  editProfile,
  uploadProfilePicture,
  deleteUser,
  deletePic
}
