import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import { green, orange, yellow } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import XSlider from '../shared/xSlider';

const ColoredFab = withStyles((theme) => ({
    root: {
        '&$disabled': {
            backgroundColor: green[900],
        },
        color: theme.palette.getContrastText(orange[800]),
        backgroundColor: orange[800],
        '&:hover': {
            backgroundColor: yellow[700],
        },
    },
    disabled: {},
}))(Fab);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const MobileSubmitActions = ({ disabled, handleChangeXValue, onClick, xValue }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid justify="center" spacing={3} container>
                <Grid item>
                    <XSlider handleChange={handleChangeXValue} value={xValue} />
                </Grid>
                <Grid item>
                    <ColoredFab
                        aria-label="add"
                        classes={{
                            root: classes.root,
                            disabled: classes.disabled,
                        }}
                        color="primary"
                        disabled={disabled}
                        onClick={onClick}
                    >
                        <CheckIcon />
                    </ColoredFab>
                </Grid>
            </Grid>
        </div>
    );
};

export default MobileSubmitActions;
