const express = require('express')
const validate = require('../../middlewares/validate')
const slotValidation = require('../../validations/slotValidation')
const slotController = require('../../controllers/slotController')

const router = express.Router()

router.post('/add_slots', validate(slotValidation.addSlots), slotController.addSlots)
router.post('/remove_slots', validate(slotValidation.removeSlots), slotController.removeSlots)
router.post('/view_slots', validate(slotValidation.viewSlots), slotController.viewSlots)
router.post('/viewcancelled_slots', slotController.viewcancelledSlots)
router.post('/viewupcoming_slots', validate(slotValidation.upcomingslot),slotController.viewupcomingslots)

module.exports = router
