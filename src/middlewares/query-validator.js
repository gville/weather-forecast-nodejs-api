class ApiError {
    static badRequest(msg) {
        const err = new Error(msg)
        err.status = 400
        return err
    }    
}

const queryValidator = (req, res, next) => {
    
    const location = req.query.get('location')
    const datetime = req.query.get('datetime')
    
    if (typeof location !== 'string') {
        const err = ApiError.badRequest('Missing or invalid parameter: location')
        next(err)
    } else if (!isIsoDate(datetime)) {
        const err = ApiError.badRequest('Missing or invalid parameter: datetime')
        next(err)
    } else {
        next()
    }
}

const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str); 
    return d.toISOString()===str;
  }

module.exports = queryValidator