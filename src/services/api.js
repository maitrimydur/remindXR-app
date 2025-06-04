// src/services/api.js

/**
 * Simulate saving session data to the server.
 *   data = { day: 1, userEmail: '…', responses: [...], timeSpent: '4m 12s' }
 */
export async function postSessionData(data) {
  console.log('API call: postSessionData →', data);
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
}

/**
 * Simulate fetching all past sessions for this user.
 * In this stub, we ignore any actual userEmail parameter.
 */
export async function fetchAllSessions() {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true, sessions: [] };
}
