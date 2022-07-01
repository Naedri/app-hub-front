import type { FC } from 'react';
import React from 'react';

import './Loader.module.css';

// import logo from '../../../public/assets/icon/icon.png';

// import logo from '%PUBLIC_URL%/assets/icon/favicon.png';

export interface LoaderProps {
  text?: string;
}

const Loader: FC<LoaderProps> = ({ text = 'loading' }: LoaderProps) => {
  return (
    <div className="loader">
      <img src="assets/icon/favicon.png" className="loaderLogo" alt="logo" />
      <div>{text}</div>
    </div>
  );
};

export default Loader;
