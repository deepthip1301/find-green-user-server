// const { Station } = require('../../../src/models')

describe('Station model', () => {
  describe('Station validation', () => {
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

    test('should throw a validation error if pincode length is less than 6 characters', async () => {
      newStation.station_pincode = '67895'
      await expect(newStation).toThrowError(Error('pincode length is less than 6 characters'))
    })

    test('should throw a validation error if pincode length is greater than 6 characters', async () => {
      newStation.station_pincode = '6789522'
      await expect(newStation).toThrowError(Error('pincode length is greater than 6 characters'))
    })
    test('should throw a validation error if pincode does not contain numbers', async () => {
      newStation.station_pincode = 'p62802'
      await expect(newStation).toThrowError(Error(' pincode does not contain numbers'))
    })

    test('should throw a validation error if area contain numbers', async () => {
      newStation.station_area = 'guindy1'
      await expect(newStation).toThrowError(Error('area contain numbers'))
    })

    test('should throw a validation error if city contain numbers', async () => {
      newStation.station_city = 'chennai4'
      await expect(newStation).toThrowError(Error('city contain numbers'))
    })

    test('should throw a validation error if available connector letters', async () => {
      newStation.station_available_connector = 'hi1'
      await expect(newStation).toThrowError(Error('available connector letters'))
    })

    test('should throw a validation error if charger type contain numbers', async () => {
      newStation.station_charger_type = 'dc4'
      await expect(newStation).toThrowError(Error('charger type contain numbers'))
    })

    test('should throw a validation error if charging contain numbers', async () => {
      newStation.station_charging = 'fast4'
      await expect(newStation).toThrowError(Error('charging contain numbers'))
    })

    test('should throw a validation error if vehicle type contain numbers', async () => {
      newStation.station_vehicle_type = 'car8'
      await expect(newStation).toThrowError(Error('vehicle type contain numbers'))
    })

    test('should throw a validation error if status contain numbers', async () => {
      newStation.station_status = 'busy5'
      await expect(newStation).toThrowError(Error('status contain numbers'))
    })
  })
})
