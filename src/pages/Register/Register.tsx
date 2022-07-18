import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from '@ionic/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Form from '../../components/Form';
import Header from '../../components/Header';
import LabelItem from '../../components/LabelItem';
import Menu from '../../components/Menu';
import { register } from '../../services/rest/auth';
import { Page } from '../../types/enums/pages';
import type { ErrorFromServer } from '../../types/interfaces/error';
import type { User } from '../../types/interfaces/user';
import { pascalToKebab, formatError, describeError, capitalizeFirstLetter } from '../../utils/format';

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

const page = Page.Register;
const id = `${pascalToKebab(page)}-page`;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [logError, setError] = useState<ErrorFromServer | null>(null);
  const [logSuccess, setLogSuccess] = useState(false);

  // const { stateUser, dispatchUser } = useContext(UserContext);
  const [user, setUser] = useState<User>();

  // const [showAlert, setShowAlert] = useState<boolean>(false);
  // const [messageAlert, setMessageAlert] = useState<string>();

  const history = useHistory();
  const { t, i18n } = useTranslation('auth');

  async function registerUser(event: Event): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError(null);

    //TODO improve type of form
    const email: string = (event.target as any).email.value;
    const password: string = (event.target as any).password.value;
    const { user, error } = await register({ email, password });

    setLoading(false);

    if (user) {
      // dispatchUser({ ...stateUser, user: user });
      setUser(user);
      setError(null);
      setLogSuccess(true);
      history.push('/login');
    } else {
      // dispatchUser({ ...stateUser, user: undefined });
      setUser(undefined);
      setError(formatError(error));
      setLogSuccess(false);
    }
  }

  return (
    <IonPage id={id}>
      <Menu t={t} />
      <Header page={page} i18n={i18n} t={t} />

      <IonContent fullscreen>
        <Form onSubmit={registerUser} className="ion-padding">
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
                  <IonInput
                    id="password"
                    name="password"
                    type="password"
                    required
                    clearOnEdit
                    minlength={8}
                    maxlength={16}
                    pattern={regexPassword}
                  />
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonCard>
                  <IonLabel> {capitalizeFirstLetter(t('password'))} </IonLabel>
                  <IonInput
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    clearOnEdit
                    minlength={8}
                    maxlength={16}
                    pattern={regexPassword}
                  />
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonButton type="submit" color="primary" expand="full" shape="round" disabled={loading}>
                  {loading ? t('loading') : t('register')}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3.5">
                <IonLabel>{t('qAlreadyAccount')}</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonButton
                  color="tertiary"
                  expand="full"
                  shape="round"
                  onClick={() => history.push('/login')}
                  disabled={loading}
                >
                  {t('login')}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                {(logError || logSuccess) && (
                  <IonList inset>
                    {logError && <LabelItem color="danger" text={describeError(t, logError)} />}
                    {logSuccess && (
                      <LabelItem
                        color="success"
                        text={t('redirecting', { to: t('to'), somewhere: t('homePageTitle') })}
                      />
                    )}
                  </IonList>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Form>
      </IonContent>
    </IonPage>
  );
};

/**
 * password must contain 1 number (0-9)
 * password must contain 1 uppercase letters
 * password must contain 1 lowercase letters
 * password must contain 1 non-alpha numeric number
 * password is 8-16 characters with no space
 */
const regexPassword = '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$';

export default Register;
