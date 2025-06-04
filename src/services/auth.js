// src/services/auth.js

/**
 * Simulate an email/password sign‐up.
 * In a real app, replace with actual API call.
 */
export async function signUpWithEmail(email) {
  // Note: Removed the unused "password" parameter entirely
  await new Promise((r) => setTimeout(r, 800));
  return { email, name: email.split('@')[0] };
}

/**
 * Simulate email/password sign‐in.
 */
export async function signInWithEmail(email) {
  // Note: Removed the unused "password" parameter entirely
  await new Promise((r) => setTimeout(r, 800));
  return { email, name: email.split('@')[0] };
}

/**
 * Simulate OAuth sign‐in.
 * type ∈ {'google','facebook','apple','microsoft'}
 */
export async function signInWithOAuth(type) {
  await new Promise((r) => setTimeout(r, 800));
  const fakeEmail = `${type}_user@example.com`;
  return { email: fakeEmail, name: `${type.charAt(0).toUpperCase() + type.slice(1)} User` };
}

/**
 * Simulate sign‐out
 */
export async function signOut() {
  await new Promise((r) => setTimeout(r, 300));
  return true;
}
