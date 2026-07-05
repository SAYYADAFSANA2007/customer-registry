const Customer = require('../models/customerModel')
const Agent = require('../models/agentModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    let user = null

    if (role === 'customer') {
      user = await Customer.findOne({ email })
    } else if (role === 'agent') {
      user = await Agent.findOne({ email })
    } else if (role === 'admin') {
      if (email === 'admin@registry.com' && password === 'admin123') {
        const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ message: 'Login successful', token, role: 'admin' })
      }
      return res.status(400).json({ message: 'Invalid admin credentials' })
    }

    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ message: 'Login successful', token, role })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { login }