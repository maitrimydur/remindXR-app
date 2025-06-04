// src/pages/ReminderSettings.jsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import ToggleSwitch from '../components/ToggleSwitch';
import TimePicker from '../components/TimePicker';
import { AppContext } from '../context/AppContext';
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
} from '../services/scheduler';

export default function ReminderSettings() {
  const { state, setReminder } = useContext(AppContext);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(state.reminderEnabled);
  const [time, setTime] = useState(state.reminderTime || '09:00 AM');
  const scheduledRef = useRef(null);

  useEffect(() => {
    if (enabled) {
      requestNotificationPermission().then((perm) => {
        if (perm !== 'granted') {
          alert('Cannot enable reminders without notification permission.');
          setEnabled(false);
        } else {
          if (!scheduledRef.current) {
            scheduledRef.current = scheduleDailyReminder(time);
          }
        }
      });
    } else {
      if (scheduledRef.current) {
        cancelDailyReminder(scheduledRef.current);
        scheduledRef.current = null;
      }
    }
  }, [enabled, time]);

  useEffect(() => {
    if (state.reminderEnabled && state.reminderTime) {
      scheduledRef.current = scheduleDailyReminder(state.reminderTime);
    }
    return () => {
      if (scheduledRef.current) {
        cancelDailyReminder(scheduledRef.current);
      }
    };
  }, [state.reminderEnabled, state.reminderTime]);

  const handleTimeClick = () => {
    const presets = ['08:00 AM', '09:00 AM', '10:00 AM', '12:00 PM', '06:00 PM'];
    const idx = presets.indexOf(time);
    const next = presets[(idx + 1) % presets.length];
    setTime(next);
  };

  const handleSave = () => {
    setReminder(enabled, time);
    // After Day 1 reminder, go to Day 1 Session Summary
    navigate('/summary/1');
  };

  return (
    <div className="container">
      <Header title="Reminder" backTo="/review/1" />
      <div className="content">
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-primary-dark)',
            marginBottom: '16px',
          }}
        >
          Need a Reminder?
        </h2>
        <p style={{ marginBottom: '24px', color: 'var(--color-text-dark)' }}>
          Choose a time each day to nudge you back to your practice.
        </p>
        <div className="toggle-container">
          <span className="toggle-label">Enable Daily Reminder</span>
          <ToggleSwitch checked={enabled} onChange={setEnabled} />
        </div>
        {enabled && (
          <div style={{ marginBottom: '16px' }}>
            <TimePicker time={time} onClick={handleTimeClick} />
          </div>
        )}
        {enabled && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-dark)',
              marginBottom: '24px',
            }}
          >
            Next session: Tomorrow at {time}.
          </p>
        )}
        <Button large onClick={handleSave}>
          Save and Continue
        </Button>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-dark)',
            marginTop: '8px',
          }}
        >
          You can change this any time in Settings.
        </p>
      </div>
    </div>
  );
}
