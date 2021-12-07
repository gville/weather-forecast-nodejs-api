const errorHandler = (err, req, res, next) => {

    //const error = process.env.NODE_ENV === undefined ? err : {}
    const status = err.status || 500

    // respond to client
    res.status(status).json({
        status: status,
        message: err.message
    })

    console.error(err)
}

module.exports = errorHandler