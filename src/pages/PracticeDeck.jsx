// src/pages/PracticeDeck.jsx
import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import { WORD_LISTS } from '../utils/constants';

export default function PracticeDeck() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNum = parseInt(day, 10);
  const listObj = WORD_LISTS[dayNum];
  const session = state.sessions[dayNum];
  const totalWords = listObj.words.length;
  const answered = session?.responses?.length || 0;
  const isComplete = answered === totalWords;

  useEffect(() => {
    if (dayNum > 1 && !state.sessions[dayNum - 1]) {
      navigate(`/practice/${dayNum - 1}`);
    }
  }, [dayNum, state.sessions, navigate]);

  if (!listObj) {
    return (
      <div className="container">
        <Header title="Practice Deck" backTo="/" />
        <div className="content" style={{ textAlign: 'center', paddingTop: '24px' }}>
          <p>Invalid day. Redirecting…</p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (!isComplete) {
      navigate(`/card/${dayNum}/${answered}`);
    } else {
      navigate(`/review/${dayNum}`);
    }
  };

  return (
    <div className="container">
      <Header title="Practice Deck" backTo="/" />
      <div className="content" style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <div
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.9)',
            borderRadius: '24px',
            padding: '24px',
            maxWidth: '380px',
            maxHeight: '700px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: '#DBEAFE',
              margin: 0,
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            Practice Session #{dayNum}:
          </h2>
          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#ffffff',
              margin: 0,
              marginTop: '30px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {listObj.title}
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: '#DBEAFE',
              margin: 0,
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 300,
            }}
          >
            Let’s review {totalWords} practice questions.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '30px',
            }}
          >
            {listObj.words.map((w, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '8px 12px',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--color-primary)',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {w.text}
              </div>
            ))}
          </div>
          <Button
            large
            style={{
              marginTop: '0px',
              width: '100%',
              backgroundColor: 'var(--color-primary-dark)',
              color: '#ffffff',
              borderRadius: '25px',
              padding: '20px 0',
              fontSize: '1.8rem',
              fontWeight: 600,
            }}
            onClick={handleClick}
          >
            {isComplete ? 'Review Answers' : 'Begin'}
          </Button>
        </div>
      </div>
    </div>
  );
}
