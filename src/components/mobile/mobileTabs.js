import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HelpIcon from "@material-ui/icons/Help";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SwipeableViews from "react-swipeable-views";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    slide1: {
        padding: 10,
    },
    slide2: {
        padding: '5px 25px',
    },
    slide3: {
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

export default function MobileTabs(props) {
    const classes = useStyles();

    const handleChange = (event, newIndex) => {
        props.setIndex(newIndex);
    };

    const handleChangeIndex = index => {
        props.setIndex(index)
    };

    return (
        <div>
            <Paper square className={classes.menu}>
                <Tabs
                    value={props.index}
                    onChange={handleChange}
                    variant="fullWidth"
                    classes={{ indicator: classes.indicator}}
                >
                    <Tab icon={<HelpIcon/>} aria-label="help" classes={{ selected: classes.selected }} />
                    <Tab icon={<PlaylistAddCheckIcon fontSize="large"/>} aria-label="input" classes={{ selected: classes.selected }} />
                    <Tab icon={<EqualizerIcon/>} aria-label="numbers" classes={{ selected: classes.selected }} />
                </Tabs>
            </Paper>
            <SwipeableViews
                index={props.index}
                onChangeIndex={handleChangeIndex}
            >
                <div className={classes.slide1}>
                    {props.help}
                </div>
                <div className={classes.slide2}>
                    {props.main}
                </div>
                <div className={classes.slide3}>
                    {props.results}
                </div>
            </SwipeableViews>
        </div>
    )
}
