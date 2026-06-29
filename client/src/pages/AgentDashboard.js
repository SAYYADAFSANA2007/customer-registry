import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AgentDashboard() {
  const [complaints, setComplaints] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8000/api/complaints', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComplaints(res.data.filter(c => c.status === 'in-progress'))
    } catch (err) {
      setMessage('Failed to load complaints')
    }
  }

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8000/api/complaints/${id}`, { status: 'resolved' }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Complaint resolved successfully')
      fetchComplaints()
    } catch (err) {
      setMessage('Failed to resolve complaint')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Agent Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <h3>Assigned Complaints</h3>
      {complaints.length === 0 ? <p>No complaints assigned.</p> : (
        complaints.map(c => (
          <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h4>{c.title}</h4>
            <p>{c.description}</p>
            <p>Status: <strong>{c.status}</strong></p>
            <button onClick={() => handleResolve(c._id)} style={{ padding: '0.5rem 1rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Mark as Resolved</button>
          </div>
        ))
      )}
    </div>
  )
}

export default AgentDashboard