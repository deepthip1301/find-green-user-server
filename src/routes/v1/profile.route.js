const express = require('express')
const validate = require('../../middlewares/validate')
const profileController = require('../../controllers/profile.controller')
const profileValidation = require('../../validations/profile.validation')
const router = express.Router()

// Profile
router.get('/:userId', validate(profileValidation.profile), profileController.profile)
router.put('/edit-profile/:userId', validate(profileValidation.editProfile), profileController.editProfile)
router.post('/profile-pic/:userId', validate(profileValidation.profilePic), profileController.uploadProfilePicture)
router.delete('/delete-pic/:userId', validate(profileValidation.deleteProfilePic), profileController.deletePic)

router.delete('/delete/:userId', validate(profileValidation.deleteUser), profileController.deleteUser)

module.exports = router
