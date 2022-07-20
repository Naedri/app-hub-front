import { IonItem, IonLabel } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import './LabelItem.module.css';

export interface LabelItemProps {
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
  text: string;
}

const LabelItem: FC<LabelItemProps> = ({ color = undefined, text }: LabelItemProps) => {
  return (
    <IonItem style={{ textAlign: 'center' }}>
      <IonLabel color={color} class="ion-text-wrap">
        {text}
      </IonLabel>
    </IonItem>
  );
};

export default LabelItem;
