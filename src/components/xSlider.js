import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

export default function XSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
            <Typography id="discrete-slider" gutterBottom>
                X Value
            </Typography>
        </div>
    );
}
