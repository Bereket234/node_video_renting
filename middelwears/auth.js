
const jwt= require('jsonwebtoken')

module.exports=  function (req, res, next){
    const token= req.header('x-auth-token')
    if(!token) return res.status(401).send('invalid cridentials no token attached')
    try{
        const decoded= jwt.verify(token, 'jwtSecretKey')
        req.user= decoded
        next()
    }catch(e){
        res.status(400).send('bad request')
    }

}