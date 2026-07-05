import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CustomerDashboard() {
  const [complaint, setComplaint] = useState({ title: '', description: '' })
  const [complaints, setComplaints] = useState([])
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('raise')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' })
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' })

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
  fetchComplaints()
  fetchProfile()
}, [])

  const fetchComplaints = async () => {
  try {
    const userId = localStorage.getItem('userId')
    const res = await axios.get(`http://localhost:8000/api/complaints?customerId=${userId}`, { headers })
    setComplaints(res.data)
  } catch (err) {
    console.log(err)
  }
}
const fetchProfile = async () => {
  try {
    const userId = localStorage.getItem('userId')
    const res = await axios.get(`http://localhost:8000/api/users/${userId}`, { headers })
    setProfile({ name: res.data.name, email: res.data.email, phone: res.data.phone || '' })
  } catch (err) {
    console.log(err)
  }
}

  const fetchMessages = async (complaintId) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/messages/${complaintId}`, { headers })
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitComplaint = async (e) => {
  e.preventDefault()
  try {
    const userId = localStorage.getItem('userId')
    await axios.post(`http://localhost:8000/api/complaints?customerId=${userId}`, complaint, { headers })
    setMessage('Complaint submitted successfully!')
    setComplaint({ title: '', description: '' })
    fetchComplaints()
  } catch (err) {
    setMessage('Failed to submit complaint')
  }
}

  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/messages', {
        complaint: selectedComplaint._id,
        sender: 'customer',
        message: chatMessage
      }, { headers })
      setChatMessage('')
      fetchMessages(selectedComplaint._id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFeedback = async (complaintId) => {
    try {
      await axios.put(`http://localhost:8000/api/complaints/${complaintId}`, {
        feedback: feedback.comment,
        rating: feedback.rating
      }, { headers })
      setMessage('Feedback submitted!')
      fetchComplaints()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
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
        <h2>Customer Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button style={tabStyle('raise')} onClick={() => setActiveTab('raise')}>Raise Complaint</button>
        <button style={tabStyle('mycomplaints')} onClick={() => setActiveTab('mycomplaints')}>My Complaints</button>
        <button style={tabStyle('chat')} onClick={() => setActiveTab('chat')}>Chat</button>
        <button style={tabStyle('profile')} onClick={() => setActiveTab('profile')}>Profile</button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {activeTab === 'raise' && (
        <form onSubmit={handleSubmitComplaint}>
          <h3>Raise a Complaint</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>Title</label>
            <input type='text' value={complaint.title} onChange={e => setComplaint({ ...complaint, title: e.target.value })} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Description</label>
            <textarea value={complaint.description} onChange={e => setComplaint({ ...complaint, description: e.target.value })} required rows={4} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <button type='submit' style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Submit Complaint</button>
        </form>
      )}

      {activeTab === 'mycomplaints' && (
        <div>
          <h3>My Complaints</h3>
          {complaints.length === 0 ? <p>No complaints found.</p> : complaints.map(c => (
            <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <p>Status: <strong style={{ color: c.status === 'resolved' ? 'green' : c.status === 'in-progress' ? 'orange' : 'red' }}>{c.status}</strong></p>
              {c.status === 'resolved' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <label>Rating: </label>
                  <select value={feedback.rating} onChange={e => setFeedback({ ...feedback, rating: e.target.value })} style={{ marginLeft: '0.5rem', marginRight: '1rem' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <input placeholder='Your feedback...' value={feedback.comment} onChange={e => setFeedback({ ...feedback, comment: e.target.value })} style={{ padding: '0.25rem', marginRight: '0.5rem' }} />
                  <button onClick={() => handleFeedback(c._id)} style={{ padding: '0.25rem 0.75rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'chat' && (
        <div>
          <h3>Chat with Agent</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>Select Complaint: </label>
            <select onChange={e => {
              const c = complaints.find(c => c._id === e.target.value)
              setSelectedComplaint(c)
              if (c) fetchMessages(c._id)
            }} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
              <option value=''>-- Select --</option>
              {complaints.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>
          {selectedComplaint && (
            <div>
              <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', height: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                {messages.length === 0 ? <p>No messages yet.</p> : messages.map((m, i) => (
                  <div key={i} style={{ marginBottom: '0.5rem', textAlign: m.sender === 'customer' ? 'right' : 'left' }}>
                    <span style={{ background: m.sender === 'customer' ? '#4A90E2' : '#eee', color: m.sender === 'customer' ? '#fff' : '#333', padding: '0.25rem 0.75rem', borderRadius: '12px', display: 'inline-block' }}>{m.message}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input value={chatMessage} onChange={e => setChatMessage(e.target.value)} placeholder='Type a message...' required style={{ flex: 1, padding: '0.5rem', marginRight: '0.5rem' }} />
                <button type='submit' style={{ padding: '0.5rem 1rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Send</button>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div>
          <h3>My Profile</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name</label>
            <input type='text' value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type='email' value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Phone</label>
            <input type='text' value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <button
  onClick={async () => {
    const userId = localStorage.getItem('userId')
    try {
      await axios.put(`http://localhost:8000/api/users/${userId}`, profile, { headers })
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile')
    }
  }}
  style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
  Update Profile
</button>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboard