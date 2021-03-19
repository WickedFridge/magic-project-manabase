import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HelpIcon from '@material-ui/icons/Help';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SwipeableViews from 'react-swipeable-views';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    slide1: {
        padding: 10,
    },
    slide2: {
        padding: '5px 25px',
    },
    slide3: {
        // padding: '5px 25px',
    },
    slide4: {
        // padding: '5px 25px',
    },
    menu: {
        background: '#323a46',
    },
    indicator: {
        background: 'darkorange',
    },
    selected: {
        color: 'white',
    },
}));

const MobileTabs = ({ index, help, landResults, main, setIndex, spellResults }) => {
    const classes = useStyles();

    const handleChange = (event, newIndex) => {
        setIndex(newIndex);
    };

    const handleChangeIndex = (index) => {
        setIndex(index);
    };

    return (
        <div>
            <Paper className={classes.menu} square>
                <Tabs
                    classes={{ indicator: classes.indicator }}
                    onChange={handleChange}
                    value={index}
                    variant="fullWidth"
                >
                    <Tab aria-label="help" classes={{ selected: classes.selected }} icon={<HelpIcon />} label="Help" />
                    <Tab
                        aria-label="input"
                        classes={{ selected: classes.selected }}
                        icon={<PlaylistAddCheckIcon fontSize="large" />}
                        label="Decklist"
                    />
                    <Tab
                        aria-label="numbers"
                        classes={{ selected: classes.selected }}
                        icon={<EqualizerIcon />}
                        label="Spells"
                    />
                    <Tab
                        aria-label="numbers"
                        classes={{ selected: classes.selected }}
                        icon={<EqualizerIcon />}
                        label="Lands"
                    />
                </Tabs>
            </Paper>
            <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div className={classes.slide1}>{help}</div>
                <div className={classes.slide2}>{main}</div>
                <div className={classes.slide3}>{spellResults}</div>
                <div className={classes.slide4}>{landResults}</div>
            </SwipeableViews>
        </div>
    );
};

export default MobileTabs;
