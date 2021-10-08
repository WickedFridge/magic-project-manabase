import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DesktopResults from '../../results/desktopResults';
import SubmitSection from '../../submit/submitSection';
import DecklistInput from '../../../shared/decklistInput';
import { landsSelector, spellsSelector } from '../../../../core/useCases/stats/selector';
import { loadingSelector } from '../../../../core/useCases/input/selector';
import { useCurrentHeight } from '../../../../utils/width';

const useStyles = (height) =>
    makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: '#1b222b',
            height: '100%',
            margin: 15,
        },
        leftPanel: {
            height: '100%',
        },
        results: {
            height: 0.85 * height - 230,
        },
        background: {
            height: 0.845 * height - 148,
            padding: '1vw 2vw',
            overflow: 'auto',
        },
    }))();

const MainTab = () => {
    const [height] = useCurrentHeight();
    const classes = useStyles(height);

    const loading = useSelector(loadingSelector);
    const spells = useSelector(spellsSelector);
    const lands = useSelector(landsSelector);

    return (
        <Grid spacing={2} container>
            <Grid xs={3} item>
                <Paper className={classes.paper}>
                    <div className={classes.leftPanel}>
                        <DecklistInput />
                    </div>
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
                                            <CircularProgress className={classes.circular} size={100} thickness={2} />
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
                    <SubmitSection />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainTab;
