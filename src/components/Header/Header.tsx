import { IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import type { i18n, TFunction } from 'i18next';
import type { FC } from 'react';

import { Page } from '../../types/enums/pages';
import DarkModeButton from '../DarkModeButton';
import HelpButton from '../HelpButton';
import LanguageSwitch from '../LanguageSwitch';
import UserButton from '../UserButton';

import './Header.module.css';

export interface HeaderProps {
  pageTitle: string;
  i18n: i18n;
  t: TFunction;
  page?: Page;
}

const Header: FC<HeaderProps> = ({ pageTitle, i18n, t, page = Page.Home }: HeaderProps) => {
  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonTitle>{pageTitle}</IonTitle>
        <IonButtons slot="end">
          {page == Page.Login ? <></> : <UserButton />}
          <LanguageSwitch i18n={i18n} headerTitle={t('languageModify')}></LanguageSwitch>
          <DarkModeButton />
          <HelpButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
