const express = require('express')
const validate = require('../../middlewares/validate')
const ratingController = require('../../controllers/rating.controller')
const ratingValidation = require('../../validations/rating.validation')

const router = express.Router()

router.post('/', validate(ratingValidation.rating), ratingController.rating)

module.exports = router
