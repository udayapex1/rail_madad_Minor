export const generateComplaintId = () => {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RM-${year}-${random}`;
};