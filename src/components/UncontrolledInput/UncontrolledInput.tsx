import type { FC, RefObject } from 'react';
import React from 'react';

import Field from '../Field/Field';

import './UncontrolledInput.module.css';

export interface UncontrolledInputProps {
  id: string;
  type?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  pattern?: string;
  ref?: RefObject<HTMLInputElement>;
}

const UncontrolledInput: FC<UncontrolledInputProps> = ({
  id,
  type = 'text',
  name,
  required = false,
  placeholder = '',
  label = undefined,
  defaultValue = undefined,
  pattern = undefined,
  ref = undefined,
  ...rest
}: UncontrolledInputProps) => {
  return (
    <Field>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        pattern={pattern}
        defaultValue={defaultValue}
        required={required}
        className="field__input"
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    </Field>
  );
};

export default { UncontrolledInput };
