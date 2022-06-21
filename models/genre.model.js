const Joi= require('joi')
const mongoose= require('mongoose')


const genreSchema= new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 3
    }
})

const Genre = mongoose.model('Genre', genreSchema)

function validateGenre(obj){
    const schema= Joi.object({
        name: Joi.string().min(3).required()
    })
     
    return schema.validate(obj)
}

exports.Genre= Genre
exports.validate= validateGenre
exports.genreSchema= genreSchema