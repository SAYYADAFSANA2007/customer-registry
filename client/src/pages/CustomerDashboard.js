import React, { useState } from 'react'
import axios from 'axios'

function CustomerDashboard() {
  const [complaint, setComplaint] = useState({ title: '', description: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8000/api/complaints', complaint, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Complaint submitted successfully!')
      setComplaint({ title: '', description: '' })
    } catch (err) {
      setMessage('Failed to submit complaint')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Customer Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>
      <h3>Raise a Complaint</h3>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label>
          <input type='text' name='title' value={complaint.title} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description</label>
          <textarea name='description' value={complaint.description} onChange={handleChange} required rows={4} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <button type='submit' style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Submit Complaint</button>
      </form>
    </div>
  )
}

export default CustomerDashboard