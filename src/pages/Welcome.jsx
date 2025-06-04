// src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Header title="" />
      <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
        {/* Brain + XR Visor Icon placeholder */}
        <div style={{ marginBottom: '24px' }}>
          <svg width="120" height="120" viewBox="0 0 512 512">
            <path
              fill="white"
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 472c-119 0-216-97-216-216S137 40 256 40s216 97 216 216-97 216-216 216z"
            />
            <path
              fill="white"
              d="M300 120L212 120C204 120 197 127 197 135v210c0 8 7 15 15 15l88 0c8 0 15-7 15-15V135c0-8-7-15-15-15z"
            />
          </svg>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
          ReMind-XR
        </h1>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '24px' }}>
          Memory Training
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
          Welcome to ReMind-XR!
        </h2>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
          Remember More, Live Better.
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-dark)', marginBottom: '24px', maxWidth: '360px', margin: '0 auto' }}>
          Multisensory, load‐adaptive memory sessions in just 10 minutes a day.
        </p>

        {/* Icons: Visual / Audio / Haptic */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '32px', maxWidth: '360px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-primary)">
              <path d="M12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
              <circle cx="12" cy="12" r="2.5" fill="var(--color-primary-dark)" />
            </svg>
            <div style={{ marginTop: '8px', fontWeight: 600 }}>Visual</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-primary)">
              <path d="M12 3C7 3 2.7 5.6 1 9.3c-.2.4-.2.8 0 1.2 1.7 3.7 6 6.3 11 6.3s9.3-2.6 11-6.3c.2-.4.2-.8 0-1.2C21.3 5.6 17 3 12 3zm0 10c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
              <circle cx="12" cy="8" r="2.5" fill="var(--color-primary-dark)" />
            </svg>
            <div style={{ marginTop: '8px', fontWeight: 600 }}>Audio</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-primary)">
              <path d="M6 2c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h.2c.3 0 .5-.1 .7-.3l3-3c.1-.1.2-.3.2-.5V8c0-.6.4-1 1-1s1 .4 1 1v5.2c0 .2.1 .4 .2 .5l3 3c.2 .2 .4 .3 .7 .3H18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm12 14H14.3l-2.3-2.3V8c0-.6-.4-1-1-1s-1 .4-1 1v5.7L9.7 16H6V4h12v12z"/>
            </svg>
            <div style={{ marginTop: '8px', fontWeight: 600 }}>Haptic</div>
          </div>
        </div>

        <button className="btn btn-large" onClick={() => navigate('/consent')}>
          Get Started
        </button>
      </div>
    </div>
  );
}
