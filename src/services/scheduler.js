// src/services/scheduler.js

/**
 * Request Notification permission once. Returns the resulting permission ('granted'|'denied'|'default').
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return 'denied';
  }
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }
  return permission;
}

/**
 * Schedule daily reminders at a given "HH:MM AM/PM" time.
 * We'll calculate the next occurrence, set a timeout, then setInterval every 24h.
 *
 * Returns an object: { timeoutId, intervalId } so you can clear them if needed.
 */
export function scheduleDailyReminder(reminderTime, onFireCallback) {
  // Example reminderTime: "09:00 AM"
  const [time, modifier] = reminderTime.split(' ');
  let [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const now = new Date();
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);
  // If that time is already passed today, schedule for tomorrow
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  const delayMs = next.getTime() - now.getTime();

  // Single setTimeout to fire at the next occurrence
  const timeoutId = setTimeout(() => {
    // Fire for the first time
    onFire();

    // Then schedule every 24 hours
    const intervalId = setInterval(onFire, 24 * 60 * 60 * 1000);
    scheduled.intervalId = intervalId;
  }, delayMs);

  const scheduled = { timeoutId, intervalId: null };
  function onFire() {
    // Show a browser notification
    new Notification('ReMind-XR Reminder', {
      body: "Time for today's memory session!",
      icon: '/favicon.ico', // adjust if you have an icon
    });
    if (typeof onFireCallback === 'function') onFireCallback();
  }

  return scheduled;
}

/**
 * Cancel a previously scheduled reminder.
 * Pass in the object returned by scheduleDailyReminder.
 */
export function cancelDailyReminder(scheduled) {
  if (!scheduled) return;
  if (scheduled.timeoutId) clearTimeout(scheduled.timeoutId);
  if (scheduled.intervalId) clearInterval(scheduled.intervalId);
}
