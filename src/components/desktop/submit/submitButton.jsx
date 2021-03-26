import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, orange, yellow } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { decklistSelector, loadingSelector, xValueSelector } from '../../../core/useCases/input/selector';
import { POST } from '../../../core/utils/http';
import analyzeDecklistAction from '../../../core/useCases/stats/analyzeDecklistActions';

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

const analyzeFetcher = async (backendUrl, data) => {
    return POST({ url: backendUrl, data });
};

const SubmitButton = () => {
    const classes = useStyles();
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const decklist = useSelector(decklistSelector);
    const xValue = useSelector(xValueSelector);

    const onSubmit = async () => {
        const data = { decklist, xValue };
        dispatch(analyzeDecklistAction(analyzeFetcher, data)());
    };

    return (
        <div>
            <ColorButton
                classes={{
                    root: classes.root,
                    disabled: classes.disabled,
                }}
                color="primary"
                disabled={loading}
                onClick={onSubmit}
                variant="contained"
            >
                Submit
            </ColorButton>
        </div>
    );
};

export default SubmitButton;
