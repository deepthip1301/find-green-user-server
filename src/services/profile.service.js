const { models } = require('../models')
const { User } = models

// Get User by id
const getUserbyId = async (userId) => {
  return User.findByPk(userId)
}

// Update User Details
const updateUser = async (user, updateBody) => {
  Object.assign(user, updateBody)
  await user.save()
  return user
}

// Upload User Profile Picture
const uploadPic = async (user, filename) => {
  const pic = { profile_pic: filename }
  Object.assign(user, pic)
  await user.save()
  return user
}

// Get profile picture name
const getPicName = async (userId) => {
  const user = await getUserbyId(userId)
  return user.profile_pic
}

// Delete User By id
const deleteUserById = async (userId) => {
  const user = await getUserbyId(userId)
  await User.update({
    userStatus: 'deleted'
  },
  {
    where: { id: userId }
  })
  await user.save()
  return user
}

module.exports = {
  getUserbyId,
  updateUser,
  uploadPic,
  getPicName,
  deleteUserById
}
