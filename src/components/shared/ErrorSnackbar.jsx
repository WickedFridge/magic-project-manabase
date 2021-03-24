import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../core/useCases/popup/setPopupActions';
import { errorMessageSelector, popupOpenSelector, querySuccessSelector } from '../../core/useCases/popup/selector';

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

const ErrorSnackbar = ({ successMessage }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(popupOpenSelector);
    const errorMessage = useSelector(errorMessageSelector);
    const querySuccess = useSelector(querySuccessSelector);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setOpen(false));
    };

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
                    errormessage={errorMessage}
                    onClose={handleClose}
                    querysuccess={querySuccess}
                    successmessage={successMessage}
                />
            </Snackbar>
        </div>
    );
};

export default ErrorSnackbar;
