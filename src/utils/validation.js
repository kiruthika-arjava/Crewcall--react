export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check for valid phone number patterns
  // Supports: +1234567890, 1234567890, +12345678901, etc.
  const phoneRegex = /^(\+?1?)?[2-9]\d{2}[2-9]\d{2}\d{4}$|^\+?[1-9]\d{7,14}$/;
  
  return cleaned.length >= 10 && phoneRegex.test(cleaned);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};