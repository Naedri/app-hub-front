import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React, { useRef, useEffect, useState } from 'react';

import './AppListInfoItem.module.css';

export interface AppListInfoItemProps {
  title: string;
  textHelp?: string;
  textError?: string;
}

const AppListInfoItem: FC<AppListInfoItemProps> = ({ title, textHelp, textError }: AppListInfoItemProps) => {
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
    <IonItem>
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="helper">{help}</IonNote> : <></>}
      {textError ? <IonNote slot="">{error}</IonNote> : <></>}
    </IonItem>
  );
};

export default AppListInfoItem;
