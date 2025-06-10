// src/pages/PracticeCard.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';
import { formatElapsed } from '../utils/time';

export default function PracticeCard() {
  const { state, saveSession } = useContext(AppContext);
  const navigate = useNavigate();
  const { day, index } = useParams();
  const dayNum = parseInt(day, 10);
  const idx = parseInt(index, 10);

  const wordObj = WORD_LISTS[dayNum]?.words[idx];
  const [startTime] = useState(new Date());

  // --- Set session startTime if on first card and not set ---
  useEffect(() => {
    const session = state.sessions[dayNum];
    if (idx === 0 && (!session || !session.startTime)) {
      saveSession(dayNum, { 
        ...(session || {}),
        startTime: Date.now()
      });
    }
    // Only runs on first card
  }, [dayNum, idx, state.sessions, saveSession]);

  if (!wordObj) {
    return (
      <div className="container">
        <Header title="Practice" backTo={`/practice/${dayNum}`} />
        <div className="content">
          <p>Invalid word. Redirecting…</p>
        </div>
      </div>
    );
  }

  const handleChoice = (choice) => {
    const endTime = new Date();
    const elapsed = formatElapsed(startTime, endTime);
    const newResponse = {
      text: wordObj.text,
      result: choice,
      timestamp: endTime.toISOString(),
      timeSpent: elapsed,
    };
    const prev = state.sessions[dayNum]?.responses || [];
    const updatedResponses = [...prev, newResponse];
    saveSession(dayNum, { responses: updatedResponses });

    const wordsCount = WORD_LISTS[dayNum].words.length;
    if (idx < wordsCount - 1) {
      navigate(`/card/${dayNum}/${idx + 1}`);
    } else {
      navigate(`/review/${dayNum}`);
    }
  };

  return (
    <div className="container">
      <Header title={`Practice Day ${dayNum}`} backTo={`/practice/${dayNum}`} />
      <WordCard
        word={wordObj.text}
        imageUrl={wordObj.img}
        onGotIt={() => handleChoice('got')}
        onStruggled={() => handleChoice('struggled')}
        disabled={false}
      />
    </div>
  );
}
