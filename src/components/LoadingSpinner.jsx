// src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <div
        style={{
          border: '6px solid #f3f3f3',
          borderTop: '6px solid var(--color-primary)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          animation: 'spin 1s linear infinite',
          margin: 'auto',
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0%   { transform: rotate(0deg);   }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
