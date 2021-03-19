import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DecklistInput from '../shared/decklistInput';
import HelpText from '../shared/helpText';
import { useCurrentHeight } from '../../utils/width';
import DesktopTabs from './desktopTabs';
import DesktopResults from './desktopResults';
import SubmitSection from './submitSection';

const useStyles = (height) =>
    makeStyles((theme) => ({
        root: {
            width: '85vw',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: '#1b222b',
        },
        results: {
            height: 0.85 * height - 230,
        },
        background: {
            height: 0.845 * height - 148,
            padding: '1vw 2vw',
            overflow: 'auto',
        },
        circular: {
            color: green[700],
        },
    }))();

export default function DesktopBody({
    decklist,
    handleDecklistChange,
    loading,
    spells,
    lands,
    xValue,
    handleChangeXValue,
    handleClickSubmit,
}) {
    const height = useCurrentHeight();
    const classes = useStyles(height);

    return (
        <div className={classes.root}>
            <DesktopTabs
                help={
                    <Paper className={classes.paper}>
                        <Box className={classes.background} textAlign="left">
                            <HelpText />
                        </Box>
                    </Paper>
                }
                main={
                    <Grid spacing={2} container>
                        <Grid xs={3} item>
                            <Paper className={classes.paper}>
                                <DecklistInput onChange={handleDecklistChange} value={decklist} />
                            </Paper>
                        </Grid>
                        <Grid xs={9} item>
                            <Grid alignItems="stretch" direction="column" justify="space-evenly" spacing={2} container>
                                <Grid xs={12} item>
                                    <Paper className={classes.paper}>
                                        <Box alignItems="center" className={classes.results} display="flex">
                                            <Grid alignItems="center" direction="column" justify="center" container>
                                                {loading ? (
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
                                                    </Fade>
                                                ) : (
                                                    <Fade
                                                        in={!loading}
                                                        style={{
                                                            transitionDelay: '500ms',
                                                        }}
                                                        unmountOnExit
                                                    >
                                                        <DesktopResults lands={lands} spells={spells} />
                                                    </Fade>
                                                )}
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <SubmitSection
                                    handleChangeXValue={handleChangeXValue}
                                    handleClickSubmit={handleClickSubmit}
                                    loading={loading}
                                    xValue={xValue}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                }
            />
        </div>
    );
}
