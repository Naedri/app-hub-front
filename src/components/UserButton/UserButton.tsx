import { IonButton, IonIcon } from '@ionic/react';
import { logOutOutline, logInOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import './UserButton.module.css';

export interface UserButtonProps {
  connected: boolean;
}

const UserButton: FC<UserButtonProps> = ({ connected }: UserButtonProps) => {
  const [isConnected, setConnected] = useState(connected);
  const [isDisabled, setDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  const handleLog = async (disconnect: boolean): Promise<void> => {
    setDisabled(true);
    if (disconnect) {
      //TODO remove local storage
    }
    history.push('/login');
    setDisabled(false);
  };

  return (
    <>
      {isConnected ? (
        <>
          <IonButton id="user-logout" color="danger" onClick={() => handleLog(true)} disabled={isDisabled}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </>
      ) : (
        <>
          <IonButton id="user-login" color="primary" onClick={() => handleLog(false)} disabled={isDisabled}>
            <IonIcon slot="icon-only" icon={logInOutline} />
          </IonButton>
        </>
      )}
    </>
  );
};

export default UserButton;
