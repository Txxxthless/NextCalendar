'use client';

import Event from './event';
import './style.scss';
import {
  generateCalendar,
  getCalendarHeaders,
  getStartDate,
  getTimePeriods,
} from './utils/calendar.utils';
import Image from 'next/image';

import arrowRight from '../../../../public/icons/arrow.svg';
import { useState } from 'react';

export default function Calendar() {
  const [startDate, setStartDate] = useState(getStartDate().toISOString());
  const [calendar, setCalendar] = useState(
    generateCalendar(new Date(startDate))
  );
  const timePeriods = getTimePeriods();
  const [calendarHeaders, setCalendarHeaders] = useState(
    getCalendarHeaders(new Date(startDate))
  );

  const moveDate = (move: number) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + move);
    const isoString = nextDate.toISOString();
    setStartDate(isoString);
    const newCalendar = generateCalendar(new Date(isoString));
    setCalendar(newCalendar);
    const newHeaders = getCalendarHeaders(new Date(isoString));
    setCalendarHeaders(newHeaders);
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div
          className="calendar__header__cell arrow-left"
          onClick={() => moveDate(-7)}
        >
          <Image src={arrowRight} alt="right" />
        </div>
        <div
          className="calendar__header__cell arrow-right"
          onClick={() => moveDate(7)}
        >
          <Image src={arrowRight} alt="right" />
        </div>
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
