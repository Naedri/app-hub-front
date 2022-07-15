import { IonItem, IonLabel, IonNote, IonText } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import './AppListNoItem.module.css';

export interface AppListNoItemProps {
  title: string;
  textHelp?: string;
  textError?: string;
}

const AppListNoItem: FC<AppListNoItemProps> = ({ title, textHelp, textError }: AppListNoItemProps) => {
  return (
    <IonItem key={0}>
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="help">{textHelp}</IonNote> : <></>}
      {textError ? <IonNote slot="error">{textError}</IonNote> : <></>}
    </IonItem>
  );
};

export default AppListNoItem;
