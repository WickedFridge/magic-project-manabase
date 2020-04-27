import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HelpIcon from "@material-ui/icons/Help";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75vw',
    },
    paper: {
        textAlign: 'center',
        backgroundColor: '#1b222b',
    },
    indicator: {
        background: 'darkorange',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function DesktopTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div  className={classes.root}>
            <Paper className={classes.paper}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    classes={{ indicator: classes.indicator }}
                >
                    <Tab icon={<PlaylistAddCheckIcon/>} label="Analyze" />
                    <Tab icon={<HelpIcon/>}  label="Help" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                {props.main}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.help}
            </TabPanel>
        </div>
    );
}
