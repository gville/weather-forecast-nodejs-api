const path = require('path');
const YAML = require('yamljs');
var swagger_path =  path.resolve(__dirname,'../doc/weather-forecast-api.yml');
const swaggerDocument = YAML.load(swagger_path);

module.exports = swaggerDocument