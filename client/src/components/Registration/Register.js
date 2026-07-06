import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://customer-registry-backend.onrender.com/api/customers/register', form)
      setSuccess('Registered successfully! Redirecting to login...')
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input type='text' name='name' value={form.name} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input type='email' name='email' value={form.email} onChange={handleChange} required style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Phone</label>
          <input type='text' name='phone' value={form.phone} onChange={handleChange} style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
        </div>
        <div style={{ marginBottom: '1rem', position: 'relative' }}>
  <label>Password</label>
  <div style={{ position: 'relative' }}>
    <input 
      type={showPassword ? 'text' : 'password'} 
     value={form.password}
     onChange={handleChange}
     name='password'
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
        <button type='submit' style={{ width: '100%', padding: '0.75rem', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Register</button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>Already have an account? <a href='/'>Login</a></p>
    </div>
  )
}

export default Register