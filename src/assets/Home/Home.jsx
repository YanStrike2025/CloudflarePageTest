import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          'https://tech-products-api.yyupanquij.workers.dev/main',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Unauthorized');
        }

        setUser(data.user);

      } catch (err) {
        setError(err.message);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="home-container">
      {error && <p>{error}</p>}

      {user && (
        <>
          <h1>Bienvenido</h1>
          <p>{user.id}</p> {/* puedes cambiar a email si lo agregas al JWT */}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Home;