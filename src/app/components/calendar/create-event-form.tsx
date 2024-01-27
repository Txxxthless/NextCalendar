'use client';

import { useFormState } from 'react-dom';
import NumberInput from '../number-input/number-input';

export interface State {
  message?: string | null;
}

export default function CreateEventForm({
  submit,
}: {
  submit: (prevState: State, formData: FormData) => State;
}) {
  const initialState = { message: null };
  const [state, dispatch] = useFormState(submit, initialState);

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
      <button className="btn" type="submit">
        Add event
      </button>
      {state.message}
    </form>
  );
}
