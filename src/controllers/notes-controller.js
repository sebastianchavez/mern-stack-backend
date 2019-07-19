const notesCtrl = {}

const Note = require('../models/Note')

notesCtrl.getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.json({message: `Error: ${err.message}`}) 
    }
}

notesCtrl.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.json(note)
    } catch (err) {
        res.status(500).json({message: `Error: ${err.message}`}) 
    }
}

notesCtrl.createNote = async (req, res) => {
    try {
        let { title, content, author } = req.body
        let date = Date.now()
        const newNote = new Note({
            title,
            content,
            date,
            author
        })
        await newNote.save()
        res.json({message: `Nota guardada`})
    } catch (err) {
        res.status(500).json({message: `Error: ${err.message}`})        
    }
}

notesCtrl.updateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate({_id:req.params.id},req.body)
        res.send('Nota actualizada')
    } catch (err) {
        res.status(500).json({message: `Error: ${err.message}`}) 
    }
}

notesCtrl.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.send('Nota eliminada')
    } catch (err) {
        res.status(500).json({message: `Error: ${err.message}`}) 
    }
}


module.exports = notesCtrl