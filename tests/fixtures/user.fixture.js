const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const faker = require('faker')
const User = require('../../src/models/user.model')

const password = 'password1'
const salt = bcrypt.genSaltSync(8)
const hashedPassword = bcrypt.hashSync(password, salt)

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  stripeId: faker.random.uuid(),
  subscription: {
    subscriptionType: 'free'
  }
}

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  stripeId: faker.random.uuid(),
  subscription: {
    id: faker.random.uuid(),
    subscriptionType: 'basic'
  }
}

const userThree = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  stripeId: faker.random.uuid(),
  subscription: {
    id: faker.random.uuid(),
    subscriptionType: 'basic'
  },
  stripePaymentMethod: {
    id: faker.random.uuid(),
    last4: 1234
  }
}

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  stripeId: faker.random.uuid(),
  subscription: {
    subscriptionType: 'free'
  }
}

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })))
}

module.exports = {
  userOne,
  userTwo,
  userThree,
  admin,
  insertUsers
}
