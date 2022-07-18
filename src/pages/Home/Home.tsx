import type { RefresherEventDetail } from '@ionic/react';
import { IonContent, IonList, IonPage, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppListInfoItem from '../../components/AppListInfoItem';
import AppListItem from '../../components/AppListItem';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { defaultState as userDefaultState, UserContext } from '../../contexts/user.context';
import { getApps } from '../../services/rest/apps';
import { Page } from '../../types/enums/pages';
import type { Role } from '../../types/enums/roles';
import type { Application } from '../../types/interfaces/application';
import type { ErrorFromServer } from '../../types/interfaces/error';
import { formatError, describeError, pascalToKebab } from '../../utils/format';

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

const page = Page.Home;
const id = `${pascalToKebab(page)}-page`;

const Home: React.FC<HomeProps> = () => {
  const { t, i18n } = useTranslation('home');
  const { stateUser, dispatchUser } = useContext(UserContext);
  const [apps, setApps] = useState<Application[]>([]);
  const [logError, setError] = useState<ErrorFromServer | null>(null);

  async function loadApps() {
    const response = await getApps(stateUser?.user?.token);
    if (response?.error != null) {
      setError(formatError(response?.error));
      if (stateUser?.user?.token && response?.error?.code == 401) {
        //token may have expired
        dispatchUser(userDefaultState);
      }
    } else {
      setError(null);
    }
    if (response?.apps?.length > 0) {
      setApps(response?.apps);
    } else {
      setApps([]);
    }
  }

  useIonViewWillEnter(async () => {
    await loadApps();
  }, [stateUser?.user?.token]);

  const refresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadApps();
    setTimeout(() => {
      event.detail.complete();
    }, 1500);
  };

  return (
    <IonPage id={id}>
      <Menu t={t} />
      <Header page={page} i18n={i18n} t={t} user={stateUser?.user} />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {apps?.length > 0 ? (
            apps?.map((app) => <AppListItem app={app} key={app.id} />)
          ) : (
            <AppListInfoItem
              title={t('noContent')}
              textHelp={logError ? t('reloadApp') : stateUser?.user?.token ? '' : t('contactToSeeApps')}
              textError={logError ? describeError(t, logError) : ''}
            />
          )}

          {stateUser?.user?.token ? (
            <></>
          ) : (
            <AppListInfoItem
              title={t('notConnected')}
              textHelp={logError ? t('reloadApp') : t('connectToSeeApps')}
              textError={logError ? describeError(t, logError) : ''}
            />
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
