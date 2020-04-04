import React from 'react';
import {
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, cyan } from '@material-ui/core/colors';

const CssTextField = withStyles({
    root: {
        width: '50ch',
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'orange',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    input: {
        color: "lightgrey",
    }
}));

export default function DecklistInput(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate>
            <CssTextField
                className={classes.margin}
                label="Decklist"
                variant="outlined"
                id="custom-css-outlined-input"
                multiline
                value={props.value}
                onChange={props.onChange}
                color="secondary"
                rows={25}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.input
                }}
            />
        </form>
    );
}
