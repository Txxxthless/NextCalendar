import { ChangeEvent } from 'react';

export default function NumberInput({
  name,
  min,
  max,
  placeholder,
}: {
  name: string;
  min: number;
  max: number;
  placeholder: string;
}) {
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let value = target.value;
    value = value.replace(/\D/g, '');

    if (value != '') {
      let number = parseInt(value, 10);

      if (number < min) {
        number = min;
      } else if (number > max) {
        number = max;
      }

      value = number.toString();
    }

    target.value = value;
  };

  return (
    <input onChange={onChange} name={name} placeholder={placeholder}></input>
  );
}
