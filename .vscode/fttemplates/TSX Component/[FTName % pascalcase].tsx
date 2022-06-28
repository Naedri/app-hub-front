import React from 'react';
import './[FTName % pascalcase].module.css';

type [FTName % pascalcase]Props = {}

export default function [FTName % pascalcase]({
  disabled = false,
  onClick = () => {},
  defaultValue = undefined,
  children,
  type = '[FTName % lowercase]',
}: {
  disabled?: boolean;
  onClick?: (e?: any) => void;
  defaultValue?: string;
  children: any;
  type?: 'submit' | 'reset' | '[FTName % lowercase]';
}): JSX.Element {
  return (
      <[FTName % lowercase] defaultValue={defaultValue} className="[FTName % lowercase]" disabled={disabled} onClick={onClick} type={type}>
          {children}
      </[FTName % lowercase]>
  );
}

export default [FTName % pascalcase];