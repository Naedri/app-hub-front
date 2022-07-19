import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import './ItemAlert.module.css';

export interface ItemAlertProps {
  title: string;
  textHelp?: string;
  textError?: string;
}

const ItemAlert: FC<ItemAlertProps> = ({ title, textHelp, textError }: ItemAlertProps) => {
  const [help, setHelp] = useState(textHelp);
  const [error, setError] = useState(textError);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // return early if first render
    }
    setHelp(textHelp);
    setError(textError);
  }, [textHelp, textError]);

  return (
    <>
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="helper">{help}</IonNote> : <></>}
      {textError ? <IonNote slot="">{error}</IonNote> : <></>}
    </>
  );
};

export default ItemAlert;
