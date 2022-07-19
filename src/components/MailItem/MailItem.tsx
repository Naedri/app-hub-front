import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React from 'react';

import { capitalizeFirstLetter } from '../../utils/format.case';

import './MailItem.module.css';

export interface MailItemProps {
  label: string;
  key?: string;
}

const mail = process.env.react_app_ms_users_front_mail_contact || 'contact@mail.com';

const MailItem: FC<MailItemProps> = ({ label, key }: MailItemProps) => {
  return (
    <IonItem
      detail={false}
      key={key}
      button
      href={`mailto:${mail}`}
      onClick={() => {
        window.alert(mail);
        // window?.open(`mailto:${mail}`, '_blank')?.focus();
      }}
    >
      <IonIcon icon={sendOutline} slot="start" />
      <IonLabel>{capitalizeFirstLetter(label)}</IonLabel>
    </IonItem>
  );
};

export default MailItem;
