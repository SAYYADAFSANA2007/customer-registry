import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Registration/Register'
import CustomerDashboard from './components/User/CustomerDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import AgentDashboard from './components/Agent/AgentDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/customer' element={<ProtectedRoute allowedRole='customer'><CustomerDashboard /></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute allowedRole='admin'><AdminDashboard /></ProtectedRoute>} />
        <Route path='/agent' element={<ProtectedRoute allowedRole='agent'><AgentDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App