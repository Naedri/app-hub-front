import type { FC } from 'react';
import React from 'react';

import './Field.module.css';

export interface FieldProps {
  children: any;
}

const Field: FC<FieldProps> = ({ children }: FieldProps) => {
  return <div className="field">{children} </div>;
};

export default Field;
