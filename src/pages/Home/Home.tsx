import type { RefresherEventDetail } from '@ionic/react';
import {
  IonItem,
  IonRow,
  IonCol,
  IonGrid,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from '@ionic/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AppDetail from '../../components/AppDetail';
import Header from '../../components/Header';
import ItemAlert from '../../components/ItemAlert';
import Menu from '../../components/Menu';
import { defaultState as userDefaultState, UserContext } from '../../contexts/user.context';
import { getApps } from '../../services/rest/apps';
import { Page } from '../../types/enums/pages';
import type { Role } from '../../types/enums/roles';
import type { Application, PrivateApplication } from '../../types/interfaces/application';
import type { ErrorFromServer } from '../../types/interfaces/error';
import { pascalToKebab } from '../../utils/format.case';
import { formatError, describeServerError } from '../../utils/format.error';

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
        <IonGrid>
          {apps?.length > 0 ? (
            apps?.map((app) => {
              return (
                <IonRow className="ion-justify-content-center" key={app.id}>
                  <IonCol size="8">
                    <IonItem className="ion-padding" detail={false}>
                      <AppDetail
                        app={app}
                        token={stateUser?.user?.token}
                        isAccessible={(app as PrivateApplication)?.baseURL != undefined}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              );
            })
          ) : (
            <IonRow className="ion-justify-content-center">
              <IonCol size="6">
                <ItemAlert
                  title={t('noContent')}
                  textHelp={logError ? t('reloadApp') : stateUser?.user?.token ? '' : t('contactToSeeApps')}
                  textError={logError ? describeServerError(t, logError) : ''}
                />
              </IonCol>
            </IonRow>
          )}
          {stateUser?.user?.token ? (
            <></>
          ) : (
            <IonRow className="ion-justify-content-center">
              <IonCol size="6">
                <ItemAlert
                  title={t('notConnected')}
                  textHelp={logError ? t('reloadApp') : t('connectToSeeApps')}
                  textError={logError ? describeServerError(t, logError) : ''}
                />
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
