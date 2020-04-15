import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import {green, orange, yellow} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

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

export default function MobileSubmitButton(props) {
    const classes = useStyles();

    return (
        <div>
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
        </div>
    );
}