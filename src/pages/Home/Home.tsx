import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppListItem from '../../components/AppListItem';
import Header from '../../components/Header';
import { getApps } from '../../services/rest/apps';
import type { Application } from '../../utils/interfaces/application';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import '../../theme/variables.css';

/* Component CSS */
import './Home.module.css';

const Home: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);

  const { t, i18n } = useTranslation('home');

  useIonViewWillEnter(async () => {
    // const apps = getLocalApps();
    const apps = await getApps();
    if (apps) setApps(apps);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <Header pageTitle={t('HomePageTitle')} i18n={i18n} t={t} />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {apps.map((app) => (
            <AppListItem app={app} key={app.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
