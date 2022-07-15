import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import './AppListInfoItem.module.css';

export interface AppListInfoItemProps {
  textTitle: string;
  textHelp?: string;
  textError?: string;
}

const AppListInfoItem: FC<AppListInfoItemProps> = ({ textTitle, textHelp, textError }: AppListInfoItemProps) => {
  return (
    <IonItem>
      <IonLabel className="ion-text-wrap">{textTitle}</IonLabel>
      {textHelp ? <IonNote slot="help">{textHelp}</IonNote> : <></>}
      {textError ? <IonNote slot="error">{textError}</IonNote> : <></>}
    </IonItem>
  );
};

export default AppListInfoItem;
