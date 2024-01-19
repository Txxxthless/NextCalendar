export interface CalendarCell {
  start: string;
  end: string;
  event: boolean;
}

export const DAYS_COUNT = 7;
export const PERIODS_COUNT = 47;

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function generateCalendar() {
  let calendarDays: CalendarCell[][] = [];

  const date = getZeroDate();
  date.setDate(date.getDate() - date.getDay());

  for (let i = 0; i < DAYS_COUNT; i++) {
    const day = [];

    for (let j = 0; j < PERIODS_COUNT; j++) {
      const start = date.toISOString();
      date.setMinutes(date.getMinutes() + 30);
      const end = date.toISOString();
      day[j] = {
        start: start,
        end: end,
        event: false,
      };
    }

    calendarDays = [...calendarDays, day];
  }

  return calendarDays;
}

export function getTimePeriods(): string[] {
  let timePeriods = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      let timeString = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      timePeriods.push(timeString);
    }
  }

  timePeriods.shift();
  return timePeriods;
}

export function getCalendarHeaders(): string[] {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 1);

  return dayNames.map((dayName) => {
    currentDate.setDate(currentDate.getDate() + 1);
    return `${dayName}, ${currentDate.getDate()}`;
  });
}

export function getZeroDate(daysToAdd = 0): Date {
  const date = new Date();
  date.setHours(0);
  date.setMilliseconds(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setDate(date.getDate() + daysToAdd);
  return date;
}
