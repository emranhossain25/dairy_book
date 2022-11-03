const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,// pass the of the  useer
        ref: 'user' // using user models ref model
    },
    title:{
       type: String,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },

    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('notes',NotesSchema);