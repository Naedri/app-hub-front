import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import { warningOutline, warningSharp } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Header from '../../components/Header';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import '../../theme/variables.css';

/* Component CSS */
import './NotFound.module.css';

const NotFound: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation('notFound');

  return (
    <IonPage>
      <Header pageTitle={t('NotFoundPageTitle')} i18n={i18n} t={t}></Header>
      <IonContent fullscreen>
        <h3>
          <IonIcon md={warningSharp} ios={warningOutline} /> {t('message')}
        </h3>
        <IonList>
          {t('choice')}
          <IonItem>
            <IonButton onClick={() => history.push('/')}>
              {t('goTo')} {t('previousPage')}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => history.push('/home')}>
              {t('goTo')} {t('HomePageTitle')}
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
