import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Our Platform</h1>
        <p className="home-subtitle">Get started with your journey today</p>
        <div className="home-buttons">
          <button 
            className="btn btn-login" 
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="btn btn-get-started" 
            onClick={() => navigate('/signup')}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
