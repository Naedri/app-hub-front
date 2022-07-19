import { IonButton, IonIcon } from '@ionic/react';
import { logOutOutline, logInOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import './UserButton.module.css';

export interface UserButtonProps {
  connected?: boolean;
  disabled?: boolean;
}

const UserButton: FC<UserButtonProps> = ({ connected = false, disabled = false }: UserButtonProps) => {
  const [isConnected, setConnected] = useState(connected);
  const [isDisabled, setDisabled] = useState(disabled);
  const history = useHistory();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // return early if first render
    }
    setConnected(connected);
    setDisabled(disabled);
  }, [connected, disabled]);

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
