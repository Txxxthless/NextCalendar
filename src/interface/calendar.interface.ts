export interface CalendarCell {
  start: string;
  end: string;
  event: CalendarEvent | null;
}

export interface CalendarEvent {
  start: string;
  end: string;
  name: string;
}
