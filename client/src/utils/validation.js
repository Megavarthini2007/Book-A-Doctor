export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

export const validatePasswordStrength = (password) => {
  if (!password || password.length < 6) return { isValid: false, message: 'Password must be at least 6 characters' };
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLetter || !hasNumber) return { isValid: false, message: 'Password must contain letters and numbers' };
  return { isValid: true, message: 'Strong password' };
};
