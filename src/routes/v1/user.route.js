const express = require('express')
const validate = require('../../middlewares/validate')
const userValidation = require('../../validations/user.validation')
const userController = require('../../controllers/user.controller')

const historyController = require('../../controllers/history.controller')
const historyValidation = require('../../validations/history.validation')

const router = express.Router()

// Registration Routes
router.post('/register', validate(userValidation.register), userController.register)
router.post('/register/verifyotp', validate(userValidation.verifyotp), userController.verifyOTP)
router.post('/register/resendOTP', validate(userValidation.resendotp), userController.resendOTP)

// Login Routes
router.post('/login', validate(userValidation.login), userController.login)
router.post('/login/verifyotp', validate(userValidation.verifyotp), userController.verifyOTP)
router.post('/login/resendOTP', validate(userValidation.resendotp), userController.resendOTP)

router.post('/logout', validate(userValidation.logout), userController.logout)
router.post('/refresh-tokens', validate(userValidation.refreshTokens), userController.refreshTokens)

// Charging History
router.get('/history', validate(historyValidation.viewHistory), historyController.viewHistory)

module.exports = router
