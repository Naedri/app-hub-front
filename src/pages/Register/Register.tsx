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
  IonRow,
  IonSpinner,
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
import type { ErrorClient, ErrorFromServer } from '../../types/interfaces/error';
import type { User } from '../../types/interfaces/user';
import {
  pascalToKebab,
  formatError,
  describeServerError,
  describeClientError,
  capitalizeFirstLetter,
} from '../../utils/format';

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
  const [logErrorC, setErrorC] = useState<ErrorClient | null>(null);
  const [logErrorS, setErrorS] = useState<ErrorFromServer | null>(null);
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
    setErrorC(null);
    setErrorS(null);

    //TODO improve type of form
    const email: string = (event.target as any).email.value;
    const password: string = (event.target as any).password.value;
    const passwordConfirm: string = (event.target as any).passwordConfirm.value;
    console.log(isStrong(password) ? 'strong' : 'not strong');

    if (!isStrong(password)) {
      setErrorC({ key: 'passwordStrength' });
      setLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      setErrorC({ key: 'passwordConfirm' });
      setLoading(false);
      return;
    }
    const { user, error } = await register({ email, password });
    setLoading(false);

    if (user) {
      // dispatchUser({ ...stateUser, user: user });
      setUser(user);
      setErrorS(null);
      setLogSuccess(true);
      history.push('/login');
    } else {
      // dispatchUser({ ...stateUser, user: undefined });
      setUser(undefined);
      setErrorS(formatError(error));
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
                    minlength={6}
                    maxlength={16}
                    // pattern={regexPassword.toString().slice(1, -1)}
                  />
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonCard>
                  <IonLabel> {capitalizeFirstLetter(t('passwordConfirm'))} </IonLabel>
                  <IonInput
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    clearOnEdit
                    minlength={6}
                    maxlength={16}
                    // pattern={regexPassword.toString().slice(1, -1)}
                  />
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="6" offset="3">
                <IonButton type="submit" color="primary" expand="full" shape="round" disabled={loading}>
                  {t('register')}
                  {loading && <IonSpinner name="lines-small" color="primary" />}
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center">
              <IonCol size="5" offset="3.5">
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
              {loading && (
                <IonCol size="0.3" offset="5.85">
                  <IonList lines="none">
                    <IonItem>
                      <IonSpinner name="lines-small" color="primary" />
                    </IonItem>
                  </IonList>
                </IonCol>
              )}
              {!loading && (logErrorC || logErrorS || logSuccess) && (
                <IonCol size="5" offset="3.5">
                  <IonList inset lines="none">
                    {logErrorC && <LabelItem color="warning" text={describeClientError(t, logErrorC)} />}
                    {logErrorS && <LabelItem color="danger" text={describeServerError(t, logErrorS)} />}
                    {logSuccess && (
                      <LabelItem
                        color="success"
                        text={t('redirecting', { preposition: t('to'), somewhere: t('homePageTitle') })}
                      />
                    )}
                  </IonList>
                </IonCol>
              )}
            </IonRow>
          </IonGrid>
        </Form>
      </IonContent>
    </IonPage>
  );
};

/**
 * password with 6-16 characters with no space must contain at least :
 * 1 number (0-9)
 * 1 letter (a-zA-Z)
 * 1 special character
 * @example OK : K487Ed%w
 * @example ko : K487Edw
 */
const regexPassword = /^(?=.*[0-9])(?=.*[:;,.!?^*~@#%&§<>$£€])[a-zA-Z0-9:;,.!?^*~@#%&§<>$£€]{6,16}$/;

function isStrong(pwd: string): boolean {
  return regexPassword.test(pwd);
}

export default Register;
