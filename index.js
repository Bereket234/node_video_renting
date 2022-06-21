const express= require('express')
const winston = require('winston')
const app = express()

require('./startup/logging')()
require("./startup/cors")(app);
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

port= process.env.PORT || 5000

app.listen(port, ()=> winston.info(`app listening on port ${port}`))