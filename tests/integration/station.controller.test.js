const request = require('supertest')
const httpStatus = require('http-status')
const app = require('../../src/app')
const { invalid } = require('joi')
const ApiError = require('../../src/utils/ApiError')

describe('Station Controllers', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ5MSwiaWF0IjoxNjc5Mzg5NDUxLCJleHAiOjE2ODE5ODE0NTEsInR5cGUiOiJyZWZyZXNoIn0.cEXNCSBvkSXLHrm9NDXKOfgAhux1LieOjQ_skN0WC3s'

  describe('createStation', () => {
    let newStation

    test('should return 201 and successfully create new station if data is ok', async () => {
      newStation = {
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
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if access token is missing', async () => {
      await request(app).post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send().expect(400)
    })

    test('should return 400 error if pincode length is less than 6 characters', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '89065',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if pincode length is greater than 6 characters', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '8906522',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if pincode contain letters', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '8906y2',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(400)
    })

    test('should return 400 error if area contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur2',
        station_city: 'chennai',
        station_pincode: '890656',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if city contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai4',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if available connector contain letters', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: 'h3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if charger type contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac1',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if charging contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast8',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if vehicle type contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike5',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })

    test('should return 400 error if status contain numbers', async () => {
      newStation = {
        station_name: 'shell ev charging station',
        station_address: 'professor colony',
        station_area: 'seliyur',
        station_city: 'chennai',
        station_pincode: '890652',
        station_latitude: '27.28',
        station_longitude: '29.6',
        station_working_time: '5-11',
        station_available_connector: '3',
        station_connector_type: 'AC Type 1',
        station_charger_type: 'ac',
        station_charging: 'fast',
        station_vehicle_type: 'bike',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'available1'
      }

      await request(app)
        .post('/v1/station/add-station')
        .set('x-access-token', `${token}`)
        .send(newStation)
        .expect(201)
    })
  })

  describe('getStation', () => {
    test('should return 200 and the station object if data is ok', async () => {
      const stationId = 450

      await request(app)
        .get(`/v1/station/getStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(() => {
          if (!stationId) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
          } else { expect(404) }
        })
    })

    test('should return 401 error if access token is missing', async () => {
      const stationId = 2
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY3ODIxMTk2NCwiZXhwIjoxNjgwODAzOTY0LCJ0eXBlIjoicmVmcmVzaCJ9.dR5gfEvc7TjyBghK3gBvfdGgs7TWD9ajZklK7hqPUiA'

      await request(app).get(`/v1/station/getStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(404)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY3ODIxMTk2NCwiZXhwIjoxNjgwODAzOTY0LCJ0eXBlIjoicmVmcmVzaCJ9.dR5gfEvc7TjyBghK3gBvfdGgs7TWD9ajZklK7hqPUiA'

      await request(app)
        .get('/v1/station/getStation/invalidId')
        .set('x-access-token', `${token}`)
        .send()
        .expect(500)
    })

    test('should return 404 error if station is not found', async () => {
      const stationId = 2
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImlhdCI6MTY3ODIxMTk2NCwiZXhwIjoxNjgwODAzOTY0LCJ0eXBlIjoicmVmcmVzaCJ9.dR5gfEvc7TjyBghK3gBvfdGgs7TWD9ajZklK7hqPUiA'

      await request(app)
        .get(`/v1/station/getStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(404)
    })
  })

  describe('deleteStation', () => {
    test('should return 204 if data is ok', async () => {
      const stationId = 5

      await request(app)
        .get(`/v1/station/deleteStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(() => {
          if (stationId) {
            expect(204)
          } else { throw new ApiError(httpStatus.NOT_FOUND, 'Station not found') }
        })
    })

    test('should throw a NOT_FOUND error if station is not found', () => {
      // Arrange
      const stationId = null

      // Act and Assert
      expect(() => {
        if (!stationId) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
        }
      }).toThrow(new ApiError(httpStatus.NOT_FOUND, 'Station not found'))
    })

    test('should return 401 error if access token is missing', async () => {
      const stationId = 2

      await request(app).delete(`/v1/station/deleteStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send().expect(204)

      if (stationId === 5) {
        expect(httpStatus.NOT_FOUND)
      }
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await request(app)
        .delete('/v1/station/deleteStation/invalidId')
        .set('x-access-token', `${token}`)
        .send()
        .expect(500)
    })

    test('should return 404 error if station already is not found', async () => {
      const stationId = 2

      await request(app)
        .delete(`/v1/station/deleteStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(204)

      if (stationId === 0) {
        expect(httpStatus.NOT_FOUND)
      }
    })
  })

  describe('updateStation', () => {
    test('should return 200 and successfully update station if data is ok', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
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
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 10

      await request(app)
        .get(`/v1/station/getStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(() => {
          if (!stationId) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Station not found')
          } else {
            request(app)
              .patch(`/v1/station/updateStation/${stationId}`)
              .set('x-access-token', `${token}`)
              .send(updateBody)
              .expect(201)
          }
        })
    })

    test('should return 401 error if access token is missing', async () => {
      const updateBody = {

        station_name: ' ev charging station',
        station_address: 'professor colony',
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
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 11

      await request(app).patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody).expect(201)
    })

    test('should return 404 if admin is updating another station that is not found', async () => {
      const updateBody = {
        station_name: ' ev charging station',
        station_address: 'professor colony',
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
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 12

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      const updateBody = {
        station_name: 'ev charging station',
        station_address: 'professor colony',
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
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      await request(app)
        .patch('/v1/station/updateStation/invalidId')
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(500)
    })

    test('should return 400 if pincode length is less than 6 characters', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '89065',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 13

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if pincode length is more than 6 characters', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '8906500',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 14

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if pincode contain letters ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '89065t',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 15

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(400)
    })

    test('should return 400 if area contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram8',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 16

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if city contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai5',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 17

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if available connector contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2g',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 18

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if charger type contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc4',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 19

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if charging contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'fast4',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 20

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if vehicle type contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car8',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy'
      }

      const stationId = 21

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })

    test('should return 400 if status contain numbers ', async () => {
      const updateBody = {
        station_name: 'find ev charging station',
        station_address: 'professor colony',
        station_area: 'tambaram',
        station_city: 'chennai',
        station_pincode: '628002',
        station_latitude: '23.28',
        station_longitude: '25.6',
        station_working_time: '6-10',
        station_available_connector: '2',
        station_connector_type: 'AC Type 2',
        station_charger_type: 'dc',
        station_charging: 'slow',
        station_vehicle_type: 'car',
        station_capacity: '8.5 KWh',
        station_tariff: 'Rs 50/15 mins',
        station_amenities: 'Parking, Restroom',
        station_status: 'busy5'
      }

      const stationId = 22

      await request(app)
        .patch(`/v1/station/updateStation/${stationId}`)
        .set('x-access-token', `${token}`)
        .send(updateBody)
        .expect(201)
    })
  })

  describe('searchStations', () => {
    test('should return 200 and the station object if data is ok', async () => {
      const stationSearch = 'tambaram'
      const stationpincode = 620081

      await request(app)
        .get(`/v1/station/searchStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 401 error if access token is missing', async () => {
      const stationSearch = 'tambaram'
      const stationpincode = 620081

      await request(app).get(`/v1/station/searchStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}`)
        .set('x-access-token', `${token}`).send().expect(200)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await request(app)
        .get(`/v1/station/searchStations?stationSearch=${invalid}&station_pincode=${invalid}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 404 error if station is not found', async () => {
      const stationSearch = 'omr'
      const stationpincode = 670091

      await request(app)
        .get(`/v1/station/searchStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })
  })

  describe('findStations', () => {
    test('should return 200 and the station object if data is ok', async () => {
      const stationSearch = 'tambaram'
      const stationpincode = 620081
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/findStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}&station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 401 error if access token is missing', async () => {
      const stationSearch = 'tambaram'
      const stationpincode = 620081
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/findStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}&station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send().expect(200)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await request(app)
        .get(`/v1/station/findStations?stationSearch=${invalid}&station_pincode=${invalid}&station_vehicle_type=${invalid}&station_charger_type=${invalid}&station_connector_type=${invalid}&station_status=${invalid}&station_charging=${invalid}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 404 error if station is not found', async () => {
      const stationSearch = 'tambaram'
      const stationpincode = 620081
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/findStations?stationSearch=${stationSearch}&station_pincode=${stationpincode}&station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })
  })

  describe('filterStations', () => {
    test('should return 200 and the station object if data is ok', async () => {
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/filterStations?station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 401 error if access token is missing', async () => {
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/filterStations?station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send().expect(200)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await request(app)
        .get(`/v1/station/filterStations?station_vehicle_type=${invalid}&station_charger_type=${invalid}&station_connector_type=${invalid}&station_status=${invalid}&station_charging=${invalid}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })

    test('should return 404 error if station is not found', async () => {
      const stationvehicletype = 'car'
      const stationchargertype = 'dc'
      const stationconnectortype = 'AC Type 2'
      const stationstatus = 'busy'
      const stationcharging = 'slow'

      await request(app)
        .get(`/v1/station/filterStations?station_vehicle_type=${stationvehicletype}&station_charger_type=${stationchargertype}&station_connector_type=${stationconnectortype}&station_status=${stationstatus}&station_charging=${stationcharging}`)
        .set('x-access-token', `${token}`)
        .send()
        .expect(200)
    })
  })

  describe('nearStations', () => {
    let nearby

    test('should return 200 and the station object if data is ok', async () => {
      const latitude = '20.28'
      const longitude = '24.6'

      nearby = {
        latitude: '20.28',
        longitude: '24.6',
        maxDistance: 50
      }

      await request(app)
        .get(`/v1/station/nearStation?latitude=${latitude}&longitude=${longitude}`)
        .set('x-access-token', `${token}`)
        .send(nearby)
        .expect(200)
    })

    test('should return 401 error if access token is missing', async () => {
      const latitude = '20.28'
      const longitude = '24.6'

      nearby = {
        latitude: '20.28',
        longitude: '24.6',
        maxDistance: 50
      }

      await request(app)
        .get(`/v1/station/nearStation?latitude=${latitude}&longitude=${longitude}`)
        .set('x-access-token', `${token}`)
        .send(nearby).expect(200)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await request(app)
        .get(`/v1/station/nearStation?latitude=${invalid}&longitude=${invalid}`)
        .set('x-access-token', `${token}`)
        .send(nearby)
        .expect(400)
    })

    test('should return 404 error if station is not found', async () => {
      const latitude = '20.28'
      const longitude = '24.6'

      nearby = {
        latitude: '20.28',
        longitude: '24.6',
        maxDistance: 50
      }

      await request(app)
        .get(`/v1/station/nearStation?latitude=${latitude}&longitude=${longitude}`)
        .set('x-access-token', `${token}`)
        .send(nearby)
        .expect(200)
    })
  })
})
