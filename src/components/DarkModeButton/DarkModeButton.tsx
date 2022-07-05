import { IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { sunnyOutline, moonOutline } from 'ionicons/icons';
import type { FC } from 'react';
import React, { useState } from 'react';

import './DarkModeButton.module.css';

/**
 * Change css attribute of body
 * @ref https://ionicframework.com/docs/theming/dark-mode#ionic-dark-theme
 * @ref https://petercoding.com/ionic/2020/02/15/implementing-dark-mode-in-ionic-5/
 */
const toggleDarkTheme = (shouldAdd: boolean): void => {
  // if (shouldAdd) {
  //   document.body.setAttribute('data-theme', 'dark');
  // } else {
  //   document.body.setAttribute('data-theme', 'light');
  // }
  document.body.classList.toggle('dark', shouldAdd);
  document.body.classList.toggle('light', !shouldAdd);
};

const DarkModeButton: FC = () => {
  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDark.matches);

  // Add or remove the "dark" class based on if the media query matches
  const handleToggle = (shouldAdd: boolean): void => {
    setDarkMode(shouldAdd);
    toggleDarkTheme(shouldAdd);
  };

  useIonViewWillEnter(() => {
    toggleDarkTheme(prefersDark.matches);
  });

  return (
    <>
      {darkMode ? (
        <IonButton onClick={() => handleToggle(false)}>
          <IonIcon slot="icon-only" icon={sunnyOutline} />
        </IonButton>
      ) : (
        <IonButton onClick={() => handleToggle(true)}>
          <IonIcon slot="icon-only" icon={moonOutline} />
        </IonButton>
      )}
    </>
  );
};

export default DarkModeButton;
