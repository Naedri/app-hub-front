import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React, { useRef, useEffect, useState } from 'react';

import './AppListInfoItem.module.css';

export interface AppListInfoItemProps {
  textTitle: string;
  textHelp?: string;
  textError?: string;
}

const AppListInfoItem: FC<AppListInfoItemProps> = ({ textTitle, textHelp, textError }: AppListInfoItemProps) => {
  const [title, setTitle] = useState(textTitle);
  const [help, setHelp] = useState(textHelp);
  const [error, setError] = useState(textError);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // return early if first render
    }
    setTitle(textTitle);
    setHelp(textHelp);
    setError(textError);
  }, [textTitle, textHelp, textError]);

  return (
    <IonItem>
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="helper">{help}</IonNote> : <></>}
      {textError ? <IonNote slot="">{error}</IonNote> : <></>}
    </IonItem>
  );
};

export default AppListInfoItem;
