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
import { useEffect, useState } from 'react';
import { CalendarCell, CalendarEvent } from '@/interface/calendar.interface';
import CreateEventForm, { State } from './create-event-form';
import { z } from 'zod';
import Modal from '../modal/modal';

const numberValidator = (min: number, max: number) => {
  return z.preprocess(
    (a: unknown) => parseInt(a as string, 10),
    z.number().min(min).max(max)
  );
};

const createEventSchema = z
  .object({
    name: z.string(),
    startHour: numberValidator(0, 24),
    startMinute: numberValidator(0, 59),
    endHour: numberValidator(0, 24),
    endMinute: numberValidator(0, 59),
  })
  .refine((schema) => schema.startHour < schema.endHour);

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [cell, setCell] = useState<CalendarCell>({
    start: '',
    end: '',
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

  const moveDate = (move: number) => {
    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + move);

    const isoString = nextDate.toISOString();
    setStartDate(isoString);
  };

  const modalOpen = (cell: CalendarCell) => {
    console.log(cell.start, cell.end);
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
                style={cell.event ? { border: 'none' } : {}}
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
          submit={(state: State, formData: FormData) => {
            const validatedFields = createEventSchema.safeParse({
              name: formData.get('name'),
              startHour: formData.get('startHour'),
              startMinute: formData.get('startMinute'),
              endHour: formData.get('endHour'),
              endMinute: formData.get('endMinute'),
            });

            if (validatedFields.success) {
              const { name, startHour, startMinute, endHour, endMinute } =
                validatedFields.data;
              const start = new Date(cell.start);
              start.setHours(startHour);
              start.setMinutes(startMinute);
              const end = new Date(cell.start);
              end.setHours(endHour);
              end.setMinutes(endMinute);

              setEvents([
                ...events,
                {
                  name: name,
                  start: start.toISOString(),
                  end: end.toISOString(),
                },
              ]);

              setModalOpen(false);
              return { message: '' };
            }
            return { message: 'The input is incorrect' };
          }}
        />
      </Modal>
    </div>
  );
}
