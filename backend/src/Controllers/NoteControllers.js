import express from "express"
import Notes from "../../Models/noteModels.js"



export const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find().sort({createdAt:-1}) //newet notes first
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getAllNotes Controller", error);
        res.status(500).json({message: "internal Server error"})
    }
}

export const getNotesById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id)
        if(!note){
            res.status(401).json({success: false, message: "Note not found"})
           }
        res.status(200).json(note)
    } catch (error) {
        console.log("Error in getNotesById Controller", error);
        res.status(500).json({message: "internal Server error"})
    }
}




export const createNotes = async (req, res) => {
    try {
        const {title, content} = req.body
        const newNotes = new Notes({title: title, content: content})
        await newNotes.save()
        res.status(200).json({success: true, message: "Note created successfully"})
    } catch (error) {
        console.log("Error in createNotes Controller", error);
        res.status(500).json({message: "internal Server error"})
    }
}


export const updateNotes = async (req, res) => {
    try {
        const {title, content} = req.body;
       const updateNote = await Notes.findByIdAndUpdate(
        req.params.id,
         {title, content},
         {new: true}
        )

       if(!updateNote){
        res.status(401).json({success: false, message: "Note not found"})
       }

        res.status(201).json({success: true, message: "Note updated Successfully"})

    } catch (error) {
        console.log("Error in updateNotes Controller", error);
        res.status(500).json({message: "internal Server error"})
    }
}

export const deleteNotes = async (req, res) => {
    try {
       const deletedNotes = await Notes.findByIdAndDelete(req.params.id)

       if(!deletedNotes){
        res.status(401).json({success: false, message: "Note not found"})
       }
       res.status(201).json({success: true, message: "Note deleted Successfully"})

    } catch (error) {
        console.log("Error in deleteNotes Controller", error)
        res.status(500).json({message: "internal Server error"})
    }
}