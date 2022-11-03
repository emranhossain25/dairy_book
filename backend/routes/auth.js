//require('dotenv').config()
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser')
const jwt_secret = "iamawebdevoperiamacomputarscienceenginer";
const { body, validationResult } = require('express-validator');
// create a user using post :/api/auth/createuser for registration
router.post('/createuser',[
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must be 8 charesers').isLength({ min: 5 }),
    body('phone','énter a valid phone number').isLength({ min: 5 })
],async(req, res) => {
    let success = false
    try{
        // the  asnc function we create wait
        const errors = validationResult(req);
        // if error happend
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // find the email from database
    let user = await User.findOne({email: req.body.email})
    if(user){// if email already register then send this status
        return res.status(404).json({success,error: 'the email already exits'})
    }

    //password hashing
    const salt = await bcrypt.genSalt(10); // await because its returns promise
    const hashpassword = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        phone: req.body.phone,
    });
    //res.json(user)
    const data = {
        user:{// create a id for token
            id: user.id
        }
    }

    const authtoken = jwt.sign(data,jwt_secret);
    success=true
    res.json({success,authtoken})
    //  res.json(user)
    //res.send(req.body);
}
    catch(error){
        console.error(error)
        res.status(404).send('some error occured')
    }
    
})

// create a routes for login
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req, res) => {
    let success = false
    try {

        // the  asnc function we create wait
        const errors = validationResult(req);
        // if error happend
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    // now fetch the email and password from mongodb

    const {email,password} = req.body;

    let user = await User.findOne({email})
    if(!user){
        success=false
        return res.status(404).send("please try with valid details")
    }

    // now compare the password
    const comparepaasword = await bcrypt.compare(password,user.password);
    // lets check the password
    if(!comparepaasword){
        success=false
        return res.status(404).json({success,error:"please try with valid details"})
    }

    //now pass the id and create a jwt token

    const data = {
        user:{// create a id for token
            id: user.id
        }
    }

    const authtoken = jwt.sign(data,jwt_secret);
    success=true
    res.json({success,authtoken})

    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})


// getuser routes for fetching the data from jsonwebtoken

router.post('/getuser',fetchuser,async(req, res) => {
    try {
        // fetch the user
        userId = req.user.id
        //find the user id
        const user= await User.findById(userId).select("-password")// select all expect password
        //now send respond
        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})

module.exports = router;