'use client';

import Event from './event';
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
        {calendarHeaders.map((header, index) => (
          <div className="calendar__header__cell" key={index}>
            {header}
          </div>
        ))}
      </div>
      <div className="calendar__main">
        <div className="calendar__main__periods">
          {timePeriods.map((period, index) => (
            <div className="calendar__main__periods__cell" key={index}>
              {index % 2 !== 0 ? period : ''}
            </div>
          ))}
        </div>
        {calendar.map((day, index) => (
          <div className="calendar__main__day" key={index}>
            {day.map((cell, index) => (
              <div
                className="calendar__main__day__cell"
                key={index}
                onClick={() => console.log(cell.start, cell.end)}
                style={cell.event ? { border: 'none' } : {}}
              >
                {cell.event ? <Event cell={cell}></Event> : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
