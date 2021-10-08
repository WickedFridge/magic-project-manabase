import React from 'react';
import XSlider from '../../shared/xSlider';
import SubmitButton from './submitButton';
import styles from './submitSection.module.scss';

const SubmitSection = () => (
    <div className={styles.submitSection}>
        <XSlider />
        <SubmitButton />
    </div>
);

export default SubmitSection;
