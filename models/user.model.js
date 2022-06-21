const jwt= require('jsonwebtoken')
const Joi= require('joi')
const mongoose= require('mongoose')


const userSchema= new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:250
    },
    password: {
        type: String,
        minlength:5,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
})

userSchema.methods.generateAuthToken= function() {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin, name: this.name}, 'jwtSecretKey')
}

const User = mongoose.model('User', userSchema)

function validateUser(obj){
    const schema= Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    })
     
    return schema.validate(obj)
}

exports.User= User
exports.validate= validateUser