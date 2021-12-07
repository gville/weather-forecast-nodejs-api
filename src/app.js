const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger-doc')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)
app.set('query parser', (queryString) => {
    return new URLSearchParams(queryString)
})

// routes
const apiRoutes = require('./routes/forecast.routes') 

// middleware
app.use(morgan('dev'))

// routes
app.use('/api', apiRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// catch 404 error and forward to error handler
app.use(require('./middlewares/not-found'))

// error handler middleware
app.use(require('./middlewares/error-handler'))

module.exports = app