import { IonIcon, IonLabel, IonButton, IonSpinner } from '@ionic/react';
import { shapesOutline, searchOutline, lockOpenOutline, lockClosedOutline, openOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Application } from '../../types/interfaces/application';
import { getDescription, getAccessUrl } from '../../utils/format.app';

import './AppDetail.module.css';

export interface AppDetailProps {
  app: Application;
  key?: number;
  token?: string;
  isAccessible: boolean;
}

const AppDetail: FC<AppDetailProps> = ({ app, key = app?.id, token, isAccessible }: AppDetailProps) => {
  const { i18n } = useTranslation('app');
  const [userToken, setToken] = useState<string | undefined>(token);
  const [accessible, setAccessible] = useState<boolean>(isAccessible);
  const [accessUrl, setAccessUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setAccessible(isAccessible);
  }, [isAccessible]);
  useEffect(() => {
    setToken(token);
  }, [token]);

  const handleRequest = async () => {
    setLoading(true);
    if (accessible && userToken) {
      const url = await getAccessUrl(userToken, app);
      if (url) setAccessUrl(url);
    }
    setLoading(false);
  };

  return (
    <>
      <IonIcon slot="start" icon={shapesOutline} color="Light" />
      <IonLabel className="ion-text-wrap">
        <h2>{app.name}</h2>
        {getDescription(app, i18n)}
      </IonLabel>

      <IonButton
        fill="clear"
        id="button-landing"
        disabled={!Object.prototype.hasOwnProperty.call(app, 'landingPage')}
        onClick={() => {
          if (app?.landingPage) window?.open(app.landingPage, '_blank')?.focus();
        }}
      >
        <IonIcon icon={searchOutline} slot="icon-only" />
      </IonButton>

      <IonButton
        fill="clear"
        disabled={!accessible || accessUrl != undefined}
        id="button-request"
        onClick={() => handleRequest()}
      >
        <IonIcon
          icon={accessUrl ? lockOpenOutline : lockClosedOutline}
          slot="icon-only"
          color={userToken ? 'primary' : 'warning'}
        />
      </IonButton>

      <IonButton
        fill="clear"
        disabled={!accessUrl}
        id="button-app"
        onClick={() => {
          if (accessUrl) window?.open(`http://${accessUrl}`, '_blank')?.focus();
        }}
      >
        <IonIcon icon={openOutline} slot="icon-only" color="primary" />
      </IonButton>
      {loading && <IonSpinner name="lines-small" color="primary" />}
    </>
  );
};

export default AppDetail;
