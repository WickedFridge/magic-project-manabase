import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import XSlider from "../shared/xSlider";
import SubmitButton from "./submitButton";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = () => makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#1b222b',
    },
}))();

const SubmitSection = ({ xValue, handleChangeXValue, handleClickSubmit, loading }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container justify="center" spacing={4}>
                    <Grid item>
                        <XSlider
                            value={xValue}
                            handleChange={handleChangeXValue}
                        />
                    </Grid>
                    <Grid item>
                        <SubmitButton
                            onClick={handleClickSubmit}
                            disabled={loading}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default SubmitSection;
