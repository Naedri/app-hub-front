import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow } from '@ionic/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import type { User } from '../../utils/interfaces/user';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import '../../theme/variables.css';

/* Component CSS */
import './Register.module.css';

function handleChange(e: Event): void {
  throw new Error('Function not implemented.');
}

function createUser(): void {
  throw new Error('Function not implemented.');
}

function Register(): JSX.Element {
  const [user, setUser] = useState<User>();

  // const [showAlert, setShowAlert] = useState<boolean>(false);
  // const [messageAlert, setMessageAlert] = useState<string>();

  const history = useHistory();
  const { t, i18n } = useTranslation('auth');

  return (
    <IonPage>
      <Header pageTitle={t('RegisterPageTitle')} i18n={i18n} t={t} />

      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="6" offset="3">
              <IonItem>
                <IonLabel position="stacked">
                  <strong>{t('email')}</strong>
                </IonLabel>
                <IonInput
                  value={user?.email}
                  placeholder="Email"
                  name="email"
                  onIonBlur={(e) => handleChange(e)}
                  clearInput
                >
                  {' '}
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="6" offset="3">
              <IonItem>
                <IonLabel position="stacked">
                  <strong>{t('password')}</strong>
                </IonLabel>
                <IonInput
                  value={user?.password}
                  placeholder="Password"
                  type="password"
                  name="password"
                  onIonBlur={(e: Event) => handleChange(e)}
                  clearInput
                >
                  {' '}
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-align-items-center">
            <IonCol size="6" offset="3">
              <IonButton color="primary" expand="full" shape="round" onClick={() => createUser()}>
                {t('register')}
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-align-items-center">
            <IonCol size="6" offset="3">
              <IonButton color="light" expand="full" shape="round" onClick={() => history.push('/')}>
                {t('LoginPageTitle')}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Register;
