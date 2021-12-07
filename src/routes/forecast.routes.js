const { Router } = require('express')
const router = Router()

const queryValidator = require('../middlewares/query-validator')
const forecastController = require('../controllers/forecast.controller')

router.get('/forecast', queryValidator, forecastController.getForecast)

router.get('/next-rain', queryValidator, forecastController.getNextRain)

module.exports = router