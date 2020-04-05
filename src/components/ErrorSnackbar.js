import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return props.success
        ? <MuiAlert elevation={6} variant="filled" severity="success" {...props} />
        : <MuiAlert elevation={6} variant="filled" severity="error" {...props} />;
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
                open={props.open}
                autoHideDuration={6000}
                onClose={props.handleClose}
            >
                <Alert onClose={props.handleClose} success={props.success}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    );
}
