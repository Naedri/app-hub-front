import { IonButton } from '@ionic/react';
import type { i18n } from 'i18next';
import type { FC } from 'react';
import React from 'react';

import { Language } from '../../utils/enums/languages';

import './ChangeLanguage.module.css';

export interface ChangeLanguageProps {
  i18n: i18n;
}

const changeLanguage = (i18n: i18n, lng: Language) => {
  i18n.changeLanguage(lng);
};

const ChangeLanguage: FC<ChangeLanguageProps> = ({ i18n: i18n }: ChangeLanguageProps) => {
  return (
    <>
      <IonButton onClick={() => changeLanguage(i18n, Language.en)}>{Language.en}</IonButton>
      <IonButton onClick={() => changeLanguage(i18n, Language.no)}>{Language.no}</IonButton>
    </>
  );
};

export default ChangeLanguage;
