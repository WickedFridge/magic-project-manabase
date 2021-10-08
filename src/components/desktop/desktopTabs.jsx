import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HelpIcon from '@material-ui/icons/Help';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CustomPaper from '../shared/customPaper/CustomPaper';
import styles from './desktopTabs.module.scss';

const useStyles = makeStyles(() => ({
    indicator: {
        background: 'darkorange',
    },
}));

const TabPanel = ({ index, value, children }) => value === index && <div className={styles.tab}>{children}</div>;

const DesktopTabs = ({ tabs }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <CustomPaper>
                <Tabs classes={{ indicator: classes.indicator }} onChange={handleChange} value={value} centered>
                    <Tab icon={<PlaylistAddCheckIcon />} label="Analyze" />
                    <Tab icon={<HelpIcon />} label="Help" />
                </Tabs>
            </CustomPaper>
            {tabs.map((tab, index) => (
                <TabPanel key={`tab-${index}`} index={index} value={value}>
                    {tab}
                </TabPanel>
            ))}
        </>
    );
};

export default DesktopTabs;
