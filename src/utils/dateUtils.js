import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatString) : 'Invalid Date';
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatDateDistance = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? formatDistanceToNow(dateObj, { addSuffix: true }) : 'Invalid Date';
  } catch (error) {
    return 'Invalid Date';
  }
};

export const getDaysUntilExpiration = (expirationDate) => {
  try {
    const expDate = typeof expirationDate === 'string' ? parseISO(expirationDate) : expirationDate;
    const today = new Date();
    const diffTime = expDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
};

export const isExpired = (expirationDate) => {
  return getDaysUntilExpiration(expirationDate) < 0;
};

export const isExpiringSoon = (expirationDate, daysThreshold = 30) => {
  const days = getDaysUntilExpiration(expirationDate);
  return days >= 0 && days <= daysThreshold;
};

export const getExpirationStatus = (expirationDate) => {
  if (isExpired(expirationDate)) {
    return 'expired';
  } else if (isExpiringSoon(expirationDate)) {
    return 'expiring';
  } else {
    return 'safe';
  }
};