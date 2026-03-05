import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loggin.css';

function Loggin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const start = Date.now(); // start timer

    try {
      const res = await fetch(
        'https://tech-products-api.yyupanquij.workers.dev/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    }

    // ensure loader appears at least 800ms
    const elapsed = Date.now() - start;

    if (elapsed < 800) {
      await new Promise((r) => setTimeout(r, 800 - elapsed));
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">

      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Verifying account...</p>
        </div>
      )}

      <div className={`login-container ${loading ? 'blurred' : ''}`}>
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p className="subtitle">Please login to continue</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            Login
          </button>

          <p
            className="register-link"
            onClick={() => !loading && navigate('/register')}
          >
            Create account
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loggin;