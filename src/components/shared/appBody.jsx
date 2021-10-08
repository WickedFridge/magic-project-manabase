import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DesktopBody from '../desktop/body/desktopBody';
import MobileBody from '../mobile/mobileBody';
import { useCurrentWitdh } from '../../utils/width';
import ErrorSnackbar from './ErrorSnackbar';
import styles from './appBody.module.scss';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const AppBody = () => {
    const [, isMobile] = useCurrentWitdh();

    return (
        <div className={styles.appBody}>
            <ThemeProvider theme={theme}>
                <ErrorSnackbar successMessage="Success !" />
                {isMobile ? <MobileBody /> : <DesktopBody />}
            </ThemeProvider>
        </div>
    );
};

export default AppBody;
