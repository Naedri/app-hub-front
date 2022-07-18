import { IonMenu, IonContent, IonList, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import type { TFunction } from 'i18next';
import type { FC } from 'react';
import React from 'react';

import { capitalizeFirstLetter } from '../../utils/format';
import MailItem from '../MailItem';

import './Menu.module.css';

export type MenuProps = {
  t: TFunction;
  contentId?: string;
};

const Menu: FC<MenuProps> = ({ t, contentId = 'main' }: MenuProps) => {
  return (
    <IonMenu side="start" contentId={contentId} menuId="main-menu" type="overlay">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{capitalizeFirstLetter(t('menu'))}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={false} className="ion-padding">
        <IonList lines="none">
          <MailItem label={t('contact')} />
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
