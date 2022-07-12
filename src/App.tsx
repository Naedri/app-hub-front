import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import { UserContextProvider } from './contexts/user.context';
import Home from './pages/Home';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import Register from './pages/Register';

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

const App: React.FC = () => (
  <UserContextProvider>
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
  </UserContextProvider>
);

export default App;
