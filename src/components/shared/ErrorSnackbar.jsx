import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    const [severity, message] = props.querysuccess ? ['success', props.successmessage] : ['error', props.errormessage];

    return (
        <MuiAlert elevation={6} severity={severity} variant="filled" {...props}>
            {message}
        </MuiAlert>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ErrorSnackbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                autoHideDuration={6000}
                onClose={props.handleClose}
                open={props.open}
            >
                <Alert
                    errormessage={props.errormessage}
                    onClose={props.handleClose}
                    querysuccess={props.querysuccess}
                    successmessage={props.successmessage}
                />
            </Snackbar>
        </div>
    );
}
