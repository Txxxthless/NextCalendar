export interface CalendarCell {
  startsAt: string;
  endsAt: string;
  event: CalendarEvent | null;
}

export interface CalendarEvent {
  startsAt: string;
  endsAt: string;
  name: string;
  id: string;
}
