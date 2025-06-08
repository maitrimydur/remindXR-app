// src/components/Button.jsx
import React from 'react';

export default function Button({
  onClick,
  children,
  large = false,
  style = {},
  disabled = false,
  className = '',
}) {
  const baseClass = large ? 'btn btn-large' : 'btn';
  const fullClass = `${baseClass} ${className}`.trim();
  return (
    <button
      className={fullClass}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
