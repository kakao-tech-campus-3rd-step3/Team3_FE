import { format, addHours } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const KST_TIMEZONE = 'Asia/Seoul';

export const convertKSTToUTCTime = (kstTime: Date): string => {
  const hours = kstTime.getHours();
  const minutes = kstTime.getMinutes();
  const seconds = kstTime.getSeconds();

  let utcHours = hours - 9;
  if (utcHours < 0) {
    utcHours += 24;
  }

  return `${String(utcHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const convertUTCToKSTTime = (utcDateTimeString: string): string => {
  let timeString = utcDateTimeString;
  if (utcDateTimeString.includes('T')) {
    const timePart = utcDateTimeString.split('T')[1];
    timeString = timePart.replace('Z', '').split('.')[0];
  }

  const [hours, minutes] = timeString.split(':').map(Number);
  let kstHours = hours + 9;
  if (kstHours >= 24) {
    kstHours -= 24;
  }
  return `${String(kstHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const convertUTCToKSTDate = (utcDateTimeString: string): string => {
  if (!utcDateTimeString) return '';

  try {
    let datePart = '';
    let timeString = '';

    if (utcDateTimeString.includes('T')) {
      const parts = utcDateTimeString.split('T');
      datePart = parts[0];
      timeString = parts[1].replace('Z', '').split('.')[0];
    } else {
      return utcDateTimeString.split('T')[0] || '';
    }

    const [hours] = timeString.split(':').map(Number);

    let kstHours = hours + 9;
    let date = new Date(datePart);

    if (kstHours >= 24) {
      kstHours -= 24;
      date.setDate(date.getDate() + 1);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return utcDateTimeString.split('T')[0] || '';
  }
};

export const formatDateForAPI = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'yyyy-MM-dd');
};

export const formatTimeForAPI = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'HH:mm:ss');
};

export const formatKoreanDate = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'yyyy년 M월 d일 (E)');
};

export const formatKoreanTime = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'a h:mm');
};

export const getDateOptions = (baseDate: Date = new Date()) => {
  const dates = [];
  const kstBaseDate = toZonedTime(baseDate, KST_TIMEZONE);

  for (let i = 0; i < 7; i++) {
    const date = addHours(kstBaseDate, i * 24);
    const dateStr = formatDateForAPI(date);
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
