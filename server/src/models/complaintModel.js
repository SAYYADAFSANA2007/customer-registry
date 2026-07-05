const mongoose = require('mongoose')

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  feedback: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true })

module.exports = mongoose.model('Complaint', complaintSchema)