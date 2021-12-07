const Forecast = require('../models/forecast')

const getForecast = async (req, res, next) => {

    const location = req.query.get('location')
    const datetime = req.query.get('datetime')

    const thatDay = new Date(new Date(datetime).setHours(0,0,0,0))
    let nextDay = new Date(thatDay)
    nextDay.setDate(thatDay.getDate() + 1)

    try{
        const forecasts = await Forecast.find({
            location: location,
            from: { $gt : thatDay },
            to: { $lt : nextDay }
        })
    
        if (forecasts.length > 1) {
            const result = nearestRangeTo(forecasts, datetime)
            res.send(result)        
        } else {
            res.send(forecasts)
        }
    }
    catch(err){
        next(err)
    }
}

const getNextRain = async (req, res, next) => {

    const location = req.query.get('location')
    const datetime = req.query.get('datetime')

    const rainProbability = 70

    const thatDay = new Date(new Date(datetime).setHours(0,0,0,0))

    try{
        const forecasts = await Forecast.find({
            location: location,
            from: { $gt : thatDay },
            rain: { $gt: rainProbability }
        })
    res.send(forecasts)
    }
    catch(err){
        next(err)
    }    
}

const nearestRangeTo = (ranges_numbers, number) => {

    var nearest = { index: -1, value: Infinity }
    number = new Date(number) 

    for(index=0; index < ranges_numbers.length; index++) {    

        fromDist = number- new Date(ranges_numbers[index].from)
        toDist = number - new Date(ranges_numbers[index].to)

        if (fromDist > 0 && toDist < 0) {
            nearest = { index: index }
            break
        }
        
        fromAbsDist = Math.abs(fromDist)
        toAbsDist = Math.abs(toDist)
        
        absMinDist = fromAbsDist < toAbsDist ? fromAbsDist : toAbsDist

        elementAbsMinDist = { index: index, value: absMinDist }

        nearest = elementAbsMinDist.value <= nearest.value ? elementAbsMinDist : nearest
    }

    return ranges_numbers[nearest.index]
}

module.exports = { getForecast, getNextRain }