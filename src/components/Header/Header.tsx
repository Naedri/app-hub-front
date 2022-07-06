import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import type { i18n, TFunction } from 'i18next';
import type { FC } from 'react';

import DarkModeButton from '../DarkModeButton';
import HelpButton from '../HelpButton';
import LanguageSwitch from '../LanguageSwitch';

import './Header.module.css';

export interface HeaderProps {
  pageTitle: string;
  i18n: i18n;
  t: TFunction;
}

const Header: FC<HeaderProps> = ({ pageTitle, i18n, t }: HeaderProps) => {
  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>{pageTitle}</IonTitle>
        <LanguageSwitch i18n={i18n} headerTitle={t('languageModify')}></LanguageSwitch>
        <DarkModeButton />
        <HelpButton />
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
