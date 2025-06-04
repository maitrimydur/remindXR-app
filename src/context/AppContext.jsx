// src/context/AppContext.jsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// Initial shape of our global state
const initialState = {
  user: null,
  hasConsented: false,
  sessions: {},
  reminderEnabled: false,
  reminderTime: null,
};

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_CONSENT: 'SET_CONSENT',
  SAVE_SESSION: 'SAVE_SESSION',
  EDIT_SESSION: 'EDIT_SESSION',
  SET_REMINDER: 'SET_REMINDER',
  LOAD_STATE: 'LOAD_STATE',
  RESET: 'RESET',
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };

    case ACTIONS.SET_CONSENT:
      return { ...state, hasConsented: true };

    case ACTIONS.SAVE_SESSION:
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.payload.day]: action.payload.data,
        },
      };

    case ACTIONS.EDIT_SESSION:
      return {
        ...state,
        sessions: {
          ...state.sessions,
          [action.payload.day]: action.payload.data,
        },
      };

    case ACTIONS.SET_REMINDER:
      return {
        ...state,
        reminderEnabled: action.payload.enabled,
        reminderTime: action.payload.time,
      };

    case ACTIONS.LOAD_STATE:
      return { ...state, ...action.payload };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
}

// Export a default of null so that ESLint no longer warns about an “untyped” context
export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem('remindxr_global_state');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: parsed });
      } catch (err) {
        console.warn('Failed to parse saved state:', err);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('remindxr_global_state', JSON.stringify(state));
  }, [state]);

  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };
  const setConsent = () => {
    dispatch({ type: ACTIONS.SET_CONSENT });
  };
  const saveSession = (day, data) => {
    dispatch({ type: ACTIONS.SAVE_SESSION, payload: { day, data } });
  };
  const editSession = (day, data) => {
    dispatch({ type: ACTIONS.EDIT_SESSION, payload: { day, data } });
  };
  const setReminder = (enabled, time) => {
    dispatch({ type: ACTIONS.SET_REMINDER, payload: { enabled, time } });
  };
  const resetAll = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        setConsent,
        saveSession,
        editSession,
        setReminder,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
