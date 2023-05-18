const express = require('express')
const stauth = require('../../middlewares/stauth')
const validate = require('../../middlewares/validate')
const stationValidation = require('../../validations/station.validation')
const stationController = require('../../controllers/station.controller')

const router = express.Router()

router.post('/add-station', stauth, validate(stationValidation.createStation), stationController.createStation)

router.get('/searchStations', stauth, validate(stationValidation.searchStations), stationController.searchStations)

router.get('/filterStations', stauth, validate(stationValidation.filterStations), stationController.filterStations)

router.get('/getStation/:stationId', stauth, validate(stationValidation.getStation), stationController.getStation)

router.delete('/deleteStation/:stationId', stauth, validate(stationValidation.deleteStation), stationController.deleteStation)

router.patch('/updateStation/:stationId', stauth, validate(stationValidation.updateStation), stationController.updateStation)

router.get('/nearStation', stauth, validate(stationValidation.nearStation), stationController.nearStation)

router.get('/findStations', stauth, validate(stationValidation.findStations), stationController.findStations)

module.exports = router
