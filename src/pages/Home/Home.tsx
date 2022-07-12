import { IonContent, IonList, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppListItem from '../../components/AppListItem';
import Header from '../../components/Header';
import { UserContext } from '../../contexts/user.context';
import { discoverApps, getApps } from '../../services/rest/apps';
import { Role } from '../../types/enums/roles';
import type { Application } from '../../types/interfaces/application';

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

export interface HomeProps {
  role?: Role;
  token?: string;
}

const Home: React.FC<HomeProps> = ({ role = Role.CLIENT, token }: HomeProps) => {
  const [apps, setApps] = useState<Application[]>([]);
  const { stateUser, dispatchUser } = useContext(UserContext);

  const { t, i18n } = useTranslation('home');

  useIonViewWillEnter(async () => {
    // const apps = getLocalApps();
    let apps: Application[] | undefined = [];
    if (stateUser?.user?.token) {
      apps = await getApps(stateUser.user.token);
    } else {
      apps = (await discoverApps()).apps;
    }
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
