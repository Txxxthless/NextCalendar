'use client';

import './style.scss';
import {
  generateCalendar,
  getCalendarHeaders,
  getTimePeriods,
} from './utils/calendar.utils';

export default function Calendar() {
  const calendar = generateCalendar();
  const timePeriods = getTimePeriods();
  const calendarHeaders = getCalendarHeaders();

  return (
    <div className="calendar">
      <div className="calendar__header">
        {calendarHeaders.map((header) => (
          <div className="calendar__header__cell">{header}</div>
        ))}
      </div>
      <div className="calendar__main">
        <div className="calendar__main__periods">
          {timePeriods.map((period) => (
            <div className="calendar__main__periods__cell">{period}</div>
          ))}
        </div>
        {calendar.map((day) => (
          <div className="calendar__main__day">
            {day.map((cell, index) => (
              <div className="calendar__main__day__cell">{index}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
