import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import { green, orange, yellow } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import XSlider from '../shared/xSlider';
import { decklistSelector, loadingSelector, xValueSelector } from '../../core/useCases/input/selector';
import { setLoading } from '../../core/useCases/input/setInputActions';
import config from '../../config';
import { setErrorMessage, setOpen, setQuerySuccess } from '../../core/useCases/popup/setPopupActions';
import { setLands, setSpells } from '../../core/useCases/stats/setStatsActions';

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
    disabled: {},
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

const MobileSubmitActions = ({ onClick }) => {
    const classes = useStyles();
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const decklist = useSelector(decklistSelector);
    const xValue = useSelector(xValueSelector);

    const onSubmit = async () => {
        onClick();
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
            <Grid justify="center" spacing={3} container>
                <Grid item>
                    <XSlider />
                </Grid>
                <Grid item>
                    <ColoredFab
                        aria-label="add"
                        classes={{
                            root: classes.root,
                            disabled: classes.disabled,
                        }}
                        color="primary"
                        disabled={loading}
                        onClick={onSubmit}
                    >
                        <CheckIcon />
                    </ColoredFab>
                </Grid>
            </Grid>
        </div>
    );
};

export default MobileSubmitActions;
