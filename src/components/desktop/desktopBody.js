import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DecklistInput from "../decklistInput";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import {CircularProgress} from "@material-ui/core";
import ResultTable from "../resultTable";
import SubmitButton from "./submitButton";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import XSlider from "../xSlider";
import DesktopTabs from "./desktopTabs";
import HelpText from "../helpText";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '75vw',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#1b222b',
    },
    results: {
        height: '52vh',
    },
    background: {
        height: '60vh',
        padding: '2vw',
        overflow: 'auto',
    },
    circular: {
        color: green[700],
    },
}));

export default function DesktopBody(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DesktopTabs
                main={
                    <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <DecklistInput
                                        value={props.decklist}
                                        onChange={props.handleDecklistChange}
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
                                                className={classes.results}
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    { props.loading ?
                                                        <Fade
                                                            in={props.loading}
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
                                                            in={!props.loading}
                                                            unmountOnExit
                                                            style={{
                                                                transitionDelay: '500ms',
                                                            }}
                                                        >
                                                            <ResultTable
                                                                isMobile={false}
                                                                rows={props.rows}
                                                            />
                                                        </Fade>
                                                    }
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            <Grid container justify="center" spacing={4}>
                                                <Grid item>
                                                    <XSlider
                                                        value={props.xValue}
                                                        handleChange={props.handleChangeXValue}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <SubmitButton
                                                        onClick={props.handleClickSubmit}
                                                        disabled={props.loading}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                }
                help={
                    <Paper className={classes.paper}>
                        <Box
                            className={classes.background}
                            textAlign="left"
                        >
                            <HelpText/>
                        </Box>
                    </Paper>
                }
            />
        </div>
    )
}
