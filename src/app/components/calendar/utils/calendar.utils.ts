import { CalendarCell, CalendarEvent } from '@/interface/calendar.interface';

export const DAYS_COUNT = 7;
export const PERIODS_COUNT = 48;

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function generateCalendar(date: Date, events: CalendarEvent[]) {
  let calendarDays: CalendarCell[][] = [];

  for (let i = 0; i < DAYS_COUNT; i++) {
    const day = [];

    for (let j = 0; j < PERIODS_COUNT; j++) {
      const start = date.toISOString();
      date.setMinutes(date.getMinutes() + 30);
      const end = date.toISOString();

      const event = findRelatedEvent(start, end, events);

      day[j] = {
        startsAt: start,
        endsAt: end,
        event: event,
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
  return [...timePeriods, '24:00'];
}

export function getCalendarHeaders(date: Date): string[] {
  date.setDate(date.getDate() - 1);

  return dayNames.map((dayName) => {
    date.setDate(date.getDate() + 1);
    return `${dayName}, ${date.getDate()}`;
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

export function findRelatedEvent(
  start: string,
  end: string,
  events: CalendarEvent[]
) {
  const periodStart = new Date(start);
  const periodEnd = new Date(end);

  for (let event of events) {
    const eventStart = new Date(event.startsAt);
    const eventEnd = new Date(event.endsAt);

    eventStart.getMinutes() < 30
      ? eventStart.setMinutes(0)
      : eventStart.setMinutes(30);

    for (let i = eventStart; i < eventEnd; i.setMinutes(i.getMinutes() + 30)) {
      if (i >= periodStart && i < periodEnd) {
        return event;
      }
    }
  }

  return null;
}

export function getStartDate() {
  const date = getZeroDate();
  date.setDate(date.getDate() - date.getDay());
  return date;
}
