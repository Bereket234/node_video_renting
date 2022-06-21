const Joi= require('joi')
Joi.objectId= require('joi-objectid')(Joi)
const mongoose= require('mongoose')


const rentalSchema= new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required:true,
                minlength:3,
                maxlength:255
            },
            isGold: {
                type:Boolean,
                required:true,
            },
            phone: {
                type: String,
                required: true,
                minlength: 3,
                maxlength:50
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type:String,
                required: true,
                minlength:3,
                maxlength:255,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min:0,
                max:255
            }
        })
    },
    dataOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    }, 
    rentalFee: {
        type: Number,
        min:0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

function validateRental(obj){
    const schema= Joi.object({
       customerId: Joi.objectId().required(),
       movieId: Joi.objectId().required(),
    })
     
    return schema.validate(obj)
}

exports.Rental= Rental
exports.validate= validateRental