//require('dotenv').config()
const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
// fetch all notes from the databse 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{// pass middle ware for fetch the user
    try {
        const notes = await Notes.find({user: req.user.id})// fetch all notes for the given user
        res.json(notes)// now send the response
    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})


//  now create the routes for post the all notes 

router.post('/addnotes',fetchuser,[
    // express validation
    body('title','title should be minimum 3 leters').isLength({ min: 3 }),
    body('description','description should be minimum 5 letters').isLength({ min: 5 }),
],async(req,res)=>{

    try {
        const {title,description,tag} = req.body // destruction method for assinging the value
    //Destructuring Assignment is a JavaScript expression that allows to unpack values from arrays, or properties from objects, 
    //into distinct variables data can be extracted from arrays, objects, nested objects and assigning to variables.
    // if there is error happend then show this error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // new notes contain for object\
    // for saving the database
    const note = new Notes({
        title,description,tag,user: req.user.id
    })

    const savedata  = note.save(); // save the into database
    res.json(savedata)// now send the resposnse
    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})


// routes for update notes using put request

router.put('/updatenotes/:id',fetchuser,async(req,res)=>{// its take 4 parametar 
    try {
        // usnig destrction methods'
        const {title,description,tag} = req.body;
        //now create a new objexct
        let newnotes = {};
        // check the all condition 
        if(title){// title is presnt pthe update the title
            newnotes.title=title//  set the new title
        }
        if(description){// description is presnt pthe update the title
            newnotes.description=description//  set the new description
        }
        if(tag){// title is presnt pthe update the title
            newnotes.tag=tag//  set the new title
        }

        // now find the notes an update it
        let note = await Notes.findById(req.params.id)// the updated id
        // now check the
        if(!note){// if no notes found
            return res.status(404).send("note not found")
        }
        // now check the id same or not

        if(note.user.toString()!== req.user.id){// note.user.toString() its give us the id 
            return res.status(501).send("not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnotes},{new: true})//{new: true} its allow new notes
        //{$set: newnotes} its set the notes
        res.json({note})
    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})

//now create the delete routes using delete routes

router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    try {
        // now the id which u want to delete
        let note = await Notes.findById(req.params.id)//// the updated id
        if(!note){// if no notes found
            return res.status(404).send("note not found")
        }
        // now check the id same or not

        if(note.user.toString()!== req.user.id){// note.user.toString() its give us the id 
            return res.status(501).send("not allowed")
        }

        // now delete the function 

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"your notes has been deleted successfully", note: note})
        
    } catch (error) {
        console.error(error)
        res.status(404).send('some error occured')
    }
})

module.exports = router;