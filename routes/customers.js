const {Customer, validate}= require('../models/customer.model')
const auth= require('../middelwears/auth')

const express= require('express')
const router= express.Router()

router.get('/', (req, res)=> {
    Customer.find()
        .then( result => res.send(result))
        .catch(err=> res.status(404).send(err)) 
})

router.get('/:id', (req, res)=> {
    Customer.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.status(404).send(err))
})

router.post('/', auth, async (req,res)=>{
    const {error}= validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message)
    let customer= new Customer({
        name:req.body.name, 
        phone: req.body.phone,
        isGold: req.body.isGold})
    try{
        customer = await customer.save()
        res.send(customer)
    }catch(e){
        console.log(e)
    }
   
})

router.put('/:id', auth, async (req, res)=> {
    const {error}= validate(req.body)
    if(error)
        return res.status(400).send(error.details[0].message)
    const {name, phone}= req.body
    const result= await Customer.findByIdAndUpdate(req.params.id, {
        name,
        phone
    }, {new: true})
    if(!result)
        return res.status(400).send('Unknown user')
    res.send(result)
})

router.delete('/:id', auth, (req,res)=> {
    Customer.findByIdAndRemove(req.params.id)
        .then(user=> res.send(user))
        .catch(err=> res.status(404).send(err))
})


module.exports= router