'use client';

import { useFormState } from 'react-dom';
import NumberInput from '../number-input/number-input';
import { createEvent } from '@/app/actions/calendar.actions';
import { CalendarCell } from '@/interface/calendar.interface';
import { useEffect } from 'react';

export interface State {
  message?: string | null;
}

export default function CreateEventForm({
  cell,
  afterAction,
}: {
  cell: CalendarCell;
  afterAction: () => void;
}) {
  const initialState: State = { message: null };
  const [state, dispatch] = useFormState(createEvent, initialState);

  useEffect(() => {
    if (state.message !== initialState.message) {
      afterAction();
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      <input type="text" name="name" placeholder="Event name"></input>
      <div className="hour-input">
        <NumberInput name={'startHour'} min={0} max={24} placeholder={'Hour'} />
        <NumberInput
          name={'startMinute'}
          min={0}
          max={59}
          placeholder={'Minute'}
        />
      </div>
      <div className="hour-input">
        <NumberInput name={'endHour'} min={0} max={24} placeholder={'Hour'} />
        <NumberInput
          name={'endMinute'}
          min={0}
          max={59}
          placeholder={'Minute'}
        />
      </div>
      <input type="hidden" value={cell.startsAt} name="startsAt"></input>
      <input type="hidden" value={cell.endsAt} name="endsAt"></input>
      <button className="btn" type="submit">
        Add event
      </button>
      {state.message}
    </form>
  );
}
