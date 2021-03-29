import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HelpIcon from '@material-ui/icons/Help';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const useStyles = makeStyles(() => ({
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
            aria-labelledby={`simple-tab-${index}`}
            component="div"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    value: PropTypes.number,
};

const DesktopTabs = ({ tabs }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Paper className={classes.paper}>
                <Tabs classes={{ indicator: classes.indicator }} onChange={handleChange} value={value} centered>
                    <Tab icon={<PlaylistAddCheckIcon />} label="Analyze" />
                    <Tab icon={<HelpIcon />} label="Help" />
                </Tabs>
            </Paper>
            {tabs.map((tab, index) => (
                <TabPanel index={index} value={value}>
                    {tab}
                </TabPanel>
            ))}
        </div>
    );
};

export default DesktopTabs;
