import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    const start = Date.now();

    try {
      const res = await fetch(
        'https://tech-products-api.yyupanquij.workers.dev/auth/register',
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
        alert('Account created successfully');
        navigate('/');
      } else {
        alert(data.error || 'Registration failed');
      }

    } catch (err) {
      alert('Network error');
    }

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
          <p>Creating account...</p>
        </div>
      )}

      <div className={`login-container ${loading ? 'blurred' : ''}`}>
        <form
          className="login-card"
          onSubmit={handleRegister}
          autoComplete="off"
        >
          <h2>Create Account</h2>
          <p className="subtitle">Register to continue</p>

          <input
            type="email"
            name="user_email_register"
            placeholder="Email"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="user_password_register"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="user_confirm_password_register"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            Register
          </button>

          <p
            className="register-link"
            onClick={() => !loading && navigate('/')}
          >
            Back to login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;