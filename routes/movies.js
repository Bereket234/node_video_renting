const {Movie, validate}=  require('../models/movie.model')
const auth= require('../middelwears/auth')
const admin= require('../middelwears/admin')
const express= require('express')
const { Genre } = require('../models/genre.model')
const router= express.Router()


router.get('/', (req, res)=>{ 
    Movie.find()  
        .then(result=> res.send(result))
})

router.get('/:id', (req, res)=>{
    Movie.findById(req.params.id)
        .then((movie)=> res.send(movie))
        .catch(err=> res.status.send(err))
})

router.post('/', auth, async (req, res)=> {

    const {error}= validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    
    
    const genre= await Genre.findById(req.body.genreId)

    const movie= new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }) 
    movie.save()
        .then(result => res.send(result))
        .catch(err => console.log(err))
    
})

router.put('/:id', auth, async (req, res)=> {
    const {error}= validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const genre=await Genre.findById(req.body.genreId)

    Movie.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        {new: true})
        .then(result=> res.send(result))
        .catch(err => res.status(404).send(err))
})

router.delete('/:id', [auth, admin], async (req, res)=> {
    const movie= await Movie.findByIdAndRemove(req.params.id)

    if(!movie)
       return res.status(404).send('movie not found')

    res.send(movie)
})



module.exports= router