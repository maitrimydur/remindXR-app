// src/pages/PracticeCard.jsx
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import WordCard from '../components/WordCard';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';
import { formatElapsed } from '../utils/time';
import { postSessionData } from '../services/api';

export default function PracticeCard() {
  const { state, saveSession } = useContext(AppContext);
  const navigate = useNavigate();
  const { day, index } = useParams();
  const dayNum = parseInt(day, 10);
  const idx = parseInt(index, 10);

  const wordObj = WORD_LISTS[dayNum]?.words[idx];
  const [startTime] = useState(new Date());

  const responsesRef = useRef([]);
  // If session already started, load prior responses
  useEffect(() => {
    const prev = (state.sessions[dayNum]?.responses || []).slice(0, idx);
    responsesRef.current = prev;
  }, [dayNum, idx, state.sessions]);

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

  const handleChoice = async (choice) => {
    const endTime = new Date();
    const elapsed = formatElapsed(startTime, endTime);
    const newResponse = {
      text: wordObj.text,
      result: choice, // "got" or "struggled"
      timeSpent: elapsed,
      timestamp: endTime.toISOString(),
    };
    const updatedResponses = [...responsesRef.current, newResponse];
    responsesRef.current = updatedResponses;

    if (idx < WORD_LISTS[dayNum].words.length - 1) {
      // Move to next card:
      navigate(`/card/${dayNum}/${idx + 1}`);
    } else {
      // Last word: finish session
      const totalTimeMs = updatedResponses.reduce((acc, r) => {
        // parse "Xm Ys" and sum
        const [minsStr, secsStr] = r.timeSpent.split(' ');
        const m = parseInt(minsStr.replace('m', ''), 10);
        const s = parseInt(secsStr.replace('s', ''), 10);
        return acc + (m * 60 + s) * 1000;
      }, 0);
      const totalMinutes = Math.floor(totalTimeMs / (60 * 1000));
      const totalSeconds = Math.floor((totalTimeMs % (60 * 1000)) / 1000);
      const timeSpentString = `${totalMinutes}m ${totalSeconds}s`;

      // Save to context:
      const sessionData = {
        responses: updatedResponses,
        timeSpent: timeSpentString,
      };
      saveSession(dayNum, sessionData);

      // Optionally POST to API:
      const payload = {
        day: dayNum,
        userEmail: state.user.email,
        responses: updatedResponses,
        timeSpent: timeSpentString,
      };
      await postSessionData(payload);

      // Navigate to summary
      navigate(`/summary/${dayNum}`);
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
