const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { stationService } = require('../services')
const { tokenService } = require('../services')
const logger = require('../config/logger')

const createStation = catchAsync(async (req, res) => {
  const station = await stationService.createStation(req.body)
  const tokens = await tokenService.generateAuthTokens(station)
  res
    .cookie('refreshToken', tokens.refresh.token, {
      maxAge: tokens.refresh.maxAge,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    })
    .status(httpStatus.CREATED)
    .send({ station, token: tokens.access })
  logger.info(station)
  logger.info(tokens)
})

const searchStations = catchAsync(async (req, res) => {
  const station = await stationService.queryStations(req.query.stationSearch, req.query.station_pincode)

  if (!station) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  logger.info(station)
  res.send(station)
})

const filterStations = catchAsync(async (req, res) => {
  const station = await stationService.filterStations(req)
  // console.log('hello')
  // console.log(req)
  if (!station) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  logger.info(station)
  console.log(station)
  res.send(station)
})

const findStations = catchAsync(async (req, res) => {
  const station = await stationService.findStations(req)

  if (!station) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  logger.info(station)
  res.send(station)
})

const nearStation = catchAsync(async (req, res) => {
  const lat = req.query.latitude
  const lng = req.query.longitude
  const maxDistance = 50

  const station = await stationService.nearStations(lat, lng, maxDistance)
  if (!station) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  logger.info(station)
  res.send(station)
})

const getStation = catchAsync(async (req, res) => {
  const station = await stationService.getStationById(req.params.stationId)
  if (!station) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  logger.info(station)
  res.send(station)
})

const deleteStation = catchAsync(async (req, res) => {
  const station = await stationService.getStationById(req.params.stationId)
  if (station) await stationService.deleteStationById(req.params.stationId)
  logger.info(station)
  res.status(httpStatus.NO_CONTENT).send('Deleted')
})

const updateStation = catchAsync(async (req, res) => {
  const stationOld = await stationService.getStationById(req.params.stationId)
  if (!stationOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  const station = await stationService.updateStationById(stationOld, req.body)
  logger.info(station)

  res.status(httpStatus.CREATED).send({
    station_name: station.station_name,
    station_address: station.station_address,
    station_area: station.station_area,
    station_city: station.station_city,
    station_pincode: station.station_pincode,
    station_latitude: station.station_latitude,
    station_longitude: station.station_longitude,
    station_working_time: station.station_working_time,
    station_available_connector: station.station_available_connector,
    station_connector_type: station.station_connector_type,
    station_charger_type: station.station_charger_type,
    station_charging: station.station_charging,
    station_vehicle_type: station.station_vehicle_type,
    station_capacity: station.station_capacity,
    station_tariff: station.station_tariff,
    station_amenities: station.station_amenities,
    station_status: station.station_status
  })
})

module.exports = {
  createStation,
  searchStations,
  filterStations,
  getStation,
  deleteStation,
  updateStation,
  nearStation,
  findStations
}
