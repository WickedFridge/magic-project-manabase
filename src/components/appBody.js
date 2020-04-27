import React from 'react';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import axios from 'axios';
import config from '../config';
import ErrorSnackbar from "./ErrorSnackbar";
import DesktopBody from "./desktop/desktopBody";
import MobileBody from "./mobile/mobileBody";
import { defaultResults } from "../data/defaultInputs";
import { useCurrentWitdh } from "../utils/width";

const createRows = (data) => Object.entries(data)
    .map(([key, { ratio }]) => ({ key, ratio }))
    .sort((s1, s2) => parseFloat(s1.ratio) - parseFloat(s2.ratio));

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
