import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('customer')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', { email, password, role })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('userId', res.data.userId)
      if (res.data.role === 'customer') navigate('/customer')
      else if (res.data.role === 'agent') navigate('/agent')
      else if (res.data.role === 'admin') navigate('/admin')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Customer Registry Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
            <option value='customer'>Customer</option>
            <option value='agent'>Agent</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
  <label>Password</label>
  <div style={{ position: 'relative' }}>
    <input 
      type={showPassword ? 'text' : 'password'} 
      value={password} 
      onChange={e => setPassword(e.target.value)} 
      required 
      style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }} 
    />
    <span 
      onClick={() => setShowPassword(!showPassword)} 
      style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
      {showPassword ? '🙈' : '👁️'}
    </span>
  </div>
</div>
        <button type='submit' style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Don't have an account? <a href='/register'>Register</a></p>
    </div>
  )
}

export default Login