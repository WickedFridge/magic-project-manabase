import React from 'react';
import DecklistInput from "./decklistInput";
import SubmitButton from "./submitButton";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { orange, green } from "@material-ui/core/colors";
import {CircularProgress, createMuiTheme} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import ResultTable from "./resultTable";
import {ThemeProvider} from "@material-ui/styles";
import axios from 'axios';
import config from '../config';
import SnackbarErrorHandler from "./snackbarHandler";

const defaultDeckist = "1 Baleful Strix\n" +
    "1 Imperial Recruiter\n" +
    "1 Midnight Reaper\n" +
    "1 Ophiomancer\n" +
    "1 Bone Shredder\n" +
    "1 Glen Elendra Archmage\n" +
    "1 Shriekmaw\n" +
    "1 The Scarab God\n" +
    "1 Grave Titan\n" +
    "1 Duplicant\n" +
    "1 Underground Sea\n" +
    "1 Watery Grave\n" +
    "5 Island\n" +
    "8 Swamp\n" +
    "1 Vampiric Tutor\n" +
    "1 Inquisition of Kozilek\n" +
    "1 Collective Brutality\n" +
    "1 Bitterblossom\n" +
    "1 Exhume\n" +
    "1 Chart a Course\n" +
    "1 Thought Erasure\n" +
    "1 Recurring Nightmare\n" +
    "1 Liliana of the Veil\n" +
    "1 Compulsive Research\n" +
    "1 Birthing Pod\n" +
    "1 Mystic Confluence\n" +
    "1 Living Death";


const defaultData = {
    "Baleful Strix": {
        "ok": 4692,
        "nok": 236,
        "ratio": "95.21%"
    },
    "Imperial Recruiter": {
        "ok": 0,
        "nok": 4823,
        "ratio": "0.00%"
    },
    "Midnight Reaper": {
        "ok": 4807,
        "nok": 16,
        "ratio": "92.67%"
    },
    "Ophiomancer": {
        "ok": 4807,
        "nok": 16,
        "ratio": "88.67%"
    },
    "Bone Shredder": {
        "ok": 4807,
        "nok": 16,
        "ratio": "79.67%"
    },
    "Glen Elendra Archmage": {
        "ok": 4242,
        "nok": 126,
        "ratio": "81.12%"
    },
    "Emrakul, The Promised End": {
        "ok": 3002,
        "nok": 1,
        "ratio": "99.97%"
    },
    "The Scarab God": {
        "ok": 2946,
        "nok": 57,
        "ratio": "98.10%"
    },
    "Grave Titan": {
        "ok": 4995,
        "nok": 10,
        "ratio": "71.80%"
    },
    "Duplicant": {
        "ok": 5005,
        "nok": 0,
        "ratio": "64.00%"
    },
    "Vampiric Tutor": {
        "ok": 4872,
        "nok": 56,
        "ratio": "98.86%"
    },
    "Inquisition of Kozilek": {
        "ok": 4872,
        "nok": 56,
        "ratio": "98.86%"
    },
    "Collective Brutality": {
        "ok": 4902,
        "nok": 26,
        "ratio": "99.47%"
    },
    "Bitterblossom": {
        "ok": 4902,
        "nok": 26,
        "ratio": "99.47%"
    },
    "Exhume": {
        "ok": 4902,
        "nok": 26,
        "ratio": "99.47%"
    },
    "Chart a Course": {
        "ok": 4718,
        "nok": 210,
        "ratio": "95.74%"
    },
    "Thought Erasure": {
        "ok": 4692,
        "nok": 236,
        "ratio": "95.21%"
    },
    "Recurring Nightmare": {
        "ok": 4807,
        "nok": 16,
        "ratio": "99.67%"
    },
    "Liliana of the Veil": {
        "ok": 4557,
        "nok": 266,
        "ratio": "94.48%"
    },
    "Compulsive Research": {
        "ok": 4641,
        "nok": 182,
        "ratio": "96.23%"
    },
    "Birthing Pod": {
        "ok": 0,
        "nok": 4368,
        "ratio": "0.00%"
    },
    "Mystic Confluence": {
        "ok": 2457,
        "nok": 546,
        "ratio": "81.82%"
    },
    "Living Death": {
        "ok": 2952,
        "nok": 51,
        "ratio": "98.30%"
    }
};

const createRows = (data) => Object.entries(data).map(([key, { ratio }]) => ({ key, ratio }));

const defaultRows = createRows(defaultData);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '130vh',
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
    const [decklist, setDecklist] = React.useState(defaultDeckist);

    const handleClickSubmit = () => {
        setLoading(true);
        const data = { deck: decklist.split('\n') };
        console.log(data);
        axios({
            method: 'post',
            url: config.backendUrl,
            data,
        })
            .then(res => {
                setLoading(false);
                setRows(createRows(res.data));
            })
            .catch(e => {
                setLoading(false);
            });
    };

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
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
                                            {
                                                loading ?
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
                                    <SnackbarErrorHandler/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}
