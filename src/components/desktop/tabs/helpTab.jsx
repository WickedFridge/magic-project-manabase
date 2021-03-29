import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HelpText from '../../shared/helpText';
import { useCurrentHeight } from '../../../utils/width';

const useStyles = (height) =>
    makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: '#1b222b',
        },
        background: {
            height: 0.845 * height - 148,
            padding: '1vw 2vw',
            overflow: 'auto',
        },
    }))();

const HelpTab = () => {
    const [height] = useCurrentHeight();
    const classes = useStyles(height);

    return (
        <Paper className={classes.paper}>
            <Box className={classes.background} textAlign="left">
                <HelpText />
            </Box>
        </Paper>
    );
};

export default HelpTab;
