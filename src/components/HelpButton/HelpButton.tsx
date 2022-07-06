import { IonIcon, IonButton } from '@ionic/react';
import { helpOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React from 'react';

import './HelpButton.module.css';

const HelpButton: FC = () => {
  return (
    <IonButton routerLink="/contact">
      <IonIcon slot="icon-only" icon={helpOutline} />
    </IonButton>
  );
};

export default HelpButton;
