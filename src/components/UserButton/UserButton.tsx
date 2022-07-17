import { IonButton, IonIcon, IonPopover, IonContent } from '@ionic/react';
import { logOutOutline, logInOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import './UserButton.module.css';

export interface UserButtonProps {
  disabled?: boolean;
  logged?: boolean;
}

const UserButton: FC<UserButtonProps> = ({ logged = false, disabled = false }: UserButtonProps) => {
  const [isConnected, setConnected] = useState(logged);
  const [isDisabled, setDisabled] = useState(disabled);
  const history = useHistory();

  const handleLog = async (connect: boolean): Promise<void> => {
    setDisabled(true);
    setConnected(connect);
    if (connect) {
      //login
      history.push('/login');
    } else {
      //logout
      //TODO clean local storage
      history.push('/login');
    }
    setDisabled(false);
  };

  return (
    <>
      {isConnected ? (
        <>
          <IonButton id="user-logout" color="danger" onClick={() => handleLog(false)} disabled={isDisabled}>
            <IonIcon slot="icon-only" icon={logOutOutline} />
          </IonButton>
        </>
      ) : (
        <>
          <IonButton id="user-login" color="primary" onClick={() => handleLog(true)} disabled={isDisabled}>
            <IonIcon slot="icon-only" icon={logInOutline} />
          </IonButton>
        </>
      )}
    </>
  );
};

export default UserButton;
