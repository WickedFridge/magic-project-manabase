import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import DecklistInput from "../shared/decklistInput";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import { CircularProgress } from "@material-ui/core";
import ResultTable from "../shared/resultTable/index";
import MobileSubmitActions from "./mobileSubmitActions";
import HelpText from "../shared/helpText";
import MobileTabs from "./mobileTabs";

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

export default function MobileBody ({ decklist, handleDecklistChange, loading, spells, lands, xValue, handleChangeXValue, handleClickSubmit }) {
    const classes = useStyles();
    const [index, setIndex] = React.useState(1);
    const spellResultfields = [
        { name: 'Cost', type: 'text', key: 'manaCost'},
        { name: 'P1', type: 'number', key: 'p1'},
        { name: 'P2', type: 'number', key: 'p2'},
    ]
    const landsResultFields = [
        { name: 'Land Quality', type: 'number', key: 'p1' },
    ];

    const handleClick = callback => () => {
        setIndex(2);
        callback();
    };

    return (
        <div className={classes.root}>
            <MobileTabs
                index={index}
                setIndex={setIndex}
                help={
                    <Box
                        className={classes.background}
                        textAlign="left"
                    >
                        <HelpText/>
                    </Box>
                }
                main={
                    <div>
                        <DecklistInput
                            isMobile
                            value={decklist}
                            onChange={handleDecklistChange}
                        />
                        <MobileSubmitActions
                            onClick={handleClick(handleClickSubmit)}
                            disabled={loading}
                            xValue={xValue}
                            handleChangeXValue={handleChangeXValue}
                        />
                    </div>
                }
                spellResults={
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
                                    <ResultTable
                                        title={"Spells"}
                                        isMobile={true}
                                        rows={spells}
                                        fields={spellResultfields}
                                        tooltips={[
                                            'Assuming you hit all your landdrops',
                                            'True probability',
                                        ]}
                                        selected={1}
                                    />
                                </Fade>
                            }
                        </Grid>
                    </Box>
                }
                landResults={
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
                                    <ResultTable
                                        title="Lands"
                                        isMobile={true}
                                        rows={lands}
                                        fields={landsResultFields}
                                        tooltips={[
                                            'Land Quality',
                                        ]}
                                        selected={0}
                                    />
                                </Fade>
                            }
                        </Grid>
                    </Box>
                }
            />
        </div>
    )
}
