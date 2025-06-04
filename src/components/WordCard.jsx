// src/components/WordCard.jsx
import React, { useEffect } from 'react';

export default function WordCard({ word, imageUrl, onGotIt, onStruggled, disabled }) {
  // Function to play TTS audio for the word
  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Auto‐play audio once the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      playAudio();
    }, 500);
    return () => clearTimeout(timer);
  }, [word]);

  return (
    <div className="content" style={{ paddingTop: '24px' }}>
      <div className="word-title">{word}</div>
      <div className="word-image">
        <img
          src={imageUrl}
          alt={word}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Inlined Play Button */}
      <div onClick={playAudio} className="play-button">
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="white" />
        </svg>
      </div>

      <button className="choice-btn" onClick={onGotIt} disabled={disabled}>
        Got It
      </button>
      <button className="choice-btn" onClick={onStruggled} disabled={disabled}>
        Struggled
      </button>
    </div>
  );
}