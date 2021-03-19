import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import XSlider from '../shared/xSlider';
import SubmitButton from './submitButton';

const useStyles = () =>
    makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: '#1b222b',
        },
    }))();

const SubmitSection = ({ xValue, handleChangeXValue, handleClickSubmit, loading }) => {
    const classes = useStyles();

    return (
        <Grid xs={12} item>
            <Paper className={classes.paper}>
                <Grid justify="center" spacing={4} container>
                    <Grid item>
                        <XSlider handleChange={handleChangeXValue} value={xValue} />
                    </Grid>
                    <Grid item>
                        <SubmitButton disabled={loading} onClick={handleClickSubmit} />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default SubmitSection;
