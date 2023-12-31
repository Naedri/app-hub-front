import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage } from '@ionic/react';
import { arrowBackOutline, homeOutline, warningOutline, warningSharp } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { Page } from '../../types/enums/pages';
import { pascalToKebab } from '../../utils/format.case';

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

const page = Page.NotFound;
const id = `${pascalToKebab(page)}-page`;

const NotFound: React.FC = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation('notFound');

  return (
    <IonPage id={id}>
      <Menu t={t} />
      <Header page={page} i18n={i18n} t={t} />
      <IonContent fullscreen>
        <h3>
          <IonIcon md={warningSharp} ios={warningOutline} /> {t('message')}
        </h3>
        <IonList>
          {t('choice')}
          <IonItem>
            <IonButton routerLink="/home" routerDirection="root">
              <IonIcon slot="start" icon={homeOutline} />
              {t('goTo')} {t('HomePageTitle')}
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => history.goBack()} routerDirection="back">
              <IonIcon slot="start" icon={arrowBackOutline} />
              {t('goTo')} {t('previousPage')}
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
