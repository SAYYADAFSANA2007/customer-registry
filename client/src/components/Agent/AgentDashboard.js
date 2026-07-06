import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AgentDashboard() {
  const [complaints, setComplaints] = useState([])
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('complaints')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState([])

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('https://customer-registry-backend.onrender.com/api/complaints/all', { headers })
      setComplaints(res.data.filter(c => c.status === 'in-progress'))
    } catch (err) {
      console.log(err)
    }
  }

  const fetchMessages = async (complaintId) => {
    try {
      const res = await axios.get(`https://customer-registry-backend.onrender.com/api/messages/${complaintId}`, { headers })
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleResolve = async (id) => {
    try {
      await axios.put(`https://customer-registry-backend.onrender.com/api/complaints/${id}`, { status: 'resolved' }, { headers })
      setMessage('Complaint resolved successfully')
      fetchComplaints()
    } catch (err) {
      setMessage('Failed to resolve complaint')
    }
  }

  const handleEscalate = async (id) => {
    try {
      await axios.put(`https://customer-registry-backend.onrender.com/api/complaints/${id}`, { status: 'open' }, { headers })
      setMessage('Complaint escalated back to admin')
      fetchComplaints()
    } catch (err) {
      setMessage('Failed to escalate complaint')
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://customer-registry-backend.onrender.com/api/messages', {
        complaint: selectedComplaint._id,
        sender: 'agent',
        message: chatMessage
      }, { headers })
      setChatMessage('')
      fetchMessages(selectedComplaint._id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  const tabStyle = (tab) => ({
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    background: activeTab === tab ? '#4A90E2' : '#eee',
    color: activeTab === tab ? '#fff' : '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  })

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Agent Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button style={tabStyle('complaints')} onClick={() => setActiveTab('complaints')}>Assigned Complaints</button>
        <button style={tabStyle('chat')} onClick={() => setActiveTab('chat')}>Chat with Customer</button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {activeTab === 'complaints' && (
        <div>
          <h3>Assigned Complaints</h3>
          {complaints.length === 0 ? <p>No complaints assigned.</p> : complaints.map(c => (
            <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <p>Status: <strong style={{ color: 'orange' }}>{c.status}</strong></p>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleResolve(c._id)} style={{ padding: '0.5rem 1rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Mark Resolved</button>
                <button onClick={() => handleEscalate(c._id)} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Escalate</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'chat' && (
        <div>
          <h3>Chat with Customer</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>Select Complaint: </label>
            <select onChange={e => {
              const c = complaints.find(c => c._id === e.target.value)
              setSelectedComplaint(c)
              if (c) fetchMessages(c._id)
            }} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
              <option value="">-- Select --</option>
              {complaints.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>
          {selectedComplaint && (
            <div>
              <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', height: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                {messages.length === 0 ? <p>No messages yet.</p> : messages.map((m, i) => (
                  <div key={i} style={{ marginBottom: '0.5rem', textAlign: m.sender === 'agent' ? 'right' : 'left' }}>
                    <span style={{ background: m.sender === 'agent' ? '#4A90E2' : '#eee', color: m.sender === 'agent' ? '#fff' : '#333', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block' }}>{m.message}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  required
                  style={{ flex: 1, padding: '0.5rem', marginRight: '0.5rem' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Send</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AgentDashboard