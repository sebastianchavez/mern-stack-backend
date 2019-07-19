const userCtrl = {}
const User = require('../models/User')

userCtrl.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).send({message:`Error: ${err.message}`})
    }
}
userCtrl.createUser = async (req, res) => {
    try {
        const { username } = req.body
        const newUser = new User({username})
        await newUser.save()
        res.send({message: `Usuario creado`})
    } catch (err) {
        res.status(500).send({message:`Error: ${err.message}`})
    }
}
userCtrl.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message: `Usuario eliminado`})
    } catch (err) {
        res.status(500).send({message:`Error: ${err.message}`})
    }
}
userCtrl.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).send({message:`Error: ${err.message}`})
    }
}
userCtrl.updateUser = async (req, res) => {
    try {
        await User.findOneAndUpdate({_id: req.params.id}, req.body)
        res.json({message: `Usuario actualizado`})
    } catch (err) {
        res.status(500).send({message:`Error: ${err.message}`})
    }
}

module.exports = userCtrl