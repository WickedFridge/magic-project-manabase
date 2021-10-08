/* eslint-disable react/jsx-no-useless-fragment */
import { CircularProgress } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import React from 'react';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = ({ loading, children }) => (
    <>
        {loading ? (
            <Fade
                in={loading}
                style={{
                    transitionDelay: '500ms',
                }}
                unmountOnExit
            >
                <div className={styles.loadingScreen}>
                    <CircularProgress size={100} thickness={2} />
                </div>
            </Fade>
        ) : (
            <Fade
                in={!loading}
                style={{
                    transitionDelay: '500ms',
                }}
                unmountOnExit
            >
                <>{children}</>
            </Fade>
        )}
    </>
);

export default LoadingScreen;
