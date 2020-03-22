import * as React from 'react';

import Divider from '@material-ui/core/Divider';

import { TemporaryDrawer } from '@features/TemporaryDrawer';

import './styles.pcss';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="header">
        <TemporaryDrawer />
      </div>
      <Divider />
    </header>
  );
};
