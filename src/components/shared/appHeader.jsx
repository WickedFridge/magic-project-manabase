import React from 'react';
import { useCurrentWitdh } from '../../utils/width';
import MobileHeader from '../mobile/mobileHeader';
import DesktopHeader from '../desktop/desktopHeader';

const AppHeader = () => {
    const width = useCurrentWitdh();
    const isMobile = width <= 500;

    return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default AppHeader;
