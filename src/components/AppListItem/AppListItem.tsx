import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { Application } from '../../utils/interfaces/application';

import './AppListItem.module.css';

export interface AppListItemProps {
  app: Application;
  key?: number;
}

const AppListItem: FC<AppListItemProps> = ({ app }, key = app.id) => {
  const { i18n } = useTranslation('app');

  const getDescription = (): React.ReactNode => {
    // if (!app?.description) return t('noDescription');
    if (!app?.description) return <></>;
    const content = app.description[i18n.language] ? app.description[i18n.language] : app.description['en'];
    return <p>{content}</p>;
  };

  return (
    <IonItem routerLink={`${app.url}`} detail={false} key={key}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {app.name}
          <span className="date">
            <IonNote>{app.id}</IonNote>
          </span>
        </h2>
        {app.landingPage ? <h3>{app.landingPage}</h3> : <></>}
        {getDescription()}
      </IonLabel>
    </IonItem>
  );
};

export default AppListItem;
