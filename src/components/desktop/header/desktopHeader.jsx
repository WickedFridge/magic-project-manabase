import React from 'react';
import styles from './desktopHeader.module.scss';

const DesktopHeader = () => (
    <div className={styles.header}>
        <div />
        <div>
            <h1>Project Manabase</h1>
        </div>
        <div>
            <h4>
                <a href="https://twitter.com/wickedfridge">By Charles Wickham</a>
            </h4>
        </div>
    </div>
);

export default DesktopHeader;
