const Joi= require('joi')
Joi.objdectId= require('joi-objectid')(Joi)
const mongoose= require('mongoose')
const {genreSchema}= require('./genre.model')


const moviesSchema= new mongoose.Schema({
    title: {
        type:String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength:255
    },
    genre:{
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true
    }
})

const Movie = mongoose.model('Movie', moviesSchema)

function validateMovie(obj){
    const schema= Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genreId: Joi.objdectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    })
     
    return schema.validate(obj)
}

exports.Movie= Movie
exports.validate= validateMovie