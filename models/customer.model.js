const mongoose= require('mongoose')
const Joi= require('joi')


const customerSchema= new mongoose.Schema({
    isGold: {
        type:Boolean,
        required: true,
        default: false
    },
    name: {
        type:String,
        required: true,
    },
    phone: {
        type:String,
        required: true,
        minlength:10,
        maxlength: 10
    }
})

const Customer= mongoose.model('Customer', customerSchema)

function validateCustomer(obj){
    const schema= Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean()
    })
    return schema.validate(obj)
}

exports.Customer= Customer
exports.validate= validateCustomer