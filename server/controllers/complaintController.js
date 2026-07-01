const Complaint = require('../models/complaintModel')

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body
    const complaint = await Complaint.create({ title, description, customer: req.body.customerId || '000000000000000000000000' })
    res.status(201).json({ message: 'Complaint created', complaint })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Complaint updated', complaint })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createComplaint, getComplaints, updateComplaint }