import React from 'react';
import DesktopTabs from '../desktopTabs';
import HelpTab from '../tabs/help/helpTab';
import MainTab from '../tabs/main/mainTab';
import styles from './desktopBody.module.scss';

const DesktopBody = () => {
    return (
        <div className={styles.container}>
            <DesktopTabs tabs={[<MainTab />, <HelpTab />]} />
        </div>
    );
};

export default DesktopBody;
