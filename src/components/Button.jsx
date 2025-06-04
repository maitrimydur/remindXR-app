// src/components/Button.jsx
import React from 'react';

export default function Button({ onClick, children, large = false, style = {}, disabled = false }) {
  const className = large ? 'btn btn-large' : 'btn';
  return (
    <button className={className} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
}
