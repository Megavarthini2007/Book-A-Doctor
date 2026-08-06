export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getDayName = (dateString) => {
  if (!dateString) return '';
  const options = { weekday: 'long' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
