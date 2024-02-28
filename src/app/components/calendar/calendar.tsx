'use client';

import Event, { getEventClass } from './event';
import './style.scss';
import {
  generateCalendar,
  getCalendarHeaders,
  getStartDate,
  getTimePeriods,
} from './utils/calendar.utils';
import Image from 'next/image';

import arrowRight from '../../../../public/icons/arrow.svg';
import { useEffect, useState } from 'react';
import { CalendarCell, CalendarEvent } from '@/interface/calendar.interface';
import CreateEventForm, { State } from './create-event-form';
import Modal from '../modal/modal';
import { getEvents } from '@/app/actions/calendar.actions';

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [cell, setCell] = useState<CalendarCell>({
    startsAt: '',
    endsAt: '',
    event: null,
  });

  const [startDate, setStartDate] = useState(getStartDate().toISOString());
  const [calendar, setCalendar] = useState(
    generateCalendar(new Date(startDate), events)
  );
  const timePeriods = getTimePeriods();
  const [calendarHeaders, setCalendarHeaders] = useState(
    getCalendarHeaders(new Date(startDate))
  );

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const calendar = generateCalendar(new Date(startDate), events);
    const calendarHeaders = getCalendarHeaders(new Date(startDate));
    setCalendarHeaders(calendarHeaders);
    setCalendar(calendar);
  }, [events, startDate]);

  const requestEvents = () => {
    getEvents().then(({ rows }) => {
      const responseEvents = rows.map((event) => {
        return {
          id: event.id,
          startsAt: event.startsat,
          endsAt: event.endsat,
          name: event.name,
        };
      });
      setEvents([...events, ...responseEvents]);
    });
  };

  useEffect(() => {
    requestEvents();
  }, []);

  const moveDate = (move: number) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + move);

    const isoString = nextDate.toISOString();
    setStartDate(isoString);
  };

  const modalOpen = (cell: CalendarCell) => {
    console.log(cell.startsAt, cell.endsAt);
    setCell(cell);
    setModalOpen(true);
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
                onClick={() => modalOpen(cell)}
                style={
                  cell.event &&
                  getEventClass(cell) !== 'end' &&
                  getEventClass(cell) !== 'single'
                    ? { border: 'none' }
                    : {}
                }
              >
                {cell.event ? <Event cell={cell} /> : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} close={() => setModalOpen(false)}>
        <p>Create new event</p>
        <CreateEventForm
          cell={cell}
          afterAction={() => {
            setModalOpen(false);
            requestEvents();
          }}
        />
      </Modal>
    </div>
  );
}
