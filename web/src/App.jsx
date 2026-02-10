import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/auth';

// Simple style object to avoid over-engineering with CSS files
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' },
  card: { border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  link: { marginTop: '10px', color: '#007bff', textDecoration: 'none', fontSize: '14px' }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend uses @RequestParam for login
      const res = await axios.post(`${API_BASE}/login?email=${email}&password=${password}`);
      if (res.data === 'Login Successful') {
        localStorage.setItem('user', JSON.stringify({ email }));
        navigate('/profile');
      } else {
        alert(res.data);
      }
    } catch (err) {
      alert('Login failed. Is the backend running?');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <Link to="/signup" style={styles.link}>Don't have an account? Sign up</Link>
      </div>
    </div>
  );
};

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Backend uses @RequestBody User for register
      await axios.post(`${API_BASE}/register`, { name, email, password });
      alert('Signup Successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input style={styles.input} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Sign Up</button>
        </form>
        <Link to="/login" style={styles.link}>Already have an account? Login</Link>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p>Welcome back, Traveler.</p>
        <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
