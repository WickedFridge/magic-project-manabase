import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import { green, orange, yellow } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import XSlider from '../shared/xSlider';
import { decklistSelector, loadingSelector, xValueSelector } from '../../core/useCases/input/selector';
import analyzeDecklistAction from '../../core/useCases/stats/analyzeDecklistActions';
import { POST } from '../../core/utils/http';

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

const analyzeFetcher = async (backendUrl, data) => {
    return POST({ url: backendUrl, data });
};

const MobileSubmitActions = ({ onClick }) => {
    const classes = useStyles();
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const decklist = useSelector(decklistSelector);
    const xValue = useSelector(xValueSelector);

    const onSubmit = async () => {
        onClick();
        const data = { decklist, xValue };
        dispatch(analyzeDecklistAction(analyzeFetcher, data)());
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
