const notFound = (req, res, next) => {
    
    const err = new Error('Not found')
    
    err.status = 404
    
    next(err)
}

module.exports = notFound