// src/components/WordCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import './WordCard.css';

export default function WordCard({
  word,
  imageUrl,
  onGotIt,
  onStruggled,
  disabled,
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchAudio() {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
            word
          )}`
        );
        if (!res.ok) throw new Error('No entry');
        const data = await res.json();
        // pick the first phonetic audio we find
        const phonetic = data[0]?.phonetics.find(p => p.audio);
        if (phonetic?.audio && !cancelled) {
          setAudioUrl(phonetic.audio);
        }
      } catch (e) {
        console.warn('📢 Pronunciation fetch failed, will use TTS', e);
      }
    }
    fetchAudio();
    return () => {
      cancelled = true;
    };
  }, [word]);

  const playAudio = () => {
    if (audioUrl) {
      audioRef.current
        .play()
        .catch(err => console.error('Audio playback failed:', err));
    } else if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } else {
      console.error('No audio source available');
    }
  };

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
        disabled={disabled}
        aria-label={`Play pronunciation of ${word}`}
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </button>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="auto" hidden />
      )}

      <button
        type="button"
        className="choice-btn"
        onClick={onGotIt}
        disabled={disabled}
      >
        Got It
      </button>
      <button
        type="button"
        className="choice-btn"
        onClick={onStruggled}
        disabled={disabled}
      >
        Struggled
      </button>
    </div>
  );
}
