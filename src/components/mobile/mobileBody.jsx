import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import { CircularProgress } from '@material-ui/core';
import DecklistInput from '../shared/decklistInput';
import ResultTable from '../shared/resultTable/index';
import HelpText from '../shared/helpText';
import MobileSubmitActions from './mobileSubmitActions';
import MobileTabs from './mobileTabs';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
    },
    menu: {
        background: '#323a46',
    },
    indicator: {
        background: 'darkorange',
    },
    selected: {
        color: 'white',
    },
    results: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: green[700],
    },
    circular: {
        color: green[700],
    },
}));

export default function MobileBody({
    decklist,
    handleDecklistChange,
    loading,
    spells,
    lands,
    xValue,
    handleChangeXValue,
    handleClickSubmit,
}) {
    const classes = useStyles();
    const [index, setIndex] = React.useState(1);
    const spellResultfields = [
        { name: 'Cost', type: 'text', key: 'manaCost' },
        { name: 'P1', type: 'number', key: 'p1' },
        { name: 'P2', type: 'number', key: 'p2' },
    ];
    const landsResultFields = [{ name: 'Quality', type: 'number', key: 'p1' }];

    const handleClick = (callback) => () => {
        setIndex(2);
        callback();
    };

    return (
        <div className={classes.root}>
            <MobileTabs
                help={
                    <Box className={classes.background} textAlign="left">
                        <HelpText />
                    </Box>
                }
                index={index}
                landResults={
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
                                    <ResultTable
                                        fields={landsResultFields}
                                        rows={lands}
                                        selected={0}
                                        title="Lands"
                                        tooltips={['Land Quality']}
                                        isMobile
                                    />
                                </Fade>
                            )}
                        </Grid>
                    </Box>
                }
                main={
                    <div>
                        <DecklistInput onChange={handleDecklistChange} value={decklist} isMobile />
                        <MobileSubmitActions
                            disabled={loading}
                            handleChangeXValue={handleChangeXValue}
                            onClick={handleClick(handleClickSubmit)}
                            xValue={xValue}
                        />
                    </div>
                }
                setIndex={setIndex}
                spellResults={
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
                                    <ResultTable
                                        fields={spellResultfields}
                                        rows={spells}
                                        selected={1}
                                        title="Spells"
                                        tooltips={['Assuming you hit all your landdrops', 'True probability']}
                                        isMobile
                                    />
                                </Fade>
                            )}
                        </Grid>
                    </Box>
                }
            />
        </div>
    );
}
