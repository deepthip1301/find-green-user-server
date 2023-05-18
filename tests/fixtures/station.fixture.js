const mongoose = require('mongoose')
// const postgres = require('postgres')
// const bcrypt = require('bcryptjs')
// const faker = require('faker')
const Station = require('../../src/models/station.model')

const stationOne = {
  _id: mongoose.Types.ObjectId(),
  station_name: 'shell ev charging station',
  station_address: 'professor colony',
  station_area: 'seliyur',
  station_city: 'chennai',
  station_pincode: '620082',
  station_latitude: '27.28',
  station_longitude: '29.6',
  station_working_time: '5-11',
  station_available_connector: '3',
  station_connector_type: 'AC Type 1',
  station_charger_type: 'ac',
  station_charging: 'fast',
  station_vehicle_type: 'bike',
  station_status: 'available'
}

const stationTwo = {
  _id: mongoose.Types.ObjectId(),
  station_name: 'find ev charging station',
  station_address: 'teachers colony',
  station_area: 'tambaram',
  station_city: 'chennai',
  station_pincode: '620081',
  station_latitude: '23.28',
  station_longitude: '25.6',
  station_working_time: '6-10',
  station_available_connector: '2',
  station_connector_type: 'AC Type 2',
  station_charger_type: 'dc',
  station_charging: 'slow',
  station_vehicle_type: 'car',
  station_status: 'busy'
}

const stationThree = {
  _id: mongoose.Types.ObjectId(),
  station_name: 'ev charging station',
  station_address: 'pro colony',
  station_area: 'tambaram',
  station_city: 'chennai',
  station_pincode: '620081',
  station_latitude: '23.28',
  station_longitude: '25.6',
  station_working_time: '6-10',
  station_available_connector: '2',
  station_connector_type: 'AC Type 2',
  station_charger_type: 'dc',
  station_charging: 'slow',
  station_vehicle_type: 'car',
  station_status: 'busy'
}

const insertStation = async (stations) => {
  await Station.insertMany(stations.map((station) => ({ ...station })))
}

module.exports = {
  stationOne,
  stationTwo,
  stationThree,
  insertStation
}
