import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DesktopTabs from './desktopTabs';
import HelpTab from './tabs/helpTab';
import MainTab from './tabs/mainTab';

const useStyles = () =>
    makeStyles(() => ({
        root: {
            width: '85vw',
        },
    }))();

const DesktopBody = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DesktopTabs tabs={[<MainTab />, <HelpTab />]} />
        </div>
    );
};

export default DesktopBody;
