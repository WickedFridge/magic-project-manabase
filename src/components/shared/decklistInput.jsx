import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { defaultDecklist } from '../../data/defaultInputs';
import { useCurrentHeight } from '../../utils/width';

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
        color: 'lightgrey',
        fontSize: 15,
    },
}));

function getMobileRow(height) {
    // this formula was handmade calculated
    return Math.round((height - 242.4) / 17.6);
}

function getDesktopRow(height) {
    // this formula was handmade calculated
    return Math.round(height / 18.5 - 14.5);
}

const DecklistInput = ({ isMobile, value, onChange }) => {
    const classes = useStyles();
    const height = useCurrentHeight();

    const maxRows = isMobile ? getMobileRow(height) : getDesktopRow(height);

    return (
        <form className={classes.root} noValidate>
            <CssTextField
                InputLabelProps={{
                    className: classes.input,
                }}
                InputProps={{
                    className: classes.input,
                }}
                className={classes.margin}
                color="secondary"
                id="custom-css-outlined-input"
                label="Decklist"
                onChange={onChange}
                placeholder={defaultDecklist}
                rows={maxRows}
                value={value}
                variant="outlined"
                multiline
            />
        </form>
    );
};

export default DecklistInput;
