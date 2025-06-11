import mongoose from "mongoose";

//create a schema

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }

},
{timestamps: true} //created at and updated at
 
)

const Notes = mongoose.model('Notes', notesSchema)

export default Notes