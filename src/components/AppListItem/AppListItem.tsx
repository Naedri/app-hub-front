import { IonButton, IonIcon, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import type { i18n } from 'i18next';
import {
  lockClosedOutline,
  lockOpenOutline,
  openOutline,
  reloadOutline,
  searchOutline,
  shapesOutline,
} from 'ionicons/icons';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getAccess } from '../../services/rest/apps';
import type { Application, PrivateApplication } from '../../types/interfaces/application';
import Logger from '../../utils/logger';

import './AppListItem.module.css';

export interface AppListItemProps {
  app: Application;
  key?: number;
  token?: string;
}

const AppListItem: FC<AppListItemProps> = ({ app }, key = app.id, token = undefined) => {
  const { i18n } = useTranslation('app');
  const [accessUrl, setAccessUrl] = useState<string>('');
  const [accessible, setAccessible] = useState<boolean>(Object.prototype.hasOwnProperty.call(app, 'baseURL'));
  const [loading, setLoading] = useState(false);

  return (
    <IonItem className="ion-padding" key={key} detail={false}>
      <IonIcon slot="start" icon={shapesOutline} color="Light" />
      <IonLabel className="ion-text-wrap">
        <h2>{app.name}</h2>
        {getDescription(app, i18n)}
      </IonLabel>

      <IonButton
        fill="clear"
        disabled={!Object.prototype.hasOwnProperty.call(app, 'landingPage')}
        onClick={() => {
          if (app?.landingPage) window?.open(app.landingPage, '_blank')?.focus();
        }}
      >
        <IonIcon icon={searchOutline} slot="icon-only" />
      </IonButton>

      <IonButton
        fill="clear"
        disabled={!accessible}
        onClick={async () => {
          setLoading(true);
          if (accessible && token != undefined) {
            const url = await getAccessUrl(token, app);
            if (url) setAccessUrl(url);
          }
          setLoading(false);
        }}
      >
        <IonIcon
          icon={accessUrl ? lockOpenOutline : lockClosedOutline}
          slot="icon-only"
          color={token != undefined ? undefined : 'primary'}
        />
      </IonButton>

      <IonButton
        fill="clear"
        disabled={!accessUrl}
        onClick={() => {
          if (accessUrl) window?.open(accessUrl, '_blank')?.focus();
        }}
      >
        <IonIcon icon={loading ? reloadOutline : openOutline} slot="icon-only" color="primary" />
      </IonButton>
      {loading && <IonSpinner name="lines-small" color="primary" />}
    </IonItem>
  );
};

export default AppListItem;

const getDescription = (app: Application, i18n: i18n): React.ReactNode => {
  // if (!app?.description) return t('noDescription');
  if (!app?.description) return <></>;
  const content = app.description[i18n.language] ? app.description[i18n.language] : app.description['en'];
  return <p>{content}</p>;
};

async function getAccessUrl(token: string, app: Application): Promise<string | undefined> {
  try {
    const appP: PrivateApplication = app as unknown as PrivateApplication;
    if (appP?.baseURL) {
      Logger.info(`AppItem-${app.id}`, appP?.baseURL);
      return (await getAccess(token, app))?.accessUrl;
    } else {
      Logger.error(`AppItem-${app.id}`, 'missing baseURL attribute');
      Logger.warn(`AppItem-${app.id}`, JSON.stringify(appP));
    }
  } catch (error) {
    Logger.error(`AppItem-${app.id}`, 'impossible conversion from Application to PrivateApplication');
    Logger.warn(`AppItem-${app.id}`, JSON.stringify(app));
  }
}
