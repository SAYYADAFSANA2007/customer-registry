import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [agents, setAgents] = useState([])
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('complaints')
  const [showAgentPassword, setShowAgentPassword] = useState(false)

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchComplaints()
    fetchAgents()
    fetchCustomers()
  }, [])

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/complaints/all', { headers })
      setComplaints(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAgents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/agents', { headers })
      setAgents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users', { headers })
      setCustomers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAssign = async (complaintId, agentId) => {
    try {
      await axios.put(`http://localhost:8000/api/complaints/${complaintId}`, {
        status: 'in-progress',
        agent: agentId
      }, { headers })
      setMessage('Complaint assigned successfully')
      fetchComplaints()
    } catch (err) {
      setMessage('Failed to assign complaint')
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

  const total = complaints.length
  const resolved = complaints.filter(c => c.status === 'resolved').length
  const pending = complaints.filter(c => c.status === 'open').length
  const inProgress = complaints.filter(c => c.status === 'in-progress').length

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, background: '#4A90E2', color: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{total}</h3><p>Total</p>
        </div>
        <div style={{ flex: 1, background: '#e74c3c', color: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{pending}</h3><p>Open</p>
        </div>
        <div style={{ flex: 1, background: '#f39c12', color: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{inProgress}</h3><p>In Progress</p>
        </div>
        <div style={{ flex: 1, background: '#27ae60', color: '#fff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{resolved}</h3><p>Resolved</p>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <button style={tabStyle('complaints')} onClick={() => setActiveTab('complaints')}>Complaints</button>
        <button style={tabStyle('customers')} onClick={() => setActiveTab('customers')}>Customers</button>
        <button style={tabStyle('agents')} onClick={() => setActiveTab('agents')}>Agents</button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {activeTab === 'complaints' && (
        <div>
          <h3>All Complaints</h3>
          {complaints.length === 0 ? <p>No complaints found.</p> : complaints.map(c => (
            <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <p>Status: <strong style={{ color: c.status === 'resolved' ? 'green' : c.status === 'in-progress' ? 'orange' : 'red' }}>{c.status}</strong></p>
              {c.status === 'open' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <select onChange={e => handleAssign(c._id, e.target.value)} style={{ padding: '0.5rem', marginRight: '0.5rem' }}>
                    <option value=''>-- Assign to Agent --</option>
                    {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'customers' && (
        <div>
          <h3>All Customers</h3>
          {customers.length === 0 ? <p>No customers found.</p> : customers.map(c => (
            <div key={c._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Name:</strong> {c.name}</p>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Phone:</strong> {c.phone || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}

     {activeTab === 'agents' && (
  <div>
    <h3>Register New Agent</h3>
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
      <input id="agentName" placeholder="Name" style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <input id="agentEmail" placeholder="Email" style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
      <div style={{ position: 'relative' }}>
  <input 
    id="agentPassword" 
    placeholder="Password" 
    type={showAgentPassword ? 'text' : 'password'} 
    style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.5rem', boxSizing: 'border-box' }} 
  />
  <span 
    onClick={() => setShowAgentPassword(!showAgentPassword)} 
    style={{ position: 'absolute', right: '0.75rem', top: '30%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
    {showAgentPassword ? '🙈' : '👁️'}
  </span>
</div>
      <button onClick={async () => {
        const name = document.getElementById('agentName').value
        const email = document.getElementById('agentEmail').value
        const password = document.getElementById('agentPassword').value
        try {
          await axios.post('http://localhost:8000/api/agents/register', { name, email, password })
          setMessage('Agent registered successfully!')
          fetchAgents()
        } catch (err) {
          setMessage('Failed to register agent')
        }
      }} style={{ padding: '0.5rem 1rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Register Agent</button>
    </div>
    <h3>All Agents</h3>
    {agents.length === 0 ? <p>No agents found.</p> : agents.map(a => (
      <div key={a._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
        <p><strong>Name:</strong> {a.name}</p>
        <p><strong>Email:</strong> {a.email}</p>
      </div>
    ))}
  </div>
)}
    </div>
  )
}

export default AdminDashboard