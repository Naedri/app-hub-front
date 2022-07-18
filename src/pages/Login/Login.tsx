import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonRow,
} from '@ionic/react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Form from '../../components/Form';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { UserContext } from '../../contexts/user.context';
import { login, parseUserToken } from '../../services/rest/auth';
import { Page } from '../../types/enums/pages';
import type { ErrorFromServer } from '../../types/interfaces/error';
import { pascalToKebab, capitalizeFirstLetter } from '../../utils/format';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import '../../theme/variables.css';

/* Component CSS */
import './Login.module.css';

const page = Page.Login;
const id = `${pascalToKebab(page)}-page`;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [logError, setError] = useState<ErrorFromServer | null>(null);
  const [logSuccess, setLogSuccess] = useState(false);
  const { stateUser, dispatchUser } = useContext(UserContext);

  const history = useHistory();
  const { t, i18n } = useTranslation('auth');

  async function logInUser(event: Event): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);

    //TODO improve type of form
    const email: string = (event.target as any).email.value;
    const password: string = (event.target as any).password.value;
    const { accessToken, error } = await login({ email, password });

    setLoading(false);

    if (accessToken) {
      const user = parseUserToken(accessToken);
      user.email = email;
      dispatchUser({ ...stateUser, user: user });
      setError(error);
      setLogSuccess(true);
      history.push('/home');
    } else {
      if (error?.response?.status === 404) {
        error.message = `${t('invalidIdentification')} ${t('tryAgain')}`;
      } else {
        error.message = `${t('errorUnknown')}`;
      }
      dispatchUser({ ...stateUser, user: undefined });
      setError(error);
      setLogSuccess(false);
    }
  }

  return (
    <IonPage id={id}>
      <Menu t={t} />
      <Header page={page} i18n={i18n} t={t} />

      <IonContent fullscreen>
        <Form onSubmit={logInUser}>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonCard>
                  <IonLabel> {capitalizeFirstLetter(t('email'))} </IonLabel>
                  <IonInput id="email" type="email" name="email" required />
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonCard>
                  <IonLabel> {capitalizeFirstLetter(t('password'))} </IonLabel>
                  <IonInput id="password" type="password" name="password" required />
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonButton type="submit" color="primary" expand="full" shape="round" disabled={loading}>
                  {loading ? t('loading') : t('login')}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3.5">
                <IonLabel>{t('qMissingAccount')}</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonButton
                  color="tertiary"
                  expand="full"
                  shape="round"
                  onClick={() => history.push('/register')}
                  disabled={loading}
                >
                  {t('signup')}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                {logError && <p className="error">{logError.message}</p>}
                {logSuccess && <p>{t('redirectingToProfile')}</p>}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
