const Customer = require('../models/customerModel')

const getUsers = async (req, res) => {
  try {
    const users = await Customer.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
    res.json({ message: 'Profile updated', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getUsers, getUserById, updateUser }