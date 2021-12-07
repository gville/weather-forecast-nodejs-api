const app = require('./app')
require('./database')

// start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})
