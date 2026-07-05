const Complaint = require('../models/complaintModel')

const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body
    const customerId = req.query.customerId || req.body.customerId
    const complaint = await Complaint.create({ title, description, customer: customerId })
    res.status(201).json({ message: 'Complaint created', complaint })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ customer: req.query.customerId })
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
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
module.exports = { createComplaint, getComplaints, updateComplaint, getAllComplaints }