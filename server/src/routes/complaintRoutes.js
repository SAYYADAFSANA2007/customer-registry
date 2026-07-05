const express = require('express')
const router = express.Router()
const { createComplaint, getComplaints, getAllComplaints, updateComplaint } = require('../controllers/complaintController')

router.post('/', createComplaint)
router.get('/', getComplaints)
router.get('/all', getAllComplaints)
router.put('/:id', updateComplaint)

module.exports = router