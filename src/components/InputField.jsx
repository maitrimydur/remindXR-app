// src/components/InputField.jsx
import React from 'react';

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
}) {
  return (
    <div style={{ width: '100%', marginBottom: '12px' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600, color: 'var(--color-text-dark)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid var(--color-divider)',
          fontSize: '1rem',
          backgroundColor: '#DBEAFE',
        }}
      />
    </div>
  );
}
