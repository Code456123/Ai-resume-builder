import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ai-resume-builder-kbai.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: data.data.name,
          email: data.data.email
        }));
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Please login to continue</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="✉️  Email id"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="🔒  Password"
              required
            />
          </div>
          <p className="forgot-password" onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>
            Forget password?
          </p>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? 
          <span onClick={() => navigate('/signup')} className="link-text">
            {' '}click here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;