import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/customers/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/customer')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Customer Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <button type='submit' style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Don't have an account? <a href='/register'>Register</a></p>
    </div>
  )
}

export default Login