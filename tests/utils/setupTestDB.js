// const mongoose = require('mongoose');
const postgres = require('postgres')
const config = require('../../src/config/config')

const setupTestDB = () => {
  beforeAll(async () => {
    await postgres.connect(config.postgres.url, config.postgres.options)
  })

  beforeEach(async () => {
    await Promise.all(Object.values(postgres.connection.collections).map(async (collection) => collection.deleteMany()))
  })

  afterAll(async () => {
    await postgres.disconnect()
  })
}

module.exports = setupTestDB
