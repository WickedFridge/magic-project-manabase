import React, { useEffect } from 'react';
import DecklistInput from "./decklistInput";
import SubmitButton from "./desktop/submitButton";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { orange, green } from "@material-ui/core/colors";
import { CircularProgress, createMuiTheme } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import ResultTable from "./resultTable";
import { ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import config from '../config';
import ErrorSnackbar from "./ErrorSnackbar";
import DesktopBody from "./desktop/desktopBody";
import MobileBody from "./mobile/mobileBody";
import { defaultDecklist, defaultResults } from "../data/defaultInputs";

const createRows = (data) => Object.entries(data)
    .map(([key, { ratio }]) => ({ key, ratio }))
    .sort((s1, s2) => parseFloat(s1.ratio) - parseFloat(s2.ratio));

const defaultRows = createRows(defaultResults);

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

function useCurrentWitdh() {
    // save current window width in the state object
    let [width, setWidth] = React.useState(getWidth());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    return width;
}

export default function AppBody() {
    let width = useCurrentWitdh();
    const isMobile = width <= 500;
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState(defaultRows);
    const [decklist, setDecklist] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [querysuccess, setQuerysuccess] = React.useState(true);
    const [errormessage, setErrormessage] = React.useState(true);
    const [xValue, setXValue] = React.useState(2);

    const handleClickSubmit = () => {
        setLoading(true);
        const deck = decklist.split('\n')
            .filter(e => !!e && !['Sideboard', 'Deck', 'Companion'].includes(e))
            .map(e => e.split(' (')[0]);
        const data = { deck, xValue };
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
                        decklist={decklist}
                        handleDecklistChange={(event) => setDecklist(event.target.value)}
                        handleClickSubmit={handleClickSubmit}
                        loading={loading}
                        rows={rows}
                        xValue={xValue}
                        handleChangeXValue={handleChangeXValue}
                    /> :
                    <DesktopBody
                        decklist={decklist}
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
