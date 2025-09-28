export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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
