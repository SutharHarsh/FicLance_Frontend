/**
 * Emoji Validation Utility
 * Detects and blocks emoji characters in authentication inputs
 */

/**
 * Comprehensive emoji detection regex
 * Covers all Unicode emoji ranges including:
 * - Emoticons
 * - Symbols
 * - Pictographs
 * - Transport symbols
 * - Flags
 * - Extended emoji (including skin tones)
 */
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F0}\u{23F3}\u{267F}\u{2693}\u{26A1}\u{26AA}-\u{26AB}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26CE}\u{26D4}\u{26EA}\u{26F2}-\u{26F3}\u{26F5}\u{26FA}\u{26FD}\u{2705}\u{270A}-\u{270B}\u{2728}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2795}-\u{2797}\u{27B0}\u{27BF}\u{2B1B}-\u{2B1C}\u{FE0F}\u{200D}]/gu;

/**
 * Check if a string contains emoji characters
 * @param {string} text - The text to validate
 * @returns {boolean} - True if emoji found, false otherwise
 */
export function containsEmoji(text) {
  if (!text || typeof text !== 'string') return false;
  return EMOJI_REGEX.test(text);
}

/**
 * Remove all emoji characters from a string
 * @param {string} text - The text to sanitize
 * @returns {string} - Text without emojis
 */
export function removeEmojis(text) {
  if (!text || typeof text !== 'string') return text;
  return text.replace(EMOJI_REGEX, '');
}

/**
 * Validate email - must be valid format and contain no emojis
 * @param {string} email - The email to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  if (containsEmoji(email)) {
    return { valid: false, error: 'Email cannot contain emoji characters' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true, error: null };
}

/**
 * Validate password - must meet strength requirements and contain no emojis
 * @param {string} password - The password to validate
 * @param {number} minLength - Minimum password length (default: 8)
 * @returns {object} - { valid: boolean, error: string }
 */
export function validatePassword(password, minLength = 8) {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  // Trim whitespace
  const trimmedPassword = password.trim();

  if (containsEmoji(trimmedPassword)) {
    return { valid: false, error: 'Password cannot contain emoji characters' };
  }

  if (trimmedPassword.length < minLength) {
    return { valid: false, error: `Password must be at least ${minLength} characters` };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(trimmedPassword)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(trimmedPassword)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }

  // Check for at least one number
  if (!/\d/.test(trimmedPassword)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }

  return { valid: true, error: null };
}

/**
 * Sanitize input by removing emojis and trimming whitespace
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return input;
  return removeEmojis(input).trim();
}
