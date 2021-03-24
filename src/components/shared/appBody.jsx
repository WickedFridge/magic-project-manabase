import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';
import DesktopBody from '../desktop/desktopBody';
import MobileBody from '../mobile/mobileBody';
import { defaultDecklist, defaultResults } from '../../data/defaultInputs';
import { useCurrentWitdh } from '../../utils/width';
import { decklistSelector, loadingSelector, xValueSelector } from '../../core/useCases/input/selector';
import { setLoading } from '../../core/useCases/input/setInputActions';
import { setErrorMessage, setOpen, setQuerySuccess } from '../../core/useCases/popup/setPopupActions';
import ErrorSnackbar from './ErrorSnackbar';

const createRows = (data) => Object.entries(data).map(([key, { p1, p2, manaCost }]) => ({ key, p1, p2, manaCost }));

const defaultRows = createRows(defaultResults);

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const AppBody = () => {
    const width = useCurrentWitdh();
    const dispatch = useDispatch();
    const isMobile = width <= 500;
    const [spells, setSpells] = React.useState(defaultRows);
    const [lands, setLands] = React.useState(defaultRows);
    const decklist = useSelector(decklistSelector);
    const xValue = useSelector(xValueSelector);
    const loading = useSelector(loadingSelector);

    const handleClickSubmit = async () => {
        dispatch(setLoading(true));

        const data = { decklist, xValue };
        console.log(data);
        try {
            const response = axios({
                method: 'post',
                url: config.backendUrl,
                data,
            });
            dispatch(setLoading(false));
            dispatch(setOpen(true));
            dispatch(setQuerySuccess(true));
            setSpells(createRows(response.data.spells));
            setLands(createRows(response.data.lands));
        } catch (e) {
            dispatch(setLoading(false));
            dispatch(setOpen(true));
            dispatch(setQuerySuccess(false));
            dispatch(setErrorMessage(e.response.data.error));
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ErrorSnackbar successMessage="Success !" />
                {isMobile ? (
                    <MobileBody handleClickSubmit={handleClickSubmit} lands={lands} loading={loading} spells={spells} />
                ) : (
                    <DesktopBody
                        handleClickSubmit={handleClickSubmit}
                        lands={lands}
                        loading={loading}
                        spells={spells}
                    />
                )}
            </ThemeProvider>
        </div>
    );
};

export default AppBody;
