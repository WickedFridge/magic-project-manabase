import React from 'react';
import styles from './CustomPaper.module.scss';

const CustomPaper = ({ children }) => <div className={styles.paper}>{children}</div>;

export default CustomPaper;
