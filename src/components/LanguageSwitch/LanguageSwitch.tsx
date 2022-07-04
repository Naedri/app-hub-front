import type { ActionSheetButton } from '@ionic/react';
import { IonButton, IonIcon, useIonActionSheet } from '@ionic/react';
import type { i18n } from 'i18next';
import { languageOutline } from 'ionicons/icons';
import type { FC } from 'react';

import { Language } from '../../utils/enums/languages';

import './LanguageSwitch.module.css';

export interface LanguageSwitchProps {
  i18n: i18n;
  headerTitle: string;
}

const langs = Object.values(Language);

const getLanguageButtons = (i18n: i18n): ActionSheetButton[] => {
  const res: ActionSheetButton[] = [];
  langs.forEach((lang) =>
    res.push({
      text: lang.toUpperCase(),
      handler: () => Promise.resolve(i18n.changeLanguage(lang as Language) as unknown as Promise<void>),
    })
  );
  return res;
};

const LanguageSwitch: FC<LanguageSwitchProps> = ({ i18n, headerTitle }: LanguageSwitchProps) => {
  const [present] = useIonActionSheet();
  const langsButtons = getLanguageButtons(i18n);
  return (
    <IonButton
      onClick={() =>
        present({
          buttons: langsButtons,
          header: headerTitle,
        })
      }
    >
      <IonIcon slot="icon-only" icon={languageOutline} />
    </IonButton>
  );
};

export default LanguageSwitch;
