import React from 'react';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import config from '../config';
import ErrorSnackbar from "./ErrorSnackbar";
import DesktopBody from "./desktop/desktopBody";
import MobileBody from "./mobile/mobileBody";
import {defaultDecklist, defaultResults} from "../data/defaultInputs";
import { useCurrentWitdh } from "../utils/width";

const createRows = (data) => Object.entries(data)
    .map(([key, { p1, p2 }]) => ({ key, p1, p2 }))
    .sort((s1, s2) => s1.p2 - s2.p2);

const defaultRows = createRows(defaultResults);

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export default function AppBody() {
    let width = useCurrentWitdh();
    const isMobile = width <= 500;
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState(defaultRows);
    const [decklistInput, setDecklist] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [querysuccess, setQuerysuccess] = React.useState(true);
    const [errormessage, setErrormessage] = React.useState(true);
    const [xValue, setXValue] = React.useState(2);

    const handleClickSubmit = () => {
        setLoading(true);

        const decklist = {
            companion: [],
            commander: [],
            deck: [],
            sideboard: [],
        };

        const cleanDeck = decklistInput.split('\n')
            .filter(e => !!e);
        let currentCategory = 'deck';
        cleanDeck.forEach(row => {
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
            .then(res => {
                setLoading(false);
                setRows(createRows(res.data));
                setOpen(true);
                setQuerysuccess(true);
            })
            .catch(e => {
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

    const handleChangeXValue = (event, newValue) => {
        setXValue(newValue);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ErrorSnackbar
                    open={open}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    querysuccess={querysuccess}
                    successmessage="Success !"
                    errormessage={errormessage}
                />
                { isMobile ?
                    <MobileBody
                        decklist={decklistInput}
                        handleDecklistChange={(event) => setDecklist(event.target.value)}
                        handleClickSubmit={handleClickSubmit}
                        loading={loading}
                        rows={rows}
                        xValue={xValue}
                        handleChangeXValue={handleChangeXValue}
                    /> :
                    <DesktopBody
                        decklist={decklistInput}
                        handleDecklistChange={(event) => setDecklist(event.target.value)}
                        handleClickSubmit={handleClickSubmit}
                        loading={loading}
                        rows={rows}
                        xValue={xValue}
                        handleChangeXValue={handleChangeXValue}
                    />

                }
            </ThemeProvider>
        </div>
    );
}
