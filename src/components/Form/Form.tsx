import type { CSSProperties, FC, LegacyRef } from 'react';
import React from 'react';

import './Form.module.css';

export interface FormProps {
  children: any;
  onSubmit?: (e?: any) => void;
  ref?: LegacyRef<HTMLFormElement>;
  style?: CSSProperties;
}

const Form: FC<FormProps> = ({ children, onSubmit, ref = undefined, style = undefined }: FormProps) => {
  return (
    <form className="form" onSubmit={onSubmit} ref={ref} style={style}>
      {children}
    </form>
  );
};

export default Form;
