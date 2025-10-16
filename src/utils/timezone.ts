import { format, parseISO, addHours } from 'date-fns';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const KST_TIMEZONE = 'Asia/Seoul';
const UTC_TIMEZONE = 'UTC';

export const convertKSTToUTC = (kstDate: Date): Date => {
  return fromZonedTime(kstDate, KST_TIMEZONE);
};

export const convertUTCToKST = (utcDate: Date): Date => {
  return toZonedTime(utcDate, KST_TIMEZONE);
};

export const getCurrentKST = (): Date => {
  const now = new Date();
  return toZonedTime(now, KST_TIMEZONE);
};

export const formatDateForAPI = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'yyyy-MM-dd');
};

export const formatTimeForAPI = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'HH:mm:ss');
};

export const parseDateFromAPI = (dateString: string): Date => {
  const parsedDate = parseISO(dateString);
  return toZonedTime(parsedDate, KST_TIMEZONE);
};

export const parseTimeFromAPI = (timeString: string): Date => {
  const today = new Date();
  const todayKST = toZonedTime(today, KST_TIMEZONE);
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  const kstDate = new Date(todayKST);
  kstDate.setHours(hours, minutes, seconds, 0);

  return kstDate;
};

export const formatKoreanDate = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'yyyy년 M월 d일 (E)');
};

export const formatKoreanTime = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'a h:mm');
};

export const formatSimpleTime = (date: Date): string => {
  const kstDate = toZonedTime(date, KST_TIMEZONE);
  return format(kstDate, 'HH:mm');
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

export const isFutureMatch = (
  matchDate: string,
  matchTime: string
): boolean => {
  const matchDateTime = parseDateFromAPI(matchDate);
  const [hours, minutes] = matchTime.split(':').map(Number);
  matchDateTime.setHours(hours, minutes, 0, 0);

  const now = getCurrentKST();
  return matchDateTime > now;
};

export const getMinutesUntilMatch = (
  matchDate: string,
  matchTime: string
): number => {
  const matchDateTime = parseDateFromAPI(matchDate);
  const [hours, minutes] = matchTime.split(':').map(Number);
  matchDateTime.setHours(hours, minutes, 0, 0);

  const now = getCurrentKST();
  const diffMs = matchDateTime.getTime() - now.getTime();
  return Math.floor(diffMs / (1000 * 60));
};
