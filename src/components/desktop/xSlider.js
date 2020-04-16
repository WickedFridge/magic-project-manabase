import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
    rail: {
        color: 'green',
    },
});

export default function XSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider" gutterBottom>
                X Value
            </Typography>
            <Slider
                defaultValue={2}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={10}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
}
