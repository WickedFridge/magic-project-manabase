import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, orange, yellow } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { decklistSelector, loadingSelector, xValueSelector } from '../../../core/useCases/input/selector';
import { setLoading } from '../../../core/useCases/input/setInputActions';
import config from '../../../config';
import { setErrorMessage, setOpen, setQuerySuccess } from '../../../core/useCases/popup/setPopupActions';
import { setLands, setSpells } from '../../../core/useCases/stats/setStatsActions';

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

const SubmitButton = () => {
    const classes = useStyles();
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const decklist = useSelector(decklistSelector);
    const xValue = useSelector(xValueSelector);

    const onSubmit = async () => {
        dispatch(setLoading(true));

        const data = { decklist, xValue };
        console.log(data);
        try {
            const response = await axios({
                method: 'post',
                url: config.backendUrl,
                data,
            });
            dispatch(setLoading(false));
            dispatch(setOpen(true));
            dispatch(setQuerySuccess(true));
            dispatch(setSpells(response.data.spells));
            dispatch(setLands(response.data.lands));
        } catch (e) {
            dispatch(setLoading(false));
            dispatch(setOpen(true));
            dispatch(setQuerySuccess(false));
            console.error(e);
            dispatch(setErrorMessage(e.response.data.error));
        }
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
