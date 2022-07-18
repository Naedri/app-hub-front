import { IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import type { ErrorClient } from '../../types/interfaces/error';

import './Input.module.css';

export interface InputProps {
  name: string;
  label?: string;
  errors?: ErrorClient;
}

const Input: FC<InputProps> = ({ name, label, errors }) => {
  return (
    <>
      <IonItem>
        {label && <IonLabel position="floating">{label}</IonLabel>}
        <IonInput aria-invalid={errors?.key ? 'true' : 'false'} aria-describedby={`${name}Error`} />
      </IonItem>
      {errors?.key && (
        <IonText color="danger" className="ion-padding-start">
          <small>
            <span role="alert" id={`${name}Error`}>
              {errors?.message}
            </span>
          </small>
        </IonText>
      )}
    </>
  );
};

export default Input;
