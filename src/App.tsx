import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { Database } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AppContextProvider } from './contexts/AppContext';
import { loadUserData } from './data/user/user.actions';
import Home from './pages/Home';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import Register from './pages/Register';
import { createStore } from './services/storage';
import type { IonicAppProps } from './utils/interfaces/ionicApp';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, setIsLoggedIn, setUser }) => {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(
    () => {
      setDb(createStore('ms_users'));
      loadUserData();
    },
    //only run once when the components is first initialized
    []
  );

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route render={() => <Redirect from="**" to="/page-404" />} />
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/register" exact={true}>
            <Register />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/page-404" exact={true}>
            <Page404 />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp,
});
