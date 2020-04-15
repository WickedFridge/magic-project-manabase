import React from 'react';
import DecklistInput from "./decklistInput";
import SubmitButton from "./submitButton";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {orange, green} from "@material-ui/core/colors";
import {CircularProgress, createMuiTheme} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import ResultTable from "./resultTable";
import {ThemeProvider} from "@material-ui/styles";
import axios from 'axios';
import config from '../config';
import ErrorSnackbar from "./ErrorSnackbar";
import {defaultDecklist, defaultResults} from "../data/defaultInputs";

const createRows = (data) => Object.entries(data)
    .map(([key, {ratio}]) => ({key, ratio}))
    .sort((s1, s2) => parseFloat(s1.ratio) - parseFloat(s2.ratio));

const defaultRows = createRows(defaultResults);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75vw',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: green[700],
        // backgroundColor: '#341700',
        backgroundColor: '#1b222b',
    },
    circular: {
        color: green[700],
    }
}));

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

export default function AppBody() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [rows, setRows] = React.useState(defaultRows);
    const [decklist, setDecklist] = React.useState(defaultDecklist);
    const [open, setOpen] = React.useState(false);
    const [querysuccess, setQuerysuccess] = React.useState(true);
    const [errormessage, setErrormessage] = React.useState(true);

    const handleClickSubmit = () => {
        setLoading(true);
        const deck = decklist.split('\n')
            .filter(e => !!e && e !== 'Sideboard' && e !== 'Deck')
            .map(e => e.split(' (')[0]);
        const data = {deck};
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

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <ErrorSnackbar
                    open={open}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    querysuccess={querysuccess}
                    successmessage="Success !"
                    errormessage={errormessage}
                />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <p>Paste your decklist in the field below then press Submit</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <DecklistInput
                                value={decklist}
                                onChange={(event) => setDecklist(event.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            alignItems="stretch"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Box
                                        style={{height: '53.25vh'}}
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Grid
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            {loading ?
                                                <Fade
                                                    in={loading}
                                                    style={{
                                                        transitionDelay: '500ms',
                                                    }}
                                                    unmountOnExit
                                                >
                                                    <CircularProgress
                                                        className={classes.circular}
                                                        size={100}
                                                        thickness={2}
                                                    />
                                                </Fade> :
                                                <Fade
                                                    in={!loading}
                                                    unmountOnExit
                                                    style={{
                                                        transitionDelay: '500ms',
                                                    }}
                                                >
                                                    <ResultTable
                                                        rows={rows}
                                                    />
                                                </Fade>
                                            }
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <SubmitButton
                                        onClick={handleClickSubmit}
                                        disabled={loading}
                                    />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}
