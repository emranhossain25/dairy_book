//require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwt_secret = "iamawebdevoperiamacomputarscienceenginer";

const fetchuser = (req,res,next) =>{
    //get the user from jwt token and add the lid
    const token = req.header('auth-token');
    //if token is not prrsent

    if(!token){
        res.status(401).send({error:"please authenticate with a valid token"})
    }
    // fetch id and details

    const data = jwt.verify(token,jwt_secret)// verify  //
    req.user = data.user
    next()
}

module.exports = fetchuser;