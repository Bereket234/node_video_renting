const auth= require('../middelwears/auth')
const {Genre, validate}=  require('../models/genre.model')
const express= require('express')
const admin = require('../middelwears/admin')
const router= express.Router()


router.get('/', async (req, res)=>{ 
   const genres= await Genre.find()
   res.send(genres)
})

router.get('/:id',async (req, res)=>{
    const genre= await Genre.findById(req.params.id)
    res.send(genre)
})

router.post('/',auth, (req, res)=> {
    
    const {error}= validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    const genre= new Genre({
        name: req.body.name
    }) 
    genre.save()
    res.send(genre)
})

router.put('/:id', auth, (req, res)=> {
    const {error}= validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    Genre.findByIdAndUpdate(req.params.id, 
        {name:req.body.name},
        {new: true})
        .then(result=> res.send(result))
        .catch(err => res.status(404).send(err))
})

router.delete('/:id', [auth, admin], (req, res)=> {
    Genre.findByIdAndRemove(req.params.id)
        .then(result=> res.send(result))
        .catch(err=> res.status.send(err))
})



module.exports= router