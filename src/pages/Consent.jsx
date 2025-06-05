// src/pages/Consent.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { STORAGE_KEYS } from '../utils/constants';

export default function Consent() {
  const { setConsent } = useContext(AppContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const handleAgree = () => {
    if (!checked) return;
    localStorage.setItem(STORAGE_KEYS.CONSENT, 'true');
    setConsent();
    navigate('/login');
  };

  return (
    <div className="container">
      <Header title="Consent" backTo="/" color='#DBEAFE'/>
      <div className="content" style={{
        paddingTop: '20px'
      }}>
        <p style={{ marginTop: '20px', marginBottom: '30px', color: '#1E40AF' , fontSize: 16}}>
          Thank you for your interest in participating in the ReMind-XR memory training program.
          Before you begin, please read this consent form carefully. We will ask you to indicate your agreement by checking the box at the end.
        </p>


        <h3 style={{
          marginTop: '8px',
          marginBottom: '12px',
          color: '#1E40AF',
          fontWeight: 600,
          fontSize: 20
        }}>
          Purpose of Study
        </h3>
        <p style={{
          marginBottom: '30px',
          color: '#1E40AF',
          fontSize: 16
        }}>
          You are being invited to take part in a research study of a new multisensory, load-adaptive spaced-repetition
          app designed to help teens and young adults recovering from traumatic brain injury (TBI) improve memory retention
          and everyday memory confidence. The goal is to compare standard SM-2 scheduling with our cognitive-load–adaptive
          algorithm and evaluate both memory performance and user experience.
        </p>

        <div
          style={{
            backgroundColor: '#9FC8F9',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '24px',
            border: '1px solid #1E40AF',
          }}
        >

          <p style={{color: '#1E40AF', fontSize:12 }}>
            1. What You Will Do
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12}}>
            <li>Use the ReMind-XR app for 8 days of structured memory-training sessions.</li>
            <li>
              Complete a brief practice session on Day 0, followed by daily “due-card” reviews on Days 1, 3, 5, 7, and a final
              delayed-recall test on Day 8.
            </li>
            <li>
              Respond to prompts by tapping “Got It” or “Struggled,” rate your perceived effort (1–5), and optionally answer
              short self-efficacy and usability surveys.
            </li>
            <li>Enable reminders so the app can send push notifications on scheduled days.</li>
            <li>
              Grant permission to log and upload anonymized review performance (accuracy, response time, intervals, effort rating)
              to a secure database.
            </li>
          </ul>

          <p style={{color: '#1E40AF', fontSize:12}}>
            2. Time Commitment
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12 }}>
            <li>Day 0 (Baseline & Practice): ~20 minutes</li>
            <li>Days 1–7 (Sessions): ~10 minutes per session + ~1 minute effort rating</li>
            <li>Day 8 (Final Test & Survey): ~15 minutes</li>
            <li>Total: Approximately 1.5 hours over 8 days</li>
          </ul>

          <p style={{color: '#1E40AF', fontSize:12 }}>
            3. Risks & Discomforts
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12 }}>
            <li>You may experience mild mental fatigue or frustration during recall tasks.</li>
            <li>
              If at any time you feel overly tired or uncomfortable, you can pause or stop the session without penalty.
            </li>
          </ul>

          <p style={{color: '#1E40AF', fontSize:12 }}>
            4. Potential Benefits
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12 }}>
            <li>You may notice improvements in your ability to recall practiced material and in everyday-memory confidence.</li>
            <li>Your participation will contribute to the development of more effective, accessible memory-rehabilitation tools for TBI survivors.</li>
          </ul>

          <p style={{color: '#1E40AF', fontSize:12 }}>
            5. Confidentiality
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12 }}>
            <li>All performance data are anonymized; we assign you a unique study ID.</li>
            <li>No personal identifying information (name, email) is stored with your memory logs.</li>
            <li>Study data are stored on encrypted servers and accessed only by the research team.</li>
          </ul>

          <p style={{color: '#1E40AF', fontSize:12 }}>
            6. Voluntary Participation
          </p>
          <ul style={{ paddingLeft: '30px', marginBottom: '8px', color: '#1E40AF', fontSize:12 }}>
            <li>Your participation is entirely voluntary.</li>
            <li>You may withdraw at any time without consequence.</li>
            <li>If you withdraw, any data already collected will be retained in anonymized form unless you request its deletion.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{ 
              marginRight: '8px',
             }}
          />
          <label style={{
            fontSize: '1rem',
            color: '#1E40AF'
          }}>
            I have read and understood the information above. I agree to use the ReMind-XR app as described and to have my
            anonymized data collected for research purposes.
          </label>
        </div>

        <button className="btn btn-large" onClick={handleAgree} disabled={!checked} style={{

        }}>
          I Agree
        </button>
      </div>
    </div>
  );
}
