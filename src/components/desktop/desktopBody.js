import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DecklistInput from "../decklistInput";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import {CircularProgress} from "@material-ui/core";
import SubmitButton from "./submitButton";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import XSlider from "../xSlider";
import DesktopTabs from "./desktopTabs";
import HelpText from "../helpText";
import DesktopResults from "./desktopResults";
import {useCurrentHeight} from "../../utils/width";

const useStyles = (height) => makeStyles((theme) => ({
    root: {
        width: '85vw',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#1b222b',
    },
    background: {
        height: 0.845 * height -148,
        padding: '1vw 2vw',
        overflow: 'auto',
    },
    circular: {
        color: green[700],
    },
}))();

export default function DesktopBody({ decklist, handleDecklistChange, loading, spells, lands, sort, xValue, handleChangeXValue, handleClickSubmit }) {
    let height = useCurrentHeight();
    const classes = useStyles(height);

    return (
        <div className={classes.root}>
            <DesktopTabs
                main={
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <DecklistInput
                                    value={decklist}
                                    onChange={handleDecklistChange}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="stretch"
                                spacing={2}
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
                                                { loading ?
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
                                                        <DesktopResults
                                                            spells={spells}
                                                            lands={lands}
                                                            sort={sort}
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
                                                    value={xValue}
                                                    handleChange={handleChangeXValue}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <SubmitButton
                                                    onClick={handleClickSubmit}
                                                    disabled={loading}
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
