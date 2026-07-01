const express = require('express')
const router = express.Router()
const { createComplaint, getComplaints, updateComplaint } = require('../controllers/complaintController')

router.post('/', createComplaint)
router.get('/', getComplaints)
router.put('/:id', updateComplaint)

module.exports = router