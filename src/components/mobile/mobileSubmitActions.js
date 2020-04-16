import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import {green, orange, yellow} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import XSlider from "../xSlider";
import Grid from "@material-ui/core/Grid";

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
    disabled: {

    }
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

export default function MobileSubmitActions(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container justify="center" spacing={3}>
                <Grid item>
                    <XSlider
                        value={props.xValue}
                        handleChange={props.handleChangeXValue}
                    />
                </Grid>
                <Grid item>
                    <ColoredFab
                        color="primary"
                        aria-label="add"
                        onClick={props.onClick}
                        disabled={props.disabled}
                        classes={{
                            root: classes.root,
                            disabled: classes.disabled,
                        }}
                    >
                        <CheckIcon />
                    </ColoredFab>
                </Grid>
            </Grid>
        </div>
    );
}
