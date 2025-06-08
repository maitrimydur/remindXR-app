import React, { useEffect } from 'react';
import './WordCard.css';

export default function WordCard({ word, imageUrl, onGotIt, onStruggled, disabled }) {
  const playAudio = () => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      const voices = synth.getVoices();
      if (voices.length) {
        utterance.voice = voices.find(v => v.lang.toLowerCase().includes('en')) || voices[0];
      }
      synth.speak(utterance);
    };

    // If voices are not yet loaded, wait for them
    const voices = synth.getVoices();
    if (!voices.length) {
      const onVoicesChanged = () => {
        speak();
        synth.removeEventListener('voiceschanged', onVoicesChanged);
      };
      synth.addEventListener('voiceschanged', onVoicesChanged);
    } else {
      speak();
    }
  };

  useEffect(() => {
    // Trigger loading of voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="content">
      <div className="word-title">{word}</div>
      <div className="word-image">
        <img src={imageUrl} alt={word} />
      </div>

      <button
        type="button"
        className="play-button"
        onClick={playAudio}
        aria-label={`Play pronunciation of ${word}`}
      >
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="white" />
        </svg>
      </button>

      <button className="choice-btn" onClick={onGotIt} disabled={disabled}>
        Got It
      </button>
      <button className="choice-btn" onClick={onStruggled} disabled={disabled}>
        Struggled
      </button>
    </div>
  );
}
