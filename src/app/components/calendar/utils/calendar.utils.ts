import { CalendarCell, CalendarEvent } from '@/interface/calendar.interface';

export const events: CalendarEvent[] = [
  {
    start: '2024-01-24T03:35:00.000Z',
    end: '2024-01-24T05:25:00.000Z',
    name: 'Event 1',
  },
  {
    start: '2024-01-26T15:30:00.000Z',
    end: '2024-01-26T16:00:00.000Z',
    name: 'Event 2',
  },
  {
    start: '2024-01-27T10:21:00.000Z',
    end: '2024-01-27T12:35:00.000Z',
    name: 'Event 3',
  },
  {
    start: '2024-01-16T08:30:00.000Z',
    end: '2024-01-16T10:00:00.000Z',
    name: 'Event 2',
  },
  {
    start: '2024-02-01T09:21:00.000Z',
    end: '2024-02-01T12:35:00.000Z',
    name: 'Event 3',
  },
];

export const DAYS_COUNT = 7;
export const PERIODS_COUNT = 48;

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function generateCalendar(date: Date) {
  let calendarDays: CalendarCell[][] = [];

  for (let i = 0; i < DAYS_COUNT; i++) {
    const day = [];

    for (let j = 0; j < PERIODS_COUNT; j++) {
      const start = date.toISOString();
      date.setMinutes(date.getMinutes() + 30);
      const end = date.toISOString();

      const event = findRelatedEvent(start, end, events);

      day[j] = {
        start: start,
        end: end,
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
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

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
