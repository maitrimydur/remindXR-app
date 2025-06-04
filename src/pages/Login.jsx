// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { signInWithEmail, signUpWithEmail, signInWithOAuth } from '../services/auth';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (isSignUp) {
        user = await signUpWithEmail(email, password);
      } else {
        user = await signInWithEmail(email, password);
      }
      setUser(user);
      navigate('/practice/1'); // start Day 1 practice
    } catch (error) {
      // Now using error.message so that the caught variable is actually used
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setLoading(true);
    setError('');
    try {
      const user = await signInWithOAuth(provider);
      setUser(user);
      navigate('/practice/1');
    } catch (error) {
      setError(error.message || 'OAuth failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header title={isSignUp ? 'Sign Up' : 'Sign In'} backTo="/" />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '24px' }}>
          {isSignUp ? 'Create An Account' : 'Log In'}
        </h2>

        <form onSubmit={handleEmailAuth}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && (
            <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>
          )}
          <Button large type="submit" disabled={loading}>
            {loading ? 'Please wait…' : 'Continue'}
          </Button>
        </form>

        <div style={{ margin: '16px 0', color: 'var(--color-text-dark)' }}>
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setIsSignUp(false);
                  setError('');
                }}
              >
                Log In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  setIsSignUp(true);
                  setError('');
                }}
              >
                Sign Up
              </span>
            </>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
          <div className="divider" style={{ flex: 1 }}></div>
          <span style={{ margin: '0 12px', color: 'var(--color-text-dark)' }}>OR</span>
          <div className="divider" style={{ flex: 1 }}></div>
        </div>

        {/* OAuth Buttons */}
        <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}>
          <button
            className="btn"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-divider)',
            }}
            onClick={() => handleOAuth('google')}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/color/24/000000/google-logo.png"
              alt="Google"
              style={{ marginRight: '8px' }}
            />
            Continue with Google
          </button>

          <button
            className="btn"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-divider)',
            }}
            onClick={() => handleOAuth('facebook')}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/color/24/000000/facebook-new.png"
              alt="Facebook"
              style={{ marginRight: '8px' }}
            />
            Continue with Facebook
          </button>

          <button
            className="btn"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-divider)',
            }}
            onClick={() => handleOAuth('microsoft')}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/color/24/000000/microsoft.png"
              alt="Microsoft"
              style={{ marginRight: '8px' }}
            />
            Continue with Microsoft
          </button>

          <button
            className="btn"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-divider)',
            }}
            onClick={() => handleOAuth('apple')}
            disabled={loading}
          >
            <img
              src="https://img.icons8.com/ios-filled/24/000000/mac-os.png"
              alt="Apple"
              style={{ marginRight: '8px' }}
            />
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
