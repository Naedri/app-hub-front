import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import type { i18n, TFunction } from 'i18next';
import type { FC } from 'react';

import { Page } from '../../types/enums/pages';
import { mapPageToTitle } from '../../utils/format';
import DarkModeButton from '../DarkModeButton';
import LanguageSwitch from '../LanguageSwitch';
import UserButton from '../UserButton';

import './Header.module.css';

export interface HeaderProps {
  page: Page;
  i18n: i18n;
  t: TFunction;
}

const Header: FC<HeaderProps> = ({ page, i18n, t }: HeaderProps) => {
  return (
    <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonTitle>{t(mapPageToTitle(page))}</IonTitle>

        <IonButtons slot="end">
          {page == Page.Login ? <></> : <UserButton />}
          <LanguageSwitch i18n={i18n} headerTitle={t('languageModify')}></LanguageSwitch>
          <DarkModeButton />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
