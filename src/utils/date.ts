export const formatDate = (dateString: string) => {
  if (!dateString) return '날짜 없음';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.warn('Invalid date string:', dateString);
    return '날짜 오류';
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

export { getDateOptions } from './timezone';

export { formatKoreanDate, formatKoreanTime } from './timezone';

export { formatDateForAPI, formatTimeForAPI } from './timezone';

export const parseDateFromAPI = (dateString: string): Date => {
  return new Date(dateString);
};

export const parseTimeFromAPI = (timeString: string): Date => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
  return date;
};

export const addDaysToDate = (baseDate: Date, days: number): Date => {
  const result = new Date(baseDate);
  result.setDate(baseDate.getDate() + days);
  return result;
};
