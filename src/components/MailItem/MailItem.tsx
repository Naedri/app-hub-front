import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React from 'react';

import { capitalizeFirstLetter } from '../../utils/format';

import './MailItem.module.css';

export interface MailItemProps {
  label: string;
  key?: string;
}

const MailItem: FC<MailItemProps> = ({ label, key }: MailItemProps) => {
  return (
    <IonItem detail={false} key={key}>
      <IonIcon icon={sendOutline} slot="start" />
      <IonLabel>{capitalizeFirstLetter(label)}</IonLabel>
    </IonItem>
  );
};

export default MailItem;
