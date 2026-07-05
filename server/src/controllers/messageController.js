const Communication = require('../models/Communication')

const sendMessage = async (req, res) => {
  try {
    const { complaint, sender, message } = req.body
    const comm = await Communication.create({ complaint, sender, message })
    res.status(201).json({ message: 'Message sent', comm })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await Communication.find({ complaint: req.params.complaintId })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { sendMessage, getMessages }