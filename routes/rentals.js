const {Rental, validate}=  require('../models/rentals.model')
const {Customer}= require('../models/customer.model')
const {Movie}= require('../models/movie.model')
const auth= require('../middelwears/auth')

const Fawn= require('fawn')
const express= require('express')
const router= express.Router()

Fawn.init('mongodb://localhost/vidly')

router.get('/', (req, res)=>{ 
    Rental.find()  
        .sort('-dateOut')
        .then(result=> res.send(result))
})

router.get('/:id', (req, res)=>{
    Rental.findById(req.params.id)
        .then((rental)=> res.send(rental))
        .catch(err=> res.status.send(err))
})

router.post('/', auth, async (req, res)=> {
    
    const {error}= validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const movie= await Movie.findById(req.body.movieId)
    if(!movie) return res.status(404).send('movie not found')
    
    
    const customer= await Customer.findById(req.body.customerId)
    if(!customer)return res.status(404).send('customer not foud!!')
    

    if(movie.numberInStock ===0)return res.send('there is not suh a movie in stock')

    const rental= new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
        new Fawn.Task()
            .save('rentals', rental)
            .update("movies", { _id: movie._id}, {
                $inc: {numberInStock: -1}
            })
            .run()
            .then(result=> res.send(result))
            .catch(e=> console.log(e))
})

// router.put('/:id', (req, res)=> {
//     const {error}= validate(req.body)
//     if (error){
//         return res.status(400).send(error.details[0].message)
//     }

//     Rental.findByIdAndUpdate(req.params.id, 
//         {rental:req.body.rental},
//         {new: true})
//         .then(result=> res.send(result))
//         .catch(err => res.status(404).send(err))
// })

router.delete('/:id', auth, (req, res)=> {
    Rental.findByIdAndRemove(req.params.id)
        .then(result=> res.send(result))
        .catch(err=> res.status.send(err))
})

module.exports= router