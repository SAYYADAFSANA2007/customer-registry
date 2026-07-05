const express = require('express')
const router = express.Router()
const { registerAgent, getAgents, getAgentById } = require('../controllers/agentController')

router.post('/register', registerAgent)
router.get('/', getAgents)
router.get('/:id', getAgentById)

module.exports = router