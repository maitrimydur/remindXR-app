// src/utils/time.js

/**
 * Return HH:MM AM/PM string for a JavaScript Date object.
 */
export function formatTime(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const mm = m < 10 ? '0' + m : m;
  return `${h}:${mm} ${ampm}`;
}

/**
 * Compute elapsed seconds between two Date objects.
 * Returns { minutes: X, seconds: Y }.
 */
export function getElapsed(start, end) {
  const diffMs = end - start; // milliseconds
  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
}

/**
 * Return a string “Xm Ys” (e.g. “4m 12s”) given two Date objects.
 */
export function formatElapsed(start, end) {
  const { minutes, seconds } = getElapsed(start, end);
  return `${minutes}m ${seconds}s`;
}
