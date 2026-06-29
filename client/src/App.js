import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AgentDashboard from './pages/AgentDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/customer' element={<CustomerDashboard />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/agent' element={<AgentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App