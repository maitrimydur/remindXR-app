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

  const sessionData = state.sessions[dayNum];
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (!sessionData) {
      navigate(`/practice/${dayNum}`);
    } else {
      setResponses(sessionData.responses);
    }
  }, [sessionData, navigate, dayNum]);

  const handleChange = (index, newResult) => {
    const updated = responses.map((r, i) =>
      i === index ? { ...r, result: newResult } : r
    );
    setResponses(updated);
    editSession(dayNum, { ...sessionData, responses: updated });
  };

  const handleComplete = () => {
    navigate(`/summary/${dayNum}`);
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
