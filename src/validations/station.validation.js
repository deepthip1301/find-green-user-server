const Joi = require('joi')

const createStation = {
  body: Joi.object().keys({
    station_name: Joi.string().required(),
    station_address: Joi.string().required(),
    station_area: Joi.string().required(),
    station_city: Joi.string().required(),
    station_pincode: Joi.string().required(),
    station_latitude: Joi.number().required(),
    station_longitude: Joi.number().required(),
    station_working_time: Joi.string().required(),
    station_available_connector: Joi.string().required(),
    station_connector_type: Joi.string().required(),
    station_charger_type: Joi.string().required(),
    station_charging: Joi.string().required(),
    station_vehicle_type: Joi.string().required(),
    station_capacity: Joi.string().required(),
    station_tariff: Joi.string().required(),
    station_amenities: Joi.string().required(),
    station_status: Joi.string().required()
  })
}

const searchStations = {
  query: Joi.object().keys({
    stationSearch: Joi.string(),
    station_pincode: Joi.string()
  })
}

const filterStations = {
  query: Joi.object().keys({
    station_vehicle_type: Joi.string(),
    station_charger_type: Joi.string(),
    station_connector_type: Joi.string(),
    station_status: Joi.string(),
    station_charging: Joi.string(),
    search: Joi.string(),
    station_pincode: Joi.string()
  })
}

const getStation = {
  params: Joi.object().keys({
    stationId: Joi.string()
  })
}

const deleteStation = {
  params: Joi.object().keys({
    stationId: Joi.string()
  })
}

const updateStation = {
  params: Joi.object().keys({
    stationId: Joi.required()
  }),
  body: Joi.object()
    .keys({
      station_name: Joi.string(),
      station_address: Joi.string(),
      station_area: Joi.string(),
      station_city: Joi.string(),
      station_pincode: Joi.string(),
      station_latitude: Joi.number(),
      station_longitude: Joi.number(),
      station_working_time: Joi.string(),
      station_available_connector: Joi.string(),
      station_connector_type: Joi.string(),
      station_charger_type: Joi.string(),
      station_charging: Joi.string(),
      station_vehicle_type: Joi.string(),
      station_capacity: Joi.string(),
      station_tariff: Joi.string(),
      station_amenities: Joi.string(),
      station_status: Joi.string()
    })
    .min(1)
}

const nearStation = {
  query: Joi.object().keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
  })
}

const findStations = {
  query: Joi.object().keys({
    stationSearch: Joi.string(),
    station_pincode: Joi.string(),
    station_vehicle_type: Joi.string(),
    station_charger_type: Joi.string(),
    station_connector_type: Joi.string(),
    station_status: Joi.string(),
    station_charging: Joi.string(),
    search: Joi.string()
  })
}

module.exports = {
  createStation,
  searchStations,
  getStation,
  deleteStation,
  updateStation,
  nearStation,
  filterStations,
  findStations
}
