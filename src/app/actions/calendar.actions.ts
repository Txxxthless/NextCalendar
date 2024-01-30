'use server';

import { z } from 'zod';
import { State } from '../components/calendar/create-event-form';
import { sql } from '@vercel/postgres';
import { v4 as uuid } from 'uuid';
import { unstable_noStore as noStore } from 'next/cache';

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
    startsAt: z.string(),
    endsAt: z.string(),
  })
  .refine((schema) => schema.startHour < schema.endHour);

interface CalendarEventDTO {
  id: string;
  name: string;
  startsat: string;
  endsat: string;
}

export async function getEvents() {
  noStore();
  return sql<CalendarEventDTO>`SELECT * FROM Events`;
}

export async function createEvent(state: State, formData: FormData) {
  const validatedFields = createEventSchema.safeParse({
    name: formData.get('name'),
    startHour: formData.get('startHour'),
    startMinute: formData.get('startMinute'),
    endHour: formData.get('endHour'),
    endMinute: formData.get('endMinute'),
    startsAt: formData.get('startsAt'),
    endsAt: formData.get('endsAt'),
  });

  if (validatedFields.success) {
    const { name, startHour, startMinute, endHour, endMinute } =
      validatedFields.data;

    const cell = {
      startsAt: validatedFields.data.startsAt,
      endsAt: validatedFields.data.endsAt,
    };

    const startsAt = new Date(cell.startsAt);
    startsAt.setHours(startHour);
    startsAt.setMinutes(startMinute);
    const endsAt = new Date(cell.startsAt);
    endsAt.setHours(endHour);
    endsAt.setMinutes(endMinute);

    try {
      await sql`INSERT INTO Events (Id, Name, Startsat, Endsat) VALUES (${uuid()}, ${name}, ${startsAt.toISOString()}, ${endsAt.toISOString()})`;
    } catch (error) {
      console.log(error);
    }

    return { message: '' };
  }
  return { message: 'The input is incorrect' };
}
