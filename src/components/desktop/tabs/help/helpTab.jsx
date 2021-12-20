import React from 'react';
import HelpText from '../../../shared/help/helpText';
import CustomPaper from '../../../shared/customPaper/CustomPaper';
import styles from './helpTab.module.scss';

const HelpTab = () => (
    <CustomPaper>
        <div className={styles.mainTab}>
            <HelpText />
        </div>
    </CustomPaper>
);

export default HelpTab;
