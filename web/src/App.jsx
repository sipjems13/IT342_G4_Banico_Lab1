import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

document.body.style.margin = "0";

const API_BASE = 'http://localhost:8080/api/auth';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff'
  },
  card: {
    padding: '40px',
    width: '320px'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    border: '1px solid #000',
    fontSize: '14px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  link: {
    display: 'block',
    marginTop: '20px',
    color: '#000',
    textDecoration: 'none',
    fontSize: '13px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '30px'
  },
  text: {
    fontSize: '14px',
    margin: '10px 0'
  }
};

// Protected Route
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" replace />;
};

// Dashboard Layout
const DashboardLayout = ({ children }) => (
  <div>
    {children}
  </div>
);

// Login
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/login`, null, {
        params: { email, password }
      });
      if (res.data === 'Login Successful') {
        localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
        navigate('/profile', { replace: true });
      } else {
        alert(res.data);
      }
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Login</div>
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <Link to="/register" style={styles.link}>Don't have an account? Register</Link>
      </div>
    </div>
  );
};

// Register
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/register`, { name, email, password });
      localStorage.setItem('user', JSON.stringify({ email, name }));
      navigate('/profile', { replace: true });
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Register</div>
        <form onSubmit={handleRegister}>
          <input style={styles.input} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <Link to="/login" style={styles.link}>Already have an account? Login</Link>
      </div>
    </div>
  );
};

// Profile
const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`);
    } finally {
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Profile</div>
        <div style={styles.text}><strong>Name:</strong> {user?.name}</div>
        <div style={styles.text}><strong>Email:</strong> {user?.email}</div>
        <button style={styles.button} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

// App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
