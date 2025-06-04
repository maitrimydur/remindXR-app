// src/components/ReviewItem.jsx
import React, { useState } from 'react';

export default function ReviewItem({ index, word, initialResult, onChange }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialResult); // "got" or "struggled"

  const handleSave = () => {
    setEditing(false);
    onChange(index, value);
  };

  return (
    <div className="review-row">
      <div className="review-word">{word}</div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        {editing ? (
          <>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '0.875rem',
                borderRadius: '6px',
                border: '1px solid var(--color-divider)',
                marginRight: '6px',
              }}
            >
              <option value="got">Got It</option>
              <option value="struggled">Struggled</option>
            </select>
            <button
              onClick={handleSave}
              style={{
                background: 'var(--color-primary)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <button className="pill" onClick={() => setEditing(true)}>
              {value === 'got' ? 'Got It' : 'Struggled'}
              {/* Inline pencil icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ width: '16px', height: '16px', marginLeft: '4px' }}
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 16.5A1.5 1.5 0 013.5 15h5a.5.5 0 01.354.146l8 .354a.5.5 0 01.292.854l-4 4a.5.5 0 01-.854-.292l-.354-8A.5.5 0 0110 11.5v-5A1.5 1.5 0 018.5 5h-5A1.5 1.5 0 012 6.5v10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
