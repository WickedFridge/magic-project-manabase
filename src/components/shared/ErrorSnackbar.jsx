import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert({ errormessage, onClose, querysuccess, successmessage }) {
    const [severity, message] = querysuccess ? ['success', successmessage] : ['error', errormessage];

    return (
        <MuiAlert elevation={6} onClose={onClose} severity={severity} variant="filled">
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

const ErrorSnackbar = ({ errormessage, handleClose, open, querysuccess, successmessage }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                autoHideDuration={6000}
                onClose={handleClose}
                open={open}
            >
                <Alert
                    errormessage={errormessage}
                    onClose={handleClose}
                    querysuccess={querysuccess}
                    successmessage={successmessage}
                />
            </Snackbar>
        </div>
    );
};

export default ErrorSnackbar;
