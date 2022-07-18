import type { CSSProperties, FC, LegacyRef } from 'react';
import React from 'react';

import './Form.module.css';

export interface FormProps {
  children: any;
  onSubmit?: (e?: any) => void;
  ref?: LegacyRef<HTMLFormElement>;
  style?: CSSProperties;
  className?: string;
}

const Form: FC<FormProps> = ({ children, onSubmit, ref = undefined, style = undefined, className }: FormProps) => {
  return (
    <form className={className} onSubmit={onSubmit} ref={ref} style={style}>
      {children}
    </form>
  );
};

export default Form;
