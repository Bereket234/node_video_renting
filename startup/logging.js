require('express-async-errors')
const winston=  require('winston')
require('winston-mongodb')

module.exports= function(){
    
    // winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/vidly', useUnifiedTopology: true}))
    winston.add(new winston.transports.File({filename: 'logfile.log'}))

//     winston.exceptions.handle(new winston.transports.File({filename: 'logfile.log'}))
//     winston.rejections.handle(new winston.transports.File({filename: 'logfile.log'}))
}

