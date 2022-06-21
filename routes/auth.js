const express = require('express')
const jwt= require('jsonwebtoken')
const Joi= require('joi')
const bcrypt=require('bcrypt')
const { User }= require('../models/user.model')

const router= express.Router()

router.post('/', async (req, res)=> {
    const {error}= validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user= await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Wrong email or password.')

    const result= await bcrypt.compare(req.body.password, user.password)
    if(!result) return res.status(400).send('Wrong email or password.')

    res.send(user.generateAuthToken())

})

function validate (user){
    const schema= Joi.object({
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required()
    })

    return schema.validate(user)
}

module.exports= router