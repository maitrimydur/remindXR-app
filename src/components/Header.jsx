// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, backTo }) {
  const navigate = useNavigate();
  return (
    <header className="header">
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          style={{
            position: 'absolute',
            left: '16px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
          }}
        >
          ←
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
}
