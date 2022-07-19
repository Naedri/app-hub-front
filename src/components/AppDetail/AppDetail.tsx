import { IonIcon, IonLabel, IonButton, IonSpinner, IonItem } from '@ionic/react';
import {
  shapesOutline,
  searchOutline,
  lockOpenOutline,
  lockClosedOutline,
  reloadOutline,
  openOutline,
} from 'ionicons/icons';
import type { FC } from 'react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Application } from '../../types/interfaces/application';
import { getDescription, getAccessUrl } from '../../utils/format.app';

import './AppDetail.module.css';

export interface AppDetailProps {
  app: Application;
  key?: number;
  token?: string;
}

const AppDetail: FC<AppDetailProps> = ({ app }, key = app.id, token = undefined) => {
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

export default AppDetail;
