import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import './AppListInfoItem.module.css';

export interface AppListInfoItemProps {
  title: string;
  textHelp?: string;
  textError?: string;
}

const AppListInfoItem: FC<AppListInfoItemProps> = ({ title, textHelp, textError }: AppListInfoItemProps) => {
  return (
    <IonItem>
      <IonLabel className="ion-text-wrap">{title}</IonLabel>
      {textHelp ? <IonNote slot="help">{textHelp}</IonNote> : <></>}
      {textError ? <IonNote slot="error">{textError}</IonNote> : <></>}
    </IonItem>
  );
};

export default AppListInfoItem;
