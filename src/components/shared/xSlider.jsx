import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setXValue } from '../../core/useCases/input/setInputActions';
import { xValueSelector } from '../../core/useCases/input/selector';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

const XSlider = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const value = useSelector(xValueSelector);

    const onChange = (event, newValue) => {
        dispatch(setXValue(newValue));
    };

    return (
        <div className={classes.root}>
            <Slider
                aria-labelledby="discrete-slider"
                defaultValue={2}
                max={10}
                min={0}
                onChange={onChange}
                step={1}
                value={value}
                valueLabelDisplay="auto"
                marks
            />
            <Typography id="discrete-slider" gutterBottom>
                X Value
            </Typography>
        </div>
    );
};

export default XSlider;
