import { useState } from 'react';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: true,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previousForm) => ({
      ...previousForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = onLogin(formData.username.trim(), formData.password, formData.rememberMe);

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setErrorMessage('');
  };

  const handleDemoLogin = () => {
    setFormData({ username: 'admin', password: '1234', rememberMe: true });
    const result = onLogin('admin', '1234', true);

    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand auth-brand">
          <span className="brand__mark">T</span>
          <span className="brand__text">TaskFlow</span>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to plan your tasks and stay productive.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="1234"
            />
          </label>

          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button type="submit" className="btn btn--primary btn--full">
            Login
          </button>
        </form>

        <button type="button" className="btn btn--secondary btn--full demo-button" onClick={handleDemoLogin}>
          Demo Login
        </button>

        <div className="demo-credentials">
          <p>Demo credentials:</p>
          <span>Username: admin</span>
          <span>Password: 1234</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
