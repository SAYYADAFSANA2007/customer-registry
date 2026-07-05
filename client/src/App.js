import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Registration/Register'
import CustomerDashboard from './components/User/CustomerDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import AgentDashboard from './components/Agent/AgentDashboard'

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