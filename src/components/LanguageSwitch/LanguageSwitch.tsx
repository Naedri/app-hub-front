import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';

import type { Language } from '../../utils/enums/languages';

import './LanguageSwitch.module.css';

export interface LanguageSwitchProps {
  langs: Language[];
}

const LanguageSwitch: FC<LanguageSwitchProps> = ({ langs }: LanguageSwitchProps) => {
  return (
    <IonList>
      <IonItem>
        <IonSelect interface="popover">
          {langs.map((lang) => (
            <IonSelectOption value={lang}>{lang.toUpperCase()}</IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default LanguageSwitch;
