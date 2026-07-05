const Agent = require('../models/agentModel')
const bcrypt = require('bcryptjs')

const registerAgent = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const existing = await Agent.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already exists' })
    const hashed = await bcrypt.hash(password, 10)
    const agent = await Agent.create({ name, email, password: hashed })
    res.status(201).json({ message: 'Agent registered successfully', agent })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password')
    res.json(agents)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).select('-password')
    if (!agent) return res.status(404).json({ message: 'Agent not found' })
    res.json(agent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { registerAgent, getAgents, getAgentById }