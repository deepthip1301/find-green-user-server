const request = require('supertest')
const httpStatus = require('http-status')
const app = require('../../src/app')
const setupTestDB = require('../utils/setupTestDB')
const { Station } = require('../../src/models')
const { stationOne, stationTwo, stationThree, insertStation } = require('../fixtures/station.fixture')

setupTestDB()

describe('Station routes', () => {
  describe('POST /v1/station', () => {
    let newStation

    beforeEach(() => {
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
        station_status: 'available'
      }
    })

    test('should return 201 and successfully create new station if data is ok', async () => {
      await insertStation([stationThree])

      const res = await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.CREATED)

      expect(res.body).toEqual({
        id: expect.anything(),
        station_name: newStation.station_name,
        station_address: newStation.station_address,
        station_area: newStation.station_area,
        station_city: newStation.station_city,
        station_pincode: newStation.station_pincode,
        station_latitude: newStation.station_latitude,
        station_longitude: newStation.station_longitude,
        station_working_time: newStation.station_working_time,
        station_available_connector: newStation.station_available_connector,
        station_connector_type: newStation.station_connector_type,
        station_charger_type: newStation.station_charger_type,
        station_charging: newStation.station_charging,
        station_vehicle_type: newStation.station_vehicle_type,
        station_status: newStation.station_status
      })

      const dbUser = await Station.findById(res.body.id)
      expect(dbUser).toBeDefined()
      expect(dbUser).toMatchObject({
        station_name: newStation.station_name,
        station_address: newStation.station_address,
        station_area: newStation.station_area,
        station_city: newStation.station_city,
        station_pincode: newStation.station_pincode,
        station_latitude: newStation.station_latitude,
        station_longitude: newStation.station_longitude,
        station_working_time: newStation.station_working_time,
        station_available_connector: newStation.station_available_connector,
        station_connector_type: newStation.station_connector_type,
        station_charger_type: newStation.station_charger_type,
        station_charging: newStation.station_charging,
        station_vehicle_type: newStation.station_vehicle_type,
        station_status: newStation.station_status
      })
    })

    test('should return 401 error if access token is missing', async () => {
      await request(app).post('/v1/station').send(newStation).expect(httpStatus.UNAUTHORIZED)
    })

    test('should return 400 error if pincode length is less than 6 characters', async () => {
      await insertStation([stationThree])
      newStation.station_pincode = '89065'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if pincode length is greater than 6 characters', async () => {
      await insertStation([stationThree])
      newStation.station_pincode = '8906522'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if pincode contain letters', async () => {
      await insertStation([stationThree])
      newStation.station_pincode = '8906y2'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if area contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_area = 'guindy1'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if city contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_city = 'chennai4'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if available connector contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_available_connector = 'hi1'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if charger type contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_charger_type = 'dc4'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if charging contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_charging = 'fast4'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if vehicle type contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_vehicle_type = 'car8'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 error if status contain numbers', async () => {
      await insertStation([stationThree])
      newStation.station_status = 'busy5'

      await request(app)
        .post('/v1/station')
        .send(newStation)
        .expect(httpStatus.BAD_REQUEST)
    })
  })

  describe('GET /v1/station', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 15
      })
      expect(res.body.results).toHaveLength(15)
      expect(res.body.results[0]).toEqual({
        id: stationOne._id.toHexString(),
        station_name: stationOne.station_name,
        station_address: stationOne.station_address,
        station_area: stationOne.station_area,
        station_city: stationOne.station_city,
        station_pincode: stationOne.station_pincode,
        station_latitude: stationOne.station_latitude,
        station_longitude: stationOne.station_longitude,
        station_working_time: stationOne.station_working_time,
        station_available_connector: stationOne.station_available_connector,
        station_connector_type: stationOne.station_connector_type,
        station_charger_type: stationOne.station_charger_type,
        station_charging: stationOne.station_charging,
        station_vehicle_type: stationOne.station_vehicle_type,
        station_status: stationOne.station_status
      })
    })

    test('should return 401 if access token is missing', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      await request(app).get('/v1/station').send().expect(httpStatus.UNAUTHORIZED)
    })

    test('should correctly apply filter on station name field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_name: stationOne.station_name })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station address field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_address: stationOne.station_address })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station area field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_area: stationOne.station_area })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station city field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_city: stationOne.station_city })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station pincode field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_pincode: stationOne.station_pincode })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station latitude field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_latitude: stationOne.station_latitude })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station longitude field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_longitude: stationOne.station_longitude })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station connector type field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_connector_type: stationOne.station_connector_type })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station charger type field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_charger_type: stationOne.station_charger_type })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station charging field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_charging: stationOne.station_charging })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station vehicle type field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_vehicle_type: stationOne.station_vehicle_type })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly apply filter on station status field', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ station_status: stationOne.station_status })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
    })

    test('should correctly sort the returned array if descending sort param is specified', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ sortBy: 'role:desc' })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3
      })
      expect(res.body.results).toHaveLength(3)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
      expect(res.body.results[1].id).toBe(stationTwo._id.toHexString())
      expect(res.body.results[2].id).toBe(stationThree._id.toHexString())
    })

    test('should correctly sort the returned array if ascending sort param is specified', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ sortBy: 'role:asc' })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 3
      })
      expect(res.body.results).toHaveLength(3)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
      expect(res.body.results[1].id).toBe(stationTwo._id.toHexString())
      expect(res.body.results[2].id).toBe(stationThree._id.toHexString())
    })

    test('should limit returned array if limit param is specified', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ limit: 2 })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 2,
        totalPages: 2,
        totalResults: 3
      })
      expect(res.body.results).toHaveLength(2)
      expect(res.body.results[0].id).toBe(stationOne._id.toHexString())
      expect(res.body.results[1].id).toBe(stationTwo._id.toHexString())
    })

    test('should return the correct page if page and limit params are specified', async () => {
      await insertStation([stationOne, stationTwo, stationThree])

      const res = await request(app)
        .get('/v1/station')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ page: 2, limit: 2 })
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 2,
        limit: 2,
        totalPages: 2,
        totalResults: 3
      })
      expect(res.body.results).toHaveLength(1)
      expect(res.body.results[2].id).toBe(stationThree._id.toHexString())
    })
  })

  describe('GET /v1/station/:stationId', () => {
    test('should return 200 and the station object if data is ok', async () => {
      await insertStation([stationOne])

      const res = await request(app)
        .get(`/v1/station/${stationOne._id}`)
        .send()
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        id: stationOne._id.toHexString(),
        station_name: stationOne.station_name,
        station_address: stationOne.station_address,
        station_area: stationOne.station_area,
        station_city: stationOne.station_city,
        station_pincode: stationOne.station_pincode,
        station_latitude: stationOne.station_latitude,
        station_longitude: stationOne.station_longitude,
        station_working_time: stationOne.station_working_time,
        station_available_connector: stationOne.station_available_connector,
        station_connector_type: stationOne.station_connector_type,
        station_charger_type: stationOne.station_charger_type,
        station_charging: stationOne.station_charging,
        station_vehicle_type: stationOne.station_vehicle_type,
        station_status: stationOne.station_status
      })
    })

    test('should return 401 error if access token is missing', async () => {
      await insertStation([stationOne])

      await request(app).get(`/v1/station/${stationOne._id}`).send().expect(httpStatus.UNAUTHORIZED)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await insertStation([stationThree])

      await request(app)
        .get('/v1/station/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if station is not found', async () => {
      await insertStation([stationThree])

      await request(app)
        .get(`/v1/station/${stationOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('DELETE /v1/station/:stationId', () => {
    test('should return 204 if data is ok', async () => {
      await insertStation([stationOne])

      await request(app)
        .delete(`/v1/station/${stationOne._id}`)
        .send()
        .expect(httpStatus.NO_CONTENT)

      const dbUser = await Station.findById(stationOne._id)
      expect(dbUser).toBeNull()
    })

    test('should return 401 error if access token is missing', async () => {
      await insertStation([stationOne])

      await request(app).delete(`/v1/station/${stationOne._id}`).send().expect(httpStatus.UNAUTHORIZED)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await insertStation([stationOne])

      await request(app)
        .delete('/v1/station/invalidId')
        .send()
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 404 error if station already is not found', async () => {
      await insertStation([stationOne])

      await request(app)
        .delete(`/v1/station/${stationOne._id}`)
        .send()
        .expect(httpStatus.NOT_FOUND)
    })
  })

  describe('PATCH /v1/station/:stationId', () => {
    test('should return 200 and successfully update station if data is ok', async () => {
      await insertStation([stationOne])
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
        station_status: 'busy'
      }

      const res = await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.OK)

      expect(res.body).toEqual({
        id: stationOne._id.toHexString(),
        station_name: updateBody.station_name,
        station_address: updateBody.station_address,
        station_area: updateBody.station_area,
        station_city: updateBody.station_city,
        station_pincode: updateBody.station_pincode,
        station_latitude: updateBody.station_latitude,
        station_longitude: updateBody.station_longitude,
        station_working_time: updateBody.station_working_time,
        station_available_connector: updateBody.station_available_connector,
        station_connector_type: updateBody.station_connector_type,
        station_charger_type: updateBody.station_charger_type,
        station_charging: updateBody.station_charging,
        station_vehicle_type: updateBody.station_vehicle_type,
        station_status: updateBody.station_status
      })

      const dbUser = await Station.findById(stationOne._id)
      expect(dbUser).toBeDefined()
      expect(dbUser).toMatchObject({
        station_name: updateBody.station_name,
        station_address: updateBody.station_address,
        station_area: updateBody.station_area,
        station_city: updateBody.station_city,
        station_pincode: updateBody.station_pincode,
        station_latitude: updateBody.station_latitude,
        station_longitude: updateBody.station_longitude,
        station_working_time: updateBody.station_working_time,
        station_available_connector: updateBody.station_available_connector,
        station_connector_type: updateBody.station_connector_type,
        station_charger_type: updateBody.station_charger_type,
        station_charging: updateBody.station_charging,
        station_vehicle_type: updateBody.station_vehicle_type,
        station_status: updateBody.station_status
      })
    })

    test('should return 401 error if access token is missing', async () => {
      await insertStation([stationOne])
      const updateBody = { station_name: stationOne.station_name }

      await request(app).patch(`/v1/station/${stationOne._id}`).send(updateBody).expect(httpStatus.UNAUTHORIZED)
    })

    test('should return 404 if admin is updating another station that is not found', async () => {
      await insertStation([stationThree])
      const updateBody = { station_name: stationOne.station_name }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND)
    })

    test('should return 400 error if stationId is not a valid mongo id', async () => {
      await insertStation([stationThree])
      const updateBody = { station_name: stationOne.station_name }

      await request(app)
        .patch('/v1/station/invalidId')
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if pincode length is less than 6 characters', async () => {
      await insertStation([stationOne])
      const updateBody = { station_pincode: '89065' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if pincode length is more than 6 characters', async () => {
      await insertStation([stationOne])
      const updateBody = { station_pincode: '8906500' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if pincode contain letters ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_pincode: '89065t' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if area contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_area: 'guindy1' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if city contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_city: 'chennai4' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if available connector contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_available_connector: 'hi1' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if charger type contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_charger_type: 'dc4' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if charging contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_charging: 'fast4' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if vehicle type contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_vehicle_type: 'car8' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })

    test('should return 400 if status contain numbers ', async () => {
      await insertStation([stationOne])
      const updateBody = { station_status: 'busy5' }

      await request(app)
        .patch(`/v1/station/${stationOne._id}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST)
    })
  })
})
