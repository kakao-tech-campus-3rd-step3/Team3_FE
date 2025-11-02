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

export const getDateOptions = (baseDate: Date = new Date()) => {
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);

    const dateStr = date.toISOString().split('T')[0];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

    dates.push({
      value: dateStr,
      label: `${month}.${day} ${dayOfWeek}`,
      isToday: i === 0,
    });
  }

  return dates;
};

export const formatKoreanDate = (date: Date): string => {
  const formatted = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
  return formatted.replace(/\s([월화수목금토일])$/, ' ($1)');
};

export const formatKoreanTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatTimeForAPI = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

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
