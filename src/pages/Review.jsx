// src/pages/Review.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReviewItem from '../components/ReviewItem';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';

export default function Review() {
  const { state, editSession } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);

  // Retrieve sessionData (may be undefined)
  const sessionData = state.sessions[dayNum];

  // Initialize local state to either sessionData.responses or empty array
  const [responses, setResponses] = useState(() => {
    return sessionData ? sessionData.responses : [];
  });

  // 1) If sessionData is missing, redirect when this effect runs
  useEffect(() => {
    if (!sessionData) {
      navigate(`/practice/${dayNum}`);
    }
  }, [sessionData, navigate, dayNum]);

  // 2) Whenever sessionData changes (e.g. on mount or after edit), sync local responses
  useEffect(() => {
    if (sessionData) {
      setResponses(sessionData.responses);
    }
  }, [sessionData]);

  // Now that both hooks have been called unconditionally, we can safely return early
  if (!sessionData) {
    return null;
  }

  const handleChange = (index, newResult) => {
    const updated = responses.map((r, i) =>
      i === index ? { ...r, result: newResult } : r
    );
    setResponses(updated);

    // Update context with edited responses
    const newSessionData = {
      ...sessionData,
      responses: updated,
    };
    editSession(dayNum, newSessionData);
  };

  const handleComplete = () => {
    if (dayNum === 1) {
      navigate('/reminder');
    } else {
      navigate(`/summary/${dayNum}`);
    }
  };

  return (
    <div className="container">
      <Header title="Review" backTo={`/practice/${dayNum}`} />
      <div className="content">
        <div className="review-list">
          {responses.map((resp, i) => (
            <ReviewItem
              key={i}
              index={i}
              word={resp.text}
              initialResult={resp.result}
              onChange={handleChange}
            />
          ))}
        </div>
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button large onClick={handleComplete}>
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}
