# ReMind-XR

**Multisensory, Load-Adaptive Memory Training App**  
A React-powered spaced-repetition system designed for adolescents and young adults recovering from traumatic brain injury (TBI). Compare a standard SM-2 scheduler against a cognitive-load–adaptive scheduler, delivered via visual, audio, and haptic cues over an 8-day training and follow-up protocol.

---

## 🎯 Features

- **8-Day Structured Protocol**: Day 0 baseline + practice; Days 1, 3, 5, 7 reviews; Day 8 delayed test  
- **Two Scheduling Algorithms**  
  - SM-2 (Control)  
  - Cognitive-Load–Adaptive (adjusts ease factor based on response latency & self-rated effort)  
- **Multisensory Presentation**  
  - Word + image display  
  - API-fetched pronunciation or built-in TTS  
  - One-hand haptic/tap support  
- **User Flow**  
  1. Welcome → Consent → Login  
  2. Practice sessions (card deck → card view)  
  3. Review & edit responses  
  4. Session summary + progress dashboard  
  5. Daily push reminders (optional)  
  6. Completion screen with data submission  
- **Data Logging**  
  - Time-on-task & timestamps  
  - “Got It” vs. “Struggled” responses  
  - Effort ratings (1–5)  
  - LocalStorage persistence & stubbed API calls  

---

## 📦 Tech Stack

- **Front-End**: React 18, React Router v6, CSS Modules & global CSS  
- **State Management**: React Context + `useReducer`  
- **Charts**: Recharts (line, pie charts) + custom SVG for small charts  
- **Notifications**: Browser Notification API + custom scheduler  
- **Testing / Stubs**:  
  - `src/services/api.js` (postSessionData, fetchAllSessions)  
  - `src/services/auth.js` (email & OAuth simulation)  
  - `src/services/scheduler.js` (daily reminder scheduler)  

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/ReMind-XR.git
   cd ReMind-XR
