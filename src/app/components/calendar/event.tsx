'use client';

import { CalendarCell, CalendarEvent } from '@/interface/calendar.interface';

function getEventClass(cell: CalendarCell) {
  if (!cell.event) {
    return '';
  }

  if (cell.event.start < cell.start && cell.event.end > cell.end) {
    return 'middle';
  }

  if (cell.event.start >= cell.start && cell.event.end <= cell.end) {
    return 'single';
  }

  if (cell.event.start >= cell.start) {
    return 'start';
  }

  return 'end';
}

function getEventStyle(cell: CalendarCell) {
  if (!cell.event) {
    return {};
  }

  const eventClass = getEventClass(cell);
  const eventStart = new Date(cell.event.start);
  const eventEnd = new Date(cell.event.end);

  if (eventClass === 'start') {
    const eventMinutes = eventStart.getMinutes();
    const periodMinutes = eventMinutes < 30 ? eventMinutes : eventMinutes - 30;
    return { top: `${(100 / 30) * periodMinutes}%` };
  }

  if (eventClass === 'end') {
    const eventMinutes = eventEnd.getMinutes();
    const periodMinutes = eventMinutes < 30 ? eventMinutes : eventMinutes - 30;
    return { top: `-${(100 / 30) * periodMinutes}%` };
  }

  return {};
}

export default function Event({ cell }: { cell: CalendarCell }) {
  const eventClass = getEventClass(cell);
  const eventStyle = getEventStyle(cell);
  const name = cell.event ? cell.event.name : '';

  return (
    <div className={'event ' + eventClass} style={eventStyle}>
      {eventClass === 'start' || eventClass === 'single' ? name : ''}
    </div>
  );
}
