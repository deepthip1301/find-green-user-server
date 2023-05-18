const express = require('express')
const userRoute = require('./user.route')
const docsRoute = require('./docs.route')
const stationRoute = require('./station.route')
const favoriteRoute = require('./fav.route')
const profileRoute = require('./profile.route')
const slotRoute = require('./slot.route')
const ratingRoute = require('./rating.route')

const config = require('../../config/config')

const router = express.Router()

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/station',
    route: stationRoute
  },
  {
    path: '/fav',
    route: favoriteRoute
  },
  {
    path: '/slot',
    route: slotRoute
  },
  {
    path: '/profile',
    route: profileRoute
  },
  {
    path: '/rating',
    route: ratingRoute
  }
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

module.exports = router
