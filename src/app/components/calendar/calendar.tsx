'use client';

import './style.scss';
import { generateCalendar, getCalendarHeaders, getTimePeriods } from './utils/calendar.utils';

export default function Calendar() {
    generateCalendar();
    return <div className="calendar"></div>;
}
