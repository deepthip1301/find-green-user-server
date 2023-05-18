const config = require('../config/config')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const stauth = router.use(function (req, res, next) {
  const token = req.headers['x-access-token']
  console.log(token)
  if (token) {
    jwt.verify(token, config.jwt.secret,
      {
        algorithm: config.jwt.algorithm

      }, function (err, decoded) {
        if (err) {
          const errordata = {
            message: err.message,
            expiredAt: err.expiredAt
          }
          console.log(errordata)
          return res.status(401).json({
            message: 'Unauthorized Access'
          })
        }
        req.decoded = decoded
        console.log(decoded)
        next()
      })
  } else {
    return res.status(403).json({
      message: 'Forbidden Access'
    })
  }
})

module.exports = stauth
