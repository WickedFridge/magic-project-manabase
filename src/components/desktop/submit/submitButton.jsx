import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, orange, yellow } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
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
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
}));

const SubmitButton = ({ disabled, onClick }) => {
    const classes = useStyles();

    return (
        <div>
            <ColorButton
                classes={{
                    root: classes.root,
                    disabled: classes.disabled,
                }}
                color="primary"
                disabled={disabled}
                onClick={onClick}
                variant="contained"
            >
                Submit
            </ColorButton>
        </div>
    );
};

export default SubmitButton;
