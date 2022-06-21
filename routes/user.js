const express = require('express')
const _= require('lodash')
const bcrypt=require('bcrypt')
const { User, validate}= require('../models/user.model')
const auth= require('../middelwears/auth')

const router= express.Router()

router.get('/me', auth, (req,res)=>{
    User.findById(req.user._id)
        .select('-password')
        .then(result=> res.send(result))
        .catch(e=> res.status(404).send('unknown user'))
})

router.post('/', async (req, res)=> {
    const {error}= validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user= await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('exisisting user')


    user= new User(_.pick(req.body, ['name', 'email', 'password']))

    const salt= await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(user.password, salt)

    await user.save()

    res
        .header('x-auth-token', user.generateAuthToken())
        .header('access-control-expose-headers', 'x-auth-token')
        .send (_.pick(user, ['name', 'email']))

})

module.exports= router