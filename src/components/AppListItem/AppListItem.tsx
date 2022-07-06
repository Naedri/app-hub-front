import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import type { IApp } from '../../utils/interfaces/iapp';

import './AppListItem.module.css';

export interface AppListItemProps {
  app: IApp;
}

const AppListItem: FC<AppListItemProps> = ({ app }) => {
  return (
    <IonItem routerLink={`${app.url}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {app.name}
          <span className="date">
            <IonNote>{app.id}</IonNote>
          </span>
        </h2>
        <h3>{app.landingPage}</h3>
        {app?.description ? (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        ) : (
          <div>Description not found</div>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default AppListItem;
