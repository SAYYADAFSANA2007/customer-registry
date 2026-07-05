const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const customerRoutes = require('./routes/customerRoutes')
const complaintRoutes = require('./routes/complaintRoutes')
const authRoutes = require('./routes/authRoutes')
const agentRoutes = require('./routes/agentRoutes')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/complaints', complaintRoutes)
app.use('/api/agents', agentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/categories', categoryRoutes)

app.get('/', (req, res) => {
  res.send('Customer Registry Server is running')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app