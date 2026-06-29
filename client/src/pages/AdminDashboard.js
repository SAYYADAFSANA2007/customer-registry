import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminDashboard() {
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
      setComplaints(res.data)
    } catch (err) {
      setMessage('Failed to load complaints')
    }
  }

  const handleAssign = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8000/api/complaints/${id}`, { status: 'in-progress' }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Complaint assigned successfully')
      fetchComplaints()
    } catch (err) {
      setMessage('Failed to assign complaint')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <h3>All Complaints</h3>
      {complaints.length === 0 ? <p>No complaints found.</p> : (
        complaints.map(c => (
          <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <h4>{c.title}</h4>
            <p>{c.description}</p>
            <p>Status: <strong>{c.status}</strong></p>
            {c.status === 'open' && (
              <button onClick={() => handleAssign(c._id)} style={{ padding: '0.5rem 1rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Assign to Agent</button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default AdminDashboard