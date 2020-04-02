import React from 'react';
import DecklistInput from "./decklistInput";
import SubmitButton from "./submitButton";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { orange, green } from "@material-ui/core/colors";
import {CircularProgress} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

const defaultDeckist = "1 Baleful Strix,\n" +
    "1 Imperial Recruiter,\n" +
    "1 Midnight Reaper,\n" +
    "1 Ophiomancer,\n" +
    "1 Bone Shredder,\n" +
    "1 Glen Elendra Archmage,\n" +
    "1 Shriekmaw,\n" +
    "1 The Scarab God,\n" +
    "1 Grave Titan,\n" +
    "1 Duplicant,\n" +
    "1 Underground Sea,\n" +
    "1 Watery Grave,\n" +
    "5 Island,\n" +
    "8 Swamp,\n" +
    "1 Vampiric Tutor,\n" +
    "1 Inquisition of Kozilek,\n" +
    "1 Collective Brutality,\n" +
    "1 Bitterblossom,\n" +
    "1 Exhume,\n" +
    "1 Chart a Course,\n" +
    "1 Thought Erasure,\n" +
    "1 Recurring Nightmare,\n" +
    "1 Liliana of the Veil,\n" +
    "1 Compulsive Research,\n" +
    "1 Birthing Pod,\n" +
    "1 Mystic Confluence,\n" +
    "1 Living Death";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

export default function AppBody() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const timerRef = React.useRef();

    const handleClickQuery = () => {
        clearTimeout(timerRef.current);

        setLoading(true);
        timerRef.current = setTimeout(() => {
            setLoading(false);
        }, 5000);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <p>Paste your decklist in the field below then press Submit</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <DecklistInput
                            defaultValue={defaultDeckist}
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
                                        <Fade
                                            in={loading}
                                            style={{
                                                transitionDelay: loading ? '100ms' : '100ms',
                                            }}
                                            unmountOnExit
                                        >
                                            <CircularProgress
                                                className={classes.circular}
                                                size={100}
                                                thickness={2}
                                            />
                                        </Fade>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <SubmitButton
                                    onClick={handleClickQuery}
                                    disabled={loading}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
