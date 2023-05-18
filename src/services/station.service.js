const httpStatus = require('http-status')
const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const { models } = require('../models')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')

const { Station } = models

/**
 * Create a station
 * @param {Object} stationBody
 * @returns {Promise<Station>}
 */

const createStation = async (stationBody) => {
  const station = await Station.create(stationBody)
  logger.info('Create Station')
  return station
}

/**
 * Search station
 * @param {Object} stationSearch
 * @param {Object} station_pincode
 * @returns {Promise<Station>}
 */
const queryStations = async (stationSearch, station_pincode) => {
  const { Op } = require('sequelize')
  const stations = await Station.findAll({
    stationSearch,
    station_pincode,
    where: {
      [Op.or]:
      [{ station_name: { [Op.like]: stationSearch } },
        { station_address: { [Op.like]: stationSearch } },
        { station_area: { [Op.like]: stationSearch } },
        { station_city: { [Op.like]: stationSearch } },
        { station_pincode: { [Op.eq]: station_pincode } }]
    }
  })
  logger.info('Get Station')
  return stations
}

/**
 * Filter station
 * @param {Object} search
 * @param {Object} station_pincode
 * @param {Object} station_vehicle_type
 * @param {Object} station_charger_type
 * @param {Object} station_connector_type
 * @param {Object} station_status
 * @param {Object} station_charging
 * @returns {Promise<Station>}
 */
const filterStations = async (req) => {
  const { search, station_pincode, station_vehicle_type, station_charger_type, station_connector_type, station_status, station_charging } = req.query
  // console.log(req.query)
  if (req.query.search) {
    const stations = await Station.findAll({
      where: {
        [Op.or]: [
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_vehicle_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_charger_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_connector_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_status')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_charging')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_name')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_area')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_city')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          })
        ]
      }
    })
    // console.log(stations)
    return stations
  }

  const stations = await Station.findAll({
    search,
    station_pincode,
    station_vehicle_type,
    station_charger_type,
    station_connector_type,
    station_status,
    station_charging,
    where: {
      [Op.or]:
      [{ station_name: { [Op.like]: search } },
        { station_address: { [Op.like]: search } },
        { station_area: { [Op.like]: search } },
        { station_city: { [Op.like]: search } },
        { station_pincode: { [Op.eq]: station_pincode } },
        { station_vehicle_type: { [Op.like]: station_vehicle_type } },
        { station_charger_type: { [Op.like]: station_charger_type } },
        { station_connector_type: { [Op.like]: station_connector_type } },
        { station_status: { [Op.like]: station_status } },
        { station_charging: { [Op.like]: station_charging } }]
    }
  })
  logger.info('Filter Station')
  return stations
}

/**
 * Get station by id
 * @param {ObjectId} stationId
 * @returns {Promise<Station>}
 */
const getStationById = async (stationId) => {
  logger.info('Get Station')
  return Station.findByPk(stationId)
}

/**
 *
 * Delete user by id
 * @param {ObjectId} stationId
 * @returns {Promise<Station>}
 */
const deleteStationById = async (stationId) => {
  const station = await getStationById(stationId)
  if (!station) {
    logger.info('No Station')
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  await Station.destroy({ where: { id: stationId } })
  logger.info('Station Deleted')
  return station
}

/**
 * Update user by id
 * @param {ObjectId} stationId
 * @param {Object} updateBody
 * @returns {Promise<Station>}
 */
const updateStationById = async (station, updateBody) => {
  if (!station) {
    logger.info('No Station found')
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
  }
  Object.assign(station, updateBody)
  await station.save()
  logger.info('Station Updated')
  return station
}

/**
 * Find station
 * @param {Object} station_vehicle_type
 * @param {Object} station_charger_type
 * @param {Object} station_connector_type
 * @param {Object} station_status
 * @param {Object} station_charging
 * @param {Object} stationSearch
 * @param {Object} station_pincode
 * @returns {Promise<Station>}
 */
const findStations = async (req) => {
  const { stationSearch, station_pincode, station_vehicle_type, station_charger_type, station_connector_type, station_status, station_charging } = req.query
  const { Op } = require('sequelize')
  if (req.query.search) {
    const stations = await Station.findAll({
      where: {
        [Op.or]: [
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_vehicle_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_charger_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_connector_type')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_status')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          // Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_charging')), {
          //   [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`,
          // }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_name')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_area')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_city')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          }),
          Sequelize.where(Sequelize.fn('lower', Sequelize.col('station_pincode')), {
            [Op.like]: `%${req.query.search ? req.query.search.toLowerCase() : ''}%`
          })
        ]
      }
    })
    // console.log(stations)
    return stations
  }

  const stations = await Station.findAll({
    stationSearch,
    station_pincode,
    station_vehicle_type,
    station_charger_type,
    station_connector_type,
    station_status,
    station_charging,
    where: {
      [Op.or]:
      [{ station_name: { [Op.like]: stationSearch } },
        { station_address: { [Op.like]: stationSearch } },
        { station_area: { [Op.like]: stationSearch } },
        { station_city: { [Op.like]: stationSearch } },
        { station_pincode: { [Op.eq]: station_pincode } },
        { station_vehicle_type: { [Op.like]: station_vehicle_type } },
        { station_charger_type: { [Op.like]: station_charger_type } },
        { station_connector_type: { [Op.like]: station_connector_type } },
        { station_status: { [Op.like]: station_status } },
        { station_charging: { [Op.like]: station_charging } }]
    }
  })
  logger.info('Find Station')
  return stations
}

/**
 * Get nearby stations
 * @param {Object} lat
 * @param {Object} lng
 * @param {Object} maxDistance
 * @returns {Promise<Station>}
 */
const nearStations = async (lat, lng, maxDistance) => {
  const stations = await Station.findAll()
  logger.info('Nearby Station')
  function distanceBetweenPoints (lat1, lon1, lat2, lon2) {
    const radius = 6371 // Earth's radius in kilometers
    const deltaLat = (lat2 - lat1) * (Math.PI / 180)
    const deltaLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return radius * c
  }
  return stations.filter((station) => {
    const distance = distanceBetweenPoints(lat, lng, station.station_latitude, station.station_longitude)
    return distance <= maxDistance
  })
}

module.exports = {
  createStation,
  queryStations,
  getStationById,
  deleteStationById,
  updateStationById,
  nearStations,
  filterStations,
  findStations
}
