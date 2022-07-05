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
import './Page404.module.css';

function Page404(): JSX.Element {
  const history = useHistory();
  const { t, i18n } = useTranslation('page404');

  return (
    <IonPage>
      <Header pageTitle={t('title')} i18n={i18n} t={t}></Header>
      <IonContent fullscreen>
        <h3>
          <strong>{t('error')} 404.</strong>
        </h3>
        <h3>
          <IonIcon md={warningSharp} ios={warningOutline} /> {t('message')}
        </h3>
        <IonList>
          {t('choice')}
          <IonItem>
            Go <a href="/home">home</a>
          </IonItem>
          <IonItem>
            Go <IonButton onClick={() => history.push('/')}> back </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Page404;
