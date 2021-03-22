import React from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../config';
import DesktopBody from '../desktop/desktopBody';
import MobileBody from '../mobile/mobileBody';
import { defaultDecklist, defaultResults } from '../../data/defaultInputs';
import { useCurrentWitdh } from '../../utils/width';
import { decklistSelector, xValueSelector } from '../../core/useCases/input/selector';
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
    const isMobile = width <= 500;
    const [loading, setLoading] = React.useState(false);
    const [spells, setSpells] = React.useState(defaultRows);
    const [lands, setLands] = React.useState(defaultRows);
    const decklistInput = useSelector(decklistSelector);
    const [open, setOpen] = React.useState(false);
    const [querysuccess, setQuerysuccess] = React.useState(true);
    const [errormessage, setErrormessage] = React.useState(true);
    const xValue = useSelector(xValueSelector);
    // const [xValue, setXValue] = React.useState(2);

    const handleClickSubmit = () => {
        setLoading(true);

        const decklist = {
            companion: [],
            commander: [],
            deck: [],
            sideboard: [],
        };

        const cleanDeck = decklistInput.split('\n').filter((e) => !!e);
        let currentCategory = 'deck';
        cleanDeck.forEach((row) => {
            if (['Sideboard', 'Deck', 'Companion', 'Commander'].includes(row)) {
                currentCategory = row.toLowerCase();
            } else {
                decklist[currentCategory].push(row.split(' (')[0]);
            }
        });

        const data = { decklist, xValue };
        console.log(data);
        axios({
            method: 'post',
            url: config.backendUrl,
            data,
        })
            .then((res) => {
                setLoading(false);
                setSpells(createRows(res.data.spells));
                setLands(createRows(res.data.lands));
                setOpen(true);
                setQuerysuccess(true);
            })
            .catch((e) => {
                setLoading(false);
                setOpen(true);
                setQuerysuccess(false);
                setErrormessage(e.response.data.error);
            });
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ErrorSnackbar
                    errormessage={errormessage}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    open={open}
                    querysuccess={querysuccess}
                    successmessage="Success !"
                />
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
