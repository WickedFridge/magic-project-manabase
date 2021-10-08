import React from 'react';
import { useCurrentWitdh } from '../../utils/width';
import MobileHeader from '../mobile/mobileHeader';
import DesktopHeader from '../desktop/header/desktopHeader';

const AppHeader = () => {
    const [, isMobile] = useCurrentWitdh();

    return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default AppHeader;
