const mongoose = require('mongoose')

const communicationSchema = new mongoose.Schema({
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true
  },
  sender: {
    type: String,
    enum: ['customer', 'agent'],
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Communication', communicationSchema)