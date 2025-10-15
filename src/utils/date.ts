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

/**
 * 한국식 날짜 포맷 (예: 2025년 10월 15일 (수))
 */
export const formatKoreanDate = (date: Date): string => {
  const formatted = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
  return formatted.replace(/\s([월화수목금토일])$/, ' ($1)');
};

/**
 * 한국식 시간 포맷 (예: 14:30)
 */
export const formatKoreanTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
