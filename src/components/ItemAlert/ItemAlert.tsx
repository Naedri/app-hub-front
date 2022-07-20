import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import './ItemAlert.module.css';

export interface ItemAlertProps {
  title: string;
  textHelp?: string;
  textError?: string;
}

const ItemAlert: FC<ItemAlertProps> = ({ title, textHelp, textError }: ItemAlertProps) => {
  const [help, setHelp] = useState(textHelp);
  const [error, setError] = useState(textError);

  useEffect(() => {
    setHelp(textHelp);
    setError(textError);
    return () => {
      // run only before component is removed from UI
      setHelp(undefined);
      setError(undefined);
    };
  }, [textHelp, textError]);

  return (
    <IonItem lines="none">
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="helper">{help}</IonNote> : <></>}
      {textError ? <IonNote slot="">{error}</IonNote> : <></>}
    </IonItem>
  );
};

export default ItemAlert;
