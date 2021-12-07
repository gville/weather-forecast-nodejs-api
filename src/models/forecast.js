const mongoose = require('mongoose')
const { Schema } = mongoose

const forecastSchema = new Schema({
    from: {
        type: Date, required: true
    },
    to: {
        type: Date, required: true
    },
    location: {
        type: String, required: true
    },
    temp: {
        type: Number, required: true
    },
    rain: {
        type: Number, required: true
    }
})

module.exports = mongoose.model('Forecast', forecastSchema)